import { Coordinate } from '@antv/coord';
import { BBox, IGroup, IShape, IElement } from '@antv/g-base';
import { isObject, each, get, groupBy, isNil, filter } from '@antv/util';
import { polarToCartesian } from '../../../../util/graphics';
import { PolarLabelItem } from '../../interface';
import { antiCollision } from './util';

/** label text和line距离 4px */
const MARGIN = 4;

/**
 * 配置 labelline
 * @param item PolarLabelItem
 */
function drawLabelline(item: any /** PolarLabelItem */, coordinate: Coordinate) {
  /** 坐标圆心 */
  const center = coordinate.getCenter();
  /** 圆半径 */
  const radius = coordinate.getRadius();

  if (item && item.labelLine) {
    const { angle, offset: labelOffset } = item;
    // 贴近圆周
    const startPoint = polarToCartesian(center.x, center.y, radius, angle);
    const itemX = item.x + get(item, 'offsetX', 0) * (Math.cos(angle) > 0 ? 1 : -1);
    const itemY = item.y + get(item, 'offsetY', 0) * (Math.sin(angle) > 0 ? 1 : -1);

    const endPoint = {
      x: itemX - Math.cos(angle) * MARGIN,
      y: itemY - Math.sin(angle) * MARGIN,
    };

    const smoothConnector = item.labelLine.smooth;
    const path = [];
    const dx = endPoint.x - center.x;
    const dy = endPoint.y - center.y;
    let endAngle = Math.atan(dy / dx);
    // 第三象限 & 第四象限
    if (dx < 0) {
      endAngle += Math.PI;
    }

    // 默认 smooth, undefined 也为 smooth
    if (smoothConnector === false) {
      if (!isObject(item.labelLine)) {
        // labelLine: true
        item.labelLine = {};
      }

      // 表示弧线的方向，0 表示从起点到终点沿逆时针画弧, 1 表示顺时针
      let sweepFlag = 0;

      // 第一象限
      if ((angle < 0 && angle > -Math.PI / 2) || angle > Math.PI * 1.5) {
        if (endPoint.y > startPoint.y) {
          sweepFlag = 1;
        }
      }

      // 第二象限
      if (angle >= 0 && angle < Math.PI / 2) {
        if (endPoint.y > startPoint.y) {
          sweepFlag = 1;
        }
      }

      // 第三象限
      if (angle >= Math.PI / 2 && angle < Math.PI) {
        if (startPoint.y > endPoint.y) {
          sweepFlag = 1;
        }
      }

      // 第四象限
      if (angle < -Math.PI / 2 || (angle >= Math.PI && angle < Math.PI * 1.5)) {
        if (startPoint.y > endPoint.y) {
          sweepFlag = 1;
        }
      }

      const distance = labelOffset / 2 > 4 ? 4 : Math.max(labelOffset / 2 - 1, 0);
      const breakPoint = polarToCartesian(center.x, center.y, radius + distance, angle);
      // 圆弧的结束点
      const breakPoint3 = polarToCartesian(center.x, center.y, radius + labelOffset / 2, endAngle);

      /**
       * @example
       * M 100 100 L100 90 A 50 50 0 0 0 150 50
       * 移动至 (100, 100), 连接到 (100, 90), 以 (50, 50) 为圆心，绘制圆弧至 (150, 50);
       * A 命令的第 4 个参数 large-arc-flag, 决定弧线是大于还是小于 180 度: 0 表示小角度弧，1 表示大角
       * 第 5 个参数: 是否顺时针绘制
       */
      // 默认小弧
      const largeArcFlag = 0;
      // step1: 移动至起点
      path.push(`M ${startPoint.x} ${startPoint.y}`);
      // step2: 连接拐点
      path.push(`L ${breakPoint.x} ${breakPoint.y}`);
      // step3: 绘制圆弧 至 结束点
      path.push(`A ${center.x} ${center.y} 0 ${largeArcFlag} ${sweepFlag} ${breakPoint3.x} ${breakPoint3.y}`);
      // step4: 连接结束点
      path.push(`L ${endPoint.x} ${endPoint.y}`);
    } else {
      const breakPoint = polarToCartesian(
        center.x,
        center.y,
        radius + (labelOffset / 2 > 4 ? 4 : Math.max(labelOffset / 2 - 1, 0)),
        angle
      );
      // G2 旧的拉线
      // path.push('Q', `${breakPoint.x}`, `${breakPoint.y}`, `${endPoint.x}`, `${endPoint.y}`);
      const xSign = startPoint.x < center.x ? 1 : -1;
      // step1: 连接结束点
      path.push(`M ${endPoint.x} ${endPoint.y}`);
      const slope1 = (startPoint.y - center.y) / (startPoint.x - center.x);
      const slope2 = (endPoint.y - center.y) / (endPoint.x - center.x);
      if (Math.abs(slope1 - slope2) > Math.pow(Math.E, -16)) {
        // step2: 绘制 curve line (起点 & 结合点与圆心的斜率不等时, 由于存在误差, 使用近似处理)
        path.push(
          ...[
            'C',
            endPoint.x + xSign * 4,
            endPoint.y,
            2 * breakPoint.x - startPoint.x,
            2 * breakPoint.y - startPoint.y,
            startPoint.x,
            startPoint.y,
          ]
        );
      }
      // step3: 连接至起点
      path.push(`L ${startPoint.x} ${startPoint.y}`);
    }
    item.labelLine.path = path.join(' ');
  }
}

/**
 * 饼图 outer-label 布局, 适用于 type = pie 且 label offset > 0 的标签
 */
export function pieOuterLabelLayout(
  originalItems: PolarLabelItem[],
  labels: IGroup[],
  shapes: IShape[] | IGroup[],
  region: BBox
) {
  const items = filter(originalItems, (item) => !isNil(item));
  /** 坐标系 */
  const coordinate = labels[0] && labels[0].get('coordinate');
  if (!coordinate) {
    return;
  }

  /** 坐标圆心 */
  const center = coordinate.getCenter();
  /** 圆半径 */
  const radius = coordinate.getRadius();
  /** label shapes */
  const labelsMap: Record<string /** id */, IGroup> = {};
  for (const labelShape of labels) {
    labelsMap[labelShape.get('id')] = labelShape;
  }

  // note labelHeight 可以控制 label 的行高
  const labelHeight: number = get(items[0], 'labelHeight', 14);
  const labelOffset: number = get(items[0], 'offset', 0);

  if (labelOffset <= 0) {
    return;
  }

  const LEFT_HALF_KEY = 'left';
  const RIGHT_HALF_KEY = 'right';
  // step 1: separate labels
  const separateLabels = groupBy(items, (item) => (item.x < center.x ? LEFT_HALF_KEY : RIGHT_HALF_KEY));

  const { start, end } = coordinate;
  // step2: calculate totalHeight
  const totalHeight = Math.min((radius + labelOffset + labelHeight) * 2, coordinate.getHeight());
  const totalR = totalHeight / 2;

  /** labels 容器的范围(后续根据组件的布局设计进行调整) */
  const labelsContainerRange = {
    minX: start.x,
    maxX: end.x,
    minY: center.y - totalR,
    maxY: center.y + totalR,
  };

  // step 3: antiCollision
  each(separateLabels, (half, key) => {
    const maxLabelsCountForOneSide = Math.floor(totalHeight / labelHeight);
    if (half.length > maxLabelsCountForOneSide) {
      half.sort((a, b) => {
        // sort by percentage DESC
        return b.percent - a.percent;
      });

      each(half, (labelItem: PolarLabelItem, idx) => {
        if (idx + 1 > maxLabelsCountForOneSide) {
          labelsMap[labelItem.id].set('visible', false);
          labelItem.invisible = true;
        }
      });
    }
    antiCollision(half, labelHeight, labelsContainerRange);
  });

  each(separateLabels, (half: PolarLabelItem[], key: string) => {
    each(half, (item: PolarLabelItem) => {
      const isRight = key === RIGHT_HALF_KEY;
      const labelShape = labelsMap[item.id];

      // because group could not effect content-shape, should set content-shape position manually
      const content = labelShape.getChildByIndex(0) as IElement;

      // textShape 发生过调整
      if (content) {
        const r = radius + labelOffset;
        // (x - cx)^2 + (y - cy)^2 = totalR^2
        const dy = item.y - center.y;

        const rPow2 = Math.pow(r, 2);
        const dyPow2 = Math.pow(dy, 2);
        const dxPow2 = rPow2 - dyPow2 > 0 ? rPow2 - dyPow2 : 0;
        const dx = Math.sqrt(dxPow2);

        const dx_offset = Math.abs(Math.cos(item.angle) * r);
        if (!isRight) {
          // left
          item.x = center.x - Math.max(dx, dx_offset);
        } else {
          // right
          item.x = center.x + Math.max(dx, dx_offset);
        }
      }

      // adjust labelShape
      if (content) {
        content.attr('y', item.y);
        content.attr('x', item.x);
      }

      drawLabelline(item, coordinate);
    });
  });
}

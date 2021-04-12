import { BBox, IGroup, IShape } from '@antv/g-base';
import { each, get, isNil, deepMix, groupBy } from '@antv/util';
import { polarToCartesian } from '../../../../util/graphics';
import { LabelItem, PolarLabelItem } from '../../interface';
import { antiCollision } from './util';
import { translate } from '../../../../util/transform';
import { Coordinate } from '@antv/coord';

/** 拐点偏移量, 暂不可配置 */
const INFLECTION_OFFSET = 4;
/** 标签偏移量, distance between label and edge: offsetX */
const LABEL_OFFSET_X = 4;
/** 标签与牵引线的偏移量 */
const LABEL_TEXT_LINE_OFFSET = 4;

function drawLabelline(item: PolarLabelItem, coordinate: Coordinate, inRight: boolean) {
  /** 坐标圆心 */
  const center = coordinate.getCenter();
  /** 圆半径 */
  const radius = coordinate.getRadius();
  const startPoint = {
    x: item.x - (inRight ? LABEL_TEXT_LINE_OFFSET : -LABEL_TEXT_LINE_OFFSET),
    y: item.y,
  };
  const inflectionPoint = polarToCartesian(center.x, center.y, radius + INFLECTION_OFFSET, item.angle);
  const p1 = { x: startPoint.x, y: startPoint.y };
  const p2 = { x: inflectionPoint.x, y: inflectionPoint.y };

  const endPoint = polarToCartesian(center.x, center.y, radius, item.angle);
  let path = '';

  // 文本被调整下去了，则添加拐点连接线
  if (startPoint.y !== inflectionPoint.y) {
    const offset = inRight ? 4 : -4;
    p1.y = startPoint.y;

    /** 是否在第一象限 */
    if (item.angle < 0 && item.angle >= -Math.PI / 2) {
      p1.x = Math.max(inflectionPoint.x, startPoint.x - offset);
      if (startPoint.y < inflectionPoint.y) {
        p2.y = p1.y;
      } else {
        p2.y = inflectionPoint.y;
        p2.x = Math.max(p2.x, p1.x - offset);
      }
    }
    /** 是否在 第二象限 */
    if (item.angle > 0 && item.angle < Math.PI / 2) {
      p1.x = Math.max(inflectionPoint.x, startPoint.x - offset);
      if (startPoint.y > inflectionPoint.y) {
        p2.y = p1.y;
      } else {
        p2.y = inflectionPoint.y;
        p2.x = Math.max(p2.x, p1.x - offset);
      }
    }
    /** 是否在 第三象限 */
    if (item.angle > Math.PI / 2) {
      p1.x = Math.min(inflectionPoint.x, startPoint.x - offset);
      if (startPoint.y > inflectionPoint.y) {
        p2.y = p1.y;
      } else {
        p2.y = inflectionPoint.y;
        p2.x = Math.min(p2.x, p1.x - offset);
      }
    }
    /** 是否在 第四象限 */
    if (item.angle < -Math.PI / 2) {
      p1.x = Math.min(inflectionPoint.x, startPoint.x - offset);
      if (startPoint.y < inflectionPoint.y) {
        p2.y = p1.y;
      } else {
        p2.y = inflectionPoint.y;
        p2.x = Math.min(p2.x, p1.x - offset);
      }
    }
  }

  path = [
    `M ${startPoint.x},${startPoint.y}`,
    `L ${p1.x},${p1.y}`,
    `L ${p2.x},${p2.y}`,
    `L ${inflectionPoint.x},${inflectionPoint.y}`,
    `L ${endPoint.x},${endPoint.y}`,
  ].join(' ');
  item.labelLine = deepMix({}, item.labelLine, { path });
}

/**
 * 饼图标签 spider 布局, 只适用于 pie-spider 的标签类型
 * region 应该是 labelsRenderer 容器的范围限制(便于后续组件间布局)
 */
export function pieSpiderLabelLayout(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
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

  const labelHeight: number = get(items[0], 'labelHeight', 14);
  const labelOffset: number = Math.max(get(items[0], 'offset', 0), INFLECTION_OFFSET);

  // step 1: adjust items to spider
  each(items, (item) => {
    const label = get(labelsMap, [item.id]);
    if (!label) {
      return;
    }

    const inRight = item.x > center.x || (item.x === center.x && item.y > center.y);
    const offsetX = !isNil(item.offsetX) ? item.offsetX : LABEL_OFFSET_X;
    const inflectionPoint = polarToCartesian(center.x, center.y, radius + INFLECTION_OFFSET, item.angle);

    const totalOffset = labelOffset + offsetX;
    item.x = center.x + (inRight ? 1 : -1) * (radius + totalOffset);
    item.y = inflectionPoint.y;
  });

  const { start, end } = coordinate;
  const LEFT_HALF_KEY = 'left';
  const RIGHT_HALF_KEY = 'right';
  // step 1: separate labels
  const seperateLabels = groupBy(items, (item) => (item.x < center.x ? LEFT_HALF_KEY : RIGHT_HALF_KEY));

  // step2: calculate totalHeight
  let totalHeight = (radius + labelOffset) * 2 + labelHeight;

  each(seperateLabels, (half: PolarLabelItem[]) => {
    const halfHeight = half.length * labelHeight;
    if (halfHeight > totalHeight) {
      totalHeight = Math.min(halfHeight, Math.abs(start.y - end.y));
    }
  });

  /** labels 容器的范围(后续根据组件的布局设计进行调整) */
  const labelsContainerRange = {
    minX: start.x,
    maxX: end.x,
    minY: center.y - totalHeight / 2,
    maxY: center.y + totalHeight / 2,
  };

  // step 3: antiCollision
  each(seperateLabels, (half, key) => {
    const maxLabelsCountForOneSide = totalHeight / labelHeight;
    if (half.length > maxLabelsCountForOneSide) {
      half.sort((a, b) => {
        // sort by percentage DESC
        return b.percent - a.percent;
      });

      each(half, (labelItem: PolarLabelItem, idx) => {
        if (idx > maxLabelsCountForOneSide) {
          labelsMap[labelItem.id].set('visible', false);
          labelItem.invisible = true;
        }
      });
    }
    antiCollision(half, labelHeight, labelsContainerRange);
  });

  const startY = labelsContainerRange.minY;
  const endY = labelsContainerRange.maxY;

  // step4: applyTo labels and adjust labelLines
  each(seperateLabels, (half, key) => {
    const inRight = key === RIGHT_HALF_KEY;

    each(half, (item) => {
      const label: IGroup = get(labelsMap, item && [item.id]);
      if (!label) {
        return;
      }
      // out of range, hidden
      if (item.y < startY || item.y > endY) {
        label.set('visible', false);
        return;
      }

      const labelContent = label.getChildByIndex(0);
      const box = labelContent.getCanvasBBox();
      const originalPos = { x: inRight ? box.x : box.maxX, y: box.y + box.height / 2 /** vertical-align: middle */ };

      translate(labelContent as any, item.x - originalPos.x /** 从 pos.x 移动到 item.x */, item.y - originalPos.y);

      // adjust labelLines
      if (item.labelLine) {
        drawLabelline(item, coordinate, inRight);
      }
    });
  });
}

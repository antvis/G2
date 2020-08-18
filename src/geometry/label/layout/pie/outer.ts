import { Coordinate } from '@antv/coord';
import { BBox, IGroup, IShape, IElement } from '@antv/g-base';
import { isObject, each, get } from '@antv/util';
import { polarToCartesian } from '../../../../util/graphics';
import { LabelItem } from '../../interface';

/** label text和line距离 4px */
const MARGIN = 4;

/**
 * 碰撞检测算法
 */
export function antiCollision(
  labels: LabelItem[],
  labelHeight: number,
  plotRange: { minY: number; maxY: number; minX: number; maxX: number },
  isRight
) {
  // sorted by y, mutable
  labels.sort((a, b) => a.y - b.y);

  // adjust y position of labels to avoid overlapping
  const startY = plotRange.minY;
  const endY = plotRange.maxY;
  let i;

  const boxes = labels.map((label) => {
    return {
      content: label.content,
      size: labelHeight,
      pos: label.y,
      targets: [label.y],
    };
  });

  const maxPos = Math.max(...boxes.map((b) => b.pos));
  const minPos = Math.min(...boxes.map((b) => b.pos));
  /**
   * when in right, shift from up to down
   */
  if (isRight) {
    const minY = Math.min(minPos, endY - (boxes.length - 1) * labelHeight);
    const maxY = Math.max(minY + boxes.length * labelHeight, maxPos + labelHeight);
    let overlapping = true;
    while (overlapping) {
      // detect overlapping and join boxes
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previousBox = boxes[i - 1];
          const box = boxes[i];
          // overlap
          if (previousBox.pos + previousBox.size > box.pos) {
            if (box.pos + i * labelHeight < maxY) {
              // join boxes
              previousBox.size += box.size;
              previousBox.targets = previousBox.targets.concat(box.targets);
              // removing box
              boxes.splice(i, 1);
            } else {
              previousBox.pos = box.pos - previousBox.size;
            }
            overlapping = true;
          }
        }
      }
    }
  } else {
    const maxY = Math.max(startY + (boxes.length - 1) * labelHeight, maxPos);
    const minY = Math.min(minPos, maxY - (boxes.length - 1) * labelHeight);
    let overlapping = true;
    while (overlapping) {
      // detect overlapping and join boxes
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previousBox = boxes[i - 1];
          const box = boxes[i];
          // overlap
          if (previousBox.pos + previousBox.size > box.pos) {
            if (previousBox.pos - minY > i * labelHeight) {
              previousBox.pos -= previousBox.size;
            } else {
              // join boxes
              previousBox.size += box.size;
              previousBox.targets = previousBox.targets.concat(box.targets);
              // removing box
              boxes.splice(i, 1);
            }
            overlapping = true;
          }
        }
      }
    }
  }

  // step 4: normalize y and adjust x
  i = 0;
  boxes.forEach((b) => {
    let posInCompositeBox = b.pos;
    b.targets.forEach(() => {
      labels[i].y = posInCompositeBox;
      posInCompositeBox += labelHeight;
      i++;
    });
  });
}

/**
 * 饼图 outer-label 布局, 适用于 type = pie 且 label offset > 0 的标签
 */
export function pieOuterLabelLayout(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  const labelOffset = items[0] ? items[0].offset : 0;
  const coordinate: Coordinate = labels[0].get('coordinate');
  const radius = coordinate.getRadius();
  const center = coordinate.getCenter();

  if (labelOffset > 0) {
    // note labelHeight 可以控制 label 的行高
    const lineHeight: number = get(items[0], 'labelHeight', 14);
    const totalR = radius + labelOffset;
    const totalHeight = totalR * 2 + lineHeight * 2;

    /** labels 容器的范围(后续根据组件的布局设计进行调整) */
    const labelsContainerRange = {
      minX: coordinate.start.x,
      minY: Math.max(coordinate.end.y, center.y - radius - (labelOffset + lineHeight)),
      maxX: coordinate.end.x,
      maxY: Math.min(coordinate.start.y, center.y + radius + (labelOffset + lineHeight)),
    };

    // step 1: separate labels
    const halves: LabelItem[][] = [
      [], // left
      [], // right
    ];
    items.forEach((labelItem) => {
      if (!labelItem) {
        return;
      }
      if (labelItem.x < center.x) {
        // left
        halves[0].push(labelItem);
      } else {
        // right or center will be put on the right side
        halves[1].push(labelItem);
      }
    });

    halves.forEach((half, index) => {
      // step 2: reduce labels
      const maxLabelsCountForOneSide = totalHeight / lineHeight;
      if (half.length > maxLabelsCountForOneSide) {
        half.sort((a, b) => {
          // sort by percentage DESC
          // fixme-xinming 目前还获取不到，需要使用 scale 去获取 percent
          return b['data.percent'] - a['data.percent'];
        });

        const hidden = half.splice(maxLabelsCountForOneSide, half.length - maxLabelsCountForOneSide + 1);
        hidden.forEach((l) => {
          const idx = labels.findIndex((item) => item.get('id') === l.id);
          if (labels[idx]) {
            labels[idx].remove(true);
            // 同时移除
            labels.splice(idx, 1);
            items.splice(idx, 1);
          }
        });
      }
      antiCollision(half, lineHeight, labelsContainerRange, index === 1);
    });
  }

  // 布局后 调整 items
  const labelsMap = {};
  for (const labelShape of labels) {
    labelsMap[labelShape.get('id')] = labelShape;
  }

  // (x - cx)^2 + (y - cy)^2 = totalR^2
  let labelRailRadius = (Math.max(...items.map((l) => l.y)) - Math.min(...items.map((l) => l.y))) / 2;
  labelRailRadius = Math.max(labelRailRadius, radius);
  items.forEach((item) => {
    const isRight = item.x > center.x || (item.x === center.x && item.y > center.y);
    const labelShape = labelsMap[item.id];

    // because group could not effect text-shape, should set text-shape position manually
    const textShape = labelShape.find((child) => child.get('type') === 'text') as IElement;

    // textShape 发生过调整
    if (textShape && textShape.attr('y') !== item.y) {
      const rPow2 = labelRailRadius * labelRailRadius;
      const dyPow2 = Math.pow(Math.abs(item.y - center.y), 2);
      if (rPow2 < dyPow2) {
        item.x = center.x;
      } else {
        const dx = Math.sqrt(rPow2 - dyPow2);
        if (!isRight) {
          // left
          item.x = center.x - dx;
        } else {
          // right
          item.x = center.x + dx;
        }
      }
    }

    // adjust labelShape
    labelShape.attr('x', item.x);
    labelShape.attr('y', item.y);

    // @ts-ignore
    if (textShape) {
      textShape.attr('y', item.y);
      textShape.attr('x', item.x);
    }
  });

  // 配置 labelLine
  each(items, (item) => {
    if (item && item.labelLine) {
      const { angle } = item;
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
  });
}

import { isObject, each, find, get } from '@antv/util';

import { BBox, IGroup, IShape } from '../../../../dependents';
import { LabelItem } from '../../interface';

import { polarToCartesian } from '../../../../util/graphics';
import { IElement } from '@antv/g-base';

/** label text和line距离 4px */
const MARGIN = 4;

function antiCollision(labelShapes, labels, lineHeight, plotRange, center, isRight) {
  // adjust y position of labels to avoid overlapping
  let overlapping = true;
  const start = plotRange.start;
  const end = plotRange.end;
  const startY = Math.min(start.y, end.y);
  let totalHeight = Math.abs(start.y - end.y);
  let i;

  let maxY = 0;
  let minY = Number.MIN_VALUE;
  const boxes = labels.map((label) => {
    if (label.y > maxY) {
      maxY = label.y;
    }
    if (label.y < minY) {
      minY = label.y;
    }
    return {
      size: lineHeight,
      targets: [label.y - startY],
    };
  });
  minY -= startY;
  if (maxY - startY > totalHeight) {
    totalHeight = maxY - startY;
  }

  while (overlapping) {
    /* eslint no-loop-func: 0 */
    boxes.forEach((box) => {
      const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
      box.pos = Math.min(Math.max(minY, target - box.size / 2), totalHeight - box.size);
      // box.pos = Math.max(0, target - box.size / 2);
    });

    // detect overlapping and join boxes
    overlapping = false;
    i = boxes.length;
    while (i--) {
      if (i > 0) {
        const previousBox = boxes[i - 1];
        const box = boxes[i];
        if (previousBox.pos + previousBox.size > box.pos) {
          // overlapping
          previousBox.size += box.size;
          previousBox.targets = previousBox.targets.concat(box.targets);

          // overflow, shift up
          if (previousBox.pos + previousBox.size > totalHeight) {
            previousBox.pos = totalHeight - previousBox.size;
          }
          boxes.splice(i, 1); // removing box
          overlapping = true;
        }
      }
    }
  }

  i = 0;
  // step 4: normalize y and adjust x
  boxes.forEach((b) => {
    let posInCompositeBox = startY + lineHeight / 2; // middle of the label
    b.targets.forEach(() => {
      labels[i].y = b.pos + posInCompositeBox;
      posInCompositeBox += lineHeight;
      i++;
    });
  });

  const labelsMap = {};
  for (const labelShape of labelShapes) {
    labelsMap[labelShape.get('id')] = labelShape;
  }

  // (x - cx)^2 + (y - cy)^2 = totalR^2
  labels.forEach((label) => {
    const rPow2 = label.r * label.r;
    const dyPow2 = Math.pow(Math.abs(label.y - center.y), 2);
    if (rPow2 < dyPow2) {
      label.x = center.x;
    } else {
      const dx = Math.sqrt(rPow2 - dyPow2);
      if (!isRight) {
        // left
        label.x = center.x - dx;
      } else {
        // right
        label.x = center.x + dx;
      }
    }

    // adjust labelShape
    const labelShape = labelsMap[label.id];
    labelShape.attr('x', label.x);
    labelShape.attr('y', label.y);

    // because group could not effect text-shape, should set text-shape position manually
    const textShape = find(labelShape.getChildren(), (ele) => ele.get('type') === 'text') as IElement;
    // @ts-ignore
    if (textShape) {
      textShape.attr('y', label.y);
      textShape.attr('x', label.x);
    }
  });
}

export function distribute(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  if (!items.length || !labels.length) {
    return;
  }
  const offset = items[0] ? items[0].offset : 0;
  const coordinate = labels[0].get('coordinate');
  const radius = coordinate.getRadius();
  const center = coordinate.getCenter();

  if (offset > 0) {
    // const lineHeight = get(this.geometry.theme, ['pieLabels', 'labelHeight'], 14);
    const lineHeight = 14; // TODO
    const totalR = radius + offset;
    const totalHeight = totalR * 2 + lineHeight * 2;
    const plotRange = {
      start: coordinate.start,
      end: coordinate.end,
    };

    // step 1: separate labels
    const halves = [
      [], // left
      [], // right
    ];
    items.forEach((labelItem) => {
      if (!labelItem) {
        return;
      }
      if (labelItem.textAlign === 'right') {
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
          return b['..percent'] - a['..percent'];
        });
        half.splice(maxLabelsCountForOneSide, half.length - maxLabelsCountForOneSide);
      }

      // step 3: distribute position (x and y)
      half.sort((a, b) => {
        // sort by y ASC
        return a.y - b.y;
      });

      antiCollision(labels, half, lineHeight, plotRange, center, index);
    });
  }

  // 配置 labelLine
  each(items, (item) => {
    if (item && item.labelLine) {
      const distance = item.offset;
      const angle = item.angle;
      // 贴近圆周
      const startPoint = polarToCartesian(center.x, center.y, radius, angle);
      const innerPoint = polarToCartesian(center.x, center.y, radius + distance / 2, angle);
      const itemX = item.x + get(item, 'offsetX', 0);
      const itemY = item.y + get(item, 'offsetY', 0);
      const endPoint = {
        x: itemX - Math.cos(angle) * MARGIN,
        y: itemY - Math.sin(angle) * MARGIN,
      };
      if (!isObject(item.labelLine)) {
        // labelLine: true
        item.labelLine = {};
      }
      item.labelLine.path = [
        `M ${startPoint.x}`,
        `${startPoint.y} Q${innerPoint.x}`,
        `${innerPoint.y} ${endPoint.x}`,
        endPoint.y,
      ].join(',');
    }
  });
}

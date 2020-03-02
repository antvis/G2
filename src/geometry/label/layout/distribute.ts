import { find } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';

/** label text和line距离 4px */
const MARGIN = 4;

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

function antiCollision(labelGroups: IGroup[], lineHeight, plotRange, center, isRight) {
  const labels = labelGroups.map((labelShape) => labelShape.get('labelItem'));
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
      pos: null,
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
  });

  labels.forEach((label) => {
    const labelGroup = find(labelGroups, (group) => group.get('id') === label.id);
    const coordinate = labelGroup.get('coordinate');
    const coordRadius = coordinate.getRadius();
    if (labelGroup) {
      const labelShape = labelGroup.getChildren()[0];
      const labelLineShape = labelGroup.getChildren()[1];
      if (labelShape) {
        labelShape.attr('x', label.x);
        labelShape.attr('y', label.y);
      }
      if (labelLineShape) {
        const distance = label.offset;
        const angle = label.angle;
        // 贴近圆周
        const startPoint = getEndPoint(center, angle, coordRadius);
        const inner = getEndPoint(center, angle, coordRadius + distance / 2);
        const endPoint = {
          x: label.x - Math.cos(angle) * MARGIN,
          y: label.y - Math.sin(angle) * MARGIN,
        };
        labelLineShape.attr('path', [`M ${startPoint.x}`, `${startPoint.y} Q${inner.x}`, `${inner.y} ${endPoint.x}`, endPoint.y].join(','));
      }
    }
  });
}

/**
 * pie outer-label: distribute algorithm
 */
export function distribute(labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  const offset = labels[0] ? labels[0].get('labelItem').offset : 0;
  const lineHeight = labels[0] ? labels[0].get('labelItem').labelHeight : 14;
  const coordinate = labels[0] ? labels[0].get('coordinate') : null;
  if (coordinate && offset > 0) {
    // @ts-ignore
    const radius = coordinate.getRadius();
    const center = coordinate.getCenter();
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
    labels.forEach((label) => {
      if (!label) {
        return;
      }
      if (label.getChildren()[0].attr('textAlign') === 'right') {
        // left
        halves[0].push(label);
      } else {
        // right or center will be put on the right side
        halves[1].push(label);
      }
    });
    
    halves.forEach((half, index) => {
      // step 2: reduce labels
      const maxLabelsCountForOneSide = Math.floor(totalHeight / lineHeight);
      if (half.length > maxLabelsCountForOneSide) {
        half.sort((a, b) => {
          // sort by percentage DESC
          return b['..percent'] - a['..percent'];
        });
        half.forEach((label, idx) => {
          if (idx >= maxLabelsCountForOneSide) {
            label.remove(true); // 超出则不展示
          }
        });
        // 同时移除
        half.splice(maxLabelsCountForOneSide, half.length - maxLabelsCountForOneSide);
      }

      // step 3: distribute position (x and y)
      half.sort((a, b) => {
        // sort by y ASC
        return a.get('labelItem').y - b.get('labelItem').y;
      });
      antiCollision(half, lineHeight, plotRange, center, index);
    });
  }
}

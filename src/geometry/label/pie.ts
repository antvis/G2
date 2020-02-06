import { get, isArray, isObject } from '@antv/util';
import { getPointAngle } from '../../util/coordinate';
import Geometry from '../base';
import { LabelItem } from './interface';
import PolarLabel from './polar';

/** label text和line距离 4px */
const MARGIN = 4;

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

function antiCollision(labels, lineHeight, plotRange, center, isRight) {
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
}

export default class PieLabel extends PolarLabel {
  constructor(geometry: Geometry) {
    super(geometry);
    this.defaultLabelCfg = get(geometry.theme, 'pieLabels', {});
  }
  protected getDefaultOffset(offset) {
    return offset || 0;
  }

  protected adjustItems(items: LabelItem[]) {
    const offset = items[0] ? items[0].offset : 0;
    if (offset > 0) {
      items = this.distribute(items, offset);
    }
    return super.adjustItems(items);
  }

  // 连接线
  protected lineToLabel(label: LabelItem) {
    const coordinate = this.coordinate;
    // @ts-ignore
    const r = coordinate.getRadius();
    const distance = label.offset;
    const angle = label.angle;
    const center = coordinate.getCenter();
    // 贴近圆周
    const start = getEndPoint(center, angle, r);
    const inner = getEndPoint(center, angle, r + distance / 2);
    const end = {
      x: label.x - Math.cos(angle) * MARGIN,
      y: label.y - Math.sin(angle) * MARGIN,
    };
    if (!isObject(label.labelLine)) {
      // labelLine: true
      label.labelLine = {};
    }
    label.labelLine.path = [`M ${start.x}`, `${start.y} Q${inner.x}`, `${inner.y} ${end.x}`, end.y].join(',');
  }

  protected getLabelRotate(angle: number, offset: number, isLabelLimit: boolean) {
    let rotate;
    if (offset < 0) {
      rotate = angle;
      if (rotate > Math.PI / 2) {
        rotate = rotate - Math.PI;
      }
      if (rotate < -Math.PI / 2) {
        rotate = rotate + Math.PI;
      }
    }
    return rotate;
  }

  protected getLabelAlign(point: LabelItem) {
    const coordinate = this.coordinate;
    const center = coordinate.getCenter();

    let align;
    if (point.angle <= Math.PI / 2 && point.x >= center.x) {
      align = 'left';
    } else {
      align = 'right';
    }
    const offset = this.getDefaultOffset(point.offset);
    if (offset <= 0) {
      if (align === 'right') {
        align = 'left';
      } else {
        align = 'right';
      }
    }
    return align;
  }

  protected getArcPoint(point) {
    return point;
  }

  protected getPointAngle(point) {
    const coordinate = this.coordinate;
    const startPoint = {
      x: isArray(point.x) ? point.x[0] : point.x,
      y: point.y[0],
    };
    const endPoint = {
      x: isArray(point.x) ? point.x[1] : point.x,
      y: point.y[1],
    };
    let angle;
    const startAngle = getPointAngle(coordinate, startPoint);
    if (point.points && point.points[0].y === point.points[1].y) {
      angle = startAngle;
    } else {
      let endAngle = getPointAngle(coordinate, endPoint);
      if (startAngle >= endAngle) {
        // 100% pie slice
        endAngle = endAngle + Math.PI * 2;
      }
      angle = startAngle + (endAngle - startAngle) / 2;
    }
    return angle;
  }

  public getCirclePoint(angle, offset, p?) {
    const coordinate = this.coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore
    const r = coordinate.getRadius() + offset;
    return {
      ...getEndPoint(center, angle, r),
      angle,
      r,
    };
  }

  // distribute labels
  private distribute(labels, offset) {
    const coordinate = this.coordinate;
    // @ts-ignore
    const radius = coordinate.getRadius();
    const lineHeight = get(this.geometry.theme, ['pieLabels', 'labelHeight'], 14);
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
      if (label.textAlign === 'right') {
        // left
        halves[0].push(label);
      } else {
        // right or center will be put on the right side
        halves[1].push(label);
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
      antiCollision(half, lineHeight, plotRange, center, index);
    });

    return halves[0].concat(halves[1]);
  }
}

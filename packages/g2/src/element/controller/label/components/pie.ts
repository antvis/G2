import * as _ from '@antv/util';
import PolarElementLabels from './polar';
import * as PathUtil from '../../../util/path';
import { DataPointType } from '../../../../interface';

const MARGIN = 5;

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
      targets: [ label.y - startY ],
    };
  });
  minY -= startY;
  if ((maxY - startY) > totalHeight) {
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
        if (previousBox.pos + previousBox.size > box.pos) { // overlapping
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
      if (!isRight) { // left
        label.x = center.x - dx;
      } else { // right
        label.x = center.x + dx;
      }
    }
  });
}

export default class PieElementLabels extends PolarElementLabels {
  constructor(cfg) {
    super({
      ...cfg,
    });

    this.set('defaultLabelCfg', this.get('theme').thetaLabels);
  }

  getDefaultOffset(point) {
    return point.offset || 0;
  }

  /**
   * @protected
   * to avoid overlapping
   * @param {Array} items labels to be placed
   * @return {Array} items
   */
  adjustItems(originItems) {
    let items = originItems;
    const offset = items[0] ? items[0].offset : 0;
    if (offset > 0) {
      items = this._distribute(items, offset);
    }
    return super.adjustItems(items);
  }

  // 连接线
  lineToLabel(label) {
    const coord = this.get('coord');
    const r = coord.getRadius();
    const distance = label.offset;
    const angle = label.orignAngle || label.angle;
    const center = coord.getCenter();
    const start = getEndPoint(center, angle, r + MARGIN / 2);
    const inner = getEndPoint(center, angle, r + distance / 2);
    if (!_.isObject(label.labelLine)) { // labelLine: true
      label.labelLine = {};
    }
    label.labelLine.path = [
      `M ${start.x}`,
      `${start.y} Q${inner.x}`,
      `${inner.y} ${label.x}`,
      label.y,
    ].join(',');
  }

  /**
   * @protected
   * get rotation for label
   * @param {Number} angle angle
   * @param {Number} offset offset
   * @return {Number} rotate
   */
  getLabelRotate(angle, offset, isLabelLimit) {
    let rotate;
    if (offset < 0) {
      rotate = angle * 180 / Math.PI;
      if (rotate > 90) {
        rotate = rotate - 180;
      }
      if (rotate < -90) {
        rotate = rotate + 180;
      }
    }
    return rotate / 180 * Math.PI;
  }

  /**
   * @protected
   * get text align for label
   * @param {Object} point point
   * @return {String} align
   */
  getLabelAlign(point) {
    const coord = this.get('coord');
    const center = coord.getCenter();

    let align;
    if (point.angle <= Math.PI / 2 && point.x >= center.x) {
      align = 'left';
    } else {
      align = 'right';
    }
    const offset = this.getDefaultOffset(point);
    if (offset <= 0) {
      if (align === 'right') {
        align = 'left';
      } else {
        align = 'right';
      }
    }
    return align;
  }

  getArcPoint(point) {
    return point;
  }

  getPointAngle(point) {
    const coord = this.get('coord');
    const startPoint = {
      x: _.isArray(point.x) ? point.x[0] : point.x,
      y: point.y[0],
    };
    this.transLabelPoint(startPoint); // 转换到画布坐标，如果坐标系发生改变
    const endPoint = {
      x: _.isArray(point.x) ? point.x[1] : point.x,
      y: point.y[1],
    };
    this.transLabelPoint(endPoint); // 转换到画布坐标，如果坐标系发生改变
    let angle;
    const startAngle = PathUtil.getPointAngle(coord, startPoint);
    if (point.points && point.points[0].y === point.points[1].y) {
      angle = startAngle;
    } else {
      let endAngle = PathUtil.getPointAngle(coord, endPoint);
      if (startAngle >= endAngle) { // 100% pie slice
        endAngle = endAngle + Math.PI * 2;
      }
      angle = startAngle + (endAngle - startAngle) / 2;
    }
    return angle;
  }

  getCirclePoint(angle, offset, p?): DataPointType {
    const coord = this.get('coord');
    const center = coord.getCenter();
    const r = coord.getRadius() + offset;
    const point = getEndPoint(center, angle, r) as DataPointType;
    point.angle = angle;
    point.r = r;
    return point;
  }

  // distribute labels
  private _distribute(labels, offset) {
    const coord = this.get('coord');
    const radius = coord.getRadius();
    const lineHeight = this.get('defaultLabelCfg').labelHeight;
    const center = coord.getCenter();
    const totalR = radius + offset;
    const totalHeight = totalR * 2 + lineHeight * 2;
    let plotRange = {
      start: coord.start,
      end: coord.end,
    };
    const element = this.get('element');
    if (element) {
      const view = element.get('view');
      plotRange = {
        start: view.get('panelRange').bl,
        end: view.get('panelRange').tr,
      };
    }

    // step 1: separate labels
    const halves = [
      [], // left
      [], // right
    ];
    labels.forEach((label) => {
      if (!label) {
        return;
      }
      if (label.textAlign === 'right') { // left
        halves[0].push(label);
      } else { // right or center will be put on the right side
        halves[1].push(label);
      }
    });

    halves.forEach((half, index) => {
      // step 2: reduce labels
      const maxLabelsCountForOneSide = totalHeight / lineHeight;
      if (half.length > maxLabelsCountForOneSide) {
        half.sort((a, b) => { // sort by percentage DESC
          return b['..percent'] - a['..percent'];
        });
        half.splice(maxLabelsCountForOneSide, half.length - maxLabelsCountForOneSide);
      }

      // step 3: distribute position (x and y)
      half.sort((a, b) => { // sort by y ASC
        return a.y - b.y;
      });
      antiCollision(half, lineHeight, plotRange, center, index);
    });

    return halves[0].concat(halves[1]);
  }
}

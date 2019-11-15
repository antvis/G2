const Util = require('../../util');
const GeomLabels = require('./geom-labels');

const IntervalLabels = function(cfg) {
  IntervalLabels.superclass.constructor.call(this, cfg);
};

Util.extend(IntervalLabels, GeomLabels);
Util.augment(IntervalLabels, {
  setLabelPosition(point, originPoint, index, position) {
    if (Util.isFunction(position)) {
      position = position(point.text, originPoint._origin, index);
    }
    const coord = this.get('coord');
    const transposed = coord.isTransposed;
    const point0 = coord.convertPoint(originPoint.points[0]);
    const point1 = coord.convertPoint(originPoint.points[2]);
    const width = (point0.x - point1.x) / 2 * (transposed ? -1 : 1);
    const height = (point0.y - point1.y) / 2 * (transposed ? -1 : 1);

    switch (position) {
      case 'right':
        if (transposed) {
          point.x -= width;
          point.y += height;
          point.textAlign = point.textAlign || 'center';
        } else {
          point.x -= width;
          point.y += height;
          point.textAlign = point.textAlign || 'left';
        }
        break;
      case 'left':
        if (transposed) {
          point.x -= width;
          point.y -= height;
          point.textAlign = point.textAlign || 'center';
        } else {
          point.x += width;
          point.y += height;
          point.textAlign = point.textAlign || 'right';
        }
        break;
      case 'bottom':
        if (transposed) {
          point.x -= (width * 2);
          point.textAlign = point.textAlign || 'left';
        } else {
          point.y += (height * 2);
          point.textAlign = point.textAlign || 'center';
        }

        break;
      case 'middle':
        if (transposed) {
          point.x -= width;
        } else {
          point.y += height;
        }
        point.textAlign = point.textAlign || 'center';
        break;
      case 'top':
        if (transposed) {
          point.textAlign = point.textAlign || 'left';
        } else {
          point.textAlign = point.textAlign || 'center';
        }
        break;
      default:
        break;
    }
  }
});

module.exports = IntervalLabels;

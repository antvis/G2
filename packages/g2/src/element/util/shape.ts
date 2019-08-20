/**
 * 提供绘制 shape 时的一些通用方法
 */

import * as _ from '@antv/util';
import { ShapePointInfo, PointObject, DataPointType } from '../../interface';

export function splitPoints(obj: ShapePointInfo): PointObject[] {
  const points = [];
  const x = obj.x;
  let y = obj.y;
  y = _.isArray(y) ? y : [ y ];
  _.each(y, (yItem, index) => {
    const point = {
      x: _.isArray(x) ? x[index] : x,
      y: yItem,
    };
    points.push(point);
  });
  return points;
}

// rename addFillAttrs
export function setFillStyle(attrs: DataPointType, cfg: DataPointType) {
  const { color, opacity } = cfg;
  if (color) {
    attrs.fill = color;
  }
  if (_.isNumber(opacity)) {
    attrs.opacity = attrs.fillOpacity = opacity;
  }
}

// rename addStrokeAttrs
export function setStrokeStyle(attrs: DataPointType, cfg: DataPointType) {
  const { color, opacity } = cfg;
  if (color) {
    attrs.stroke = color;
  }
  if (_.isNumber(opacity)) {
    attrs.opacity = attrs.strokeOpacity = opacity;
  }
}

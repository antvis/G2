import { Path } from '@antv/g';
import { Group } from '../../../types/g';
import { Point } from '../../../types/common';
import { ShapeInfo, ShapeMarkerCfg } from '../../../types/geometry';
import { registerShape } from '../../factory';
import { getShapeStyle } from '../../../util/element';
import { getIntervalRectPath, getRectWithCornerRadius } from '../util';

/** Inerval 默认 shape，填充的矩形 */
registerShape('interval', 'rect', {
  draw(cfg: ShapeInfo, container: Group) {
    const style = getShapeStyle(cfg, false, true);

    let path;
    if (style.radius && this.coordinate.isRect) {
      path = getRectWithCornerRadius(this.parsePoints(cfg.points), this.coordinate, style.radius);
    } else {
      path = this.parsePath(getIntervalRectPath(cfg.points as Point[], style.lineCap, this.coordinate));
    }

    const shape = new Path({
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    container.appendChild(shape);

    return shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color, isInPolar } = markerCfg;
    if (isInPolar) {
      return {
        symbol: 'circle',
        style: {
          r: 4.5,
          fill: color,
        },
      };
    }

    return {
      symbol: 'square',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});

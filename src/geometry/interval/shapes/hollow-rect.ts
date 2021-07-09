import { Path } from '@antv/g';
import { Group } from '../../../types/g';
import { Point } from '../../../types/common';
import { ShapeInfo, ShapeMarkerCfg } from '../../../types/geometry';
import { registerShape } from '../../factory';
import { getShapeStyle } from '../../../util/element';
import { getRectPath } from '../util';

/** 描边柱状图 */
registerShape('interval', 'hollow-rect', {
  draw(cfg: ShapeInfo, container: Group) {
    const style = getShapeStyle(cfg, true, false);

    const path = this.parsePath(getRectPath(cfg.points as Point[]));

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
          stroke: color,
          fill: null,
        },
      };
    }

    return {
      symbol: 'square',
      style: {
        r: 4,
        stroke: color,
        fill: null,
      },
    };
  },
});

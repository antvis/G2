import { IGroup } from '../../../dependents';
import { Point, ShapeInfo } from '../../../interface';
import { ShapeMarkerCfg } from '../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';
import { getRectPath } from './util';

/** 描边柱状图 */
registerShape('interval', 'hollow-rect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false);
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

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

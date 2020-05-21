import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';
import { getCPath } from './util';

function getSmoothPath(from: Point, to: Point) {
  const sub = getCPath(from, to);
  const path = [['M', from.x, from.y]];

  path.push(sub);
  return path;
}

registerShape('edge', 'smooth', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const points = cfg.points;
    const path = this.parsePath(getSmoothPath(points[0] as Point, points[1] as Point));
    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  },
});

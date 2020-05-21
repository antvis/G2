import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

const CORNER_PERCENT = 1 / 3;

function getVHVPath(from: Point, to: Point) {
  const points = [];
  points.push({
    x: from.x,
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
  });
  points.push({
    x: to.x,
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
  });
  points.push(to);

  const path = [['M', from.x, from.y]];
  each(points, (point) => {
    path.push(['L', point.x, point.y]);
  });

  return path;
}

registerShape('edge', 'vhv', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const points = cfg.points;
    const path = this.parsePath(getVHVPath(points[0] as Point, points[1] as Point));
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

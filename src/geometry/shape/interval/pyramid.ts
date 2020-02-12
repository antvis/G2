import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';
import { getFunnelPath, getRectPoints } from './util';

/** 金字塔图，尖底漏斗图 */
registerShape('interval', 'pyramid', {
  getPoints(shapePoint: ShapePoint) {
    shapePoint.size = shapePoint.size * 2; // 漏斗图的 size 是柱状图的两倍
    return getRectPoints(shapePoint, true);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, false, true);
    const path = this.parsePath(getFunnelPath(cfg.points as Point[], cfg.nextPoints as Point[], true));
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
    const { color } = markerCfg;
    return {
      symbol: 'square',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});

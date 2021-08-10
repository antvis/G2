import { Path } from '@antv/g';
import { Group } from '../../../types/g';
import { Point } from '../../../types/common';
import { ShapeInfo, ShapePoint, ShapeMarkerCfg } from '../../../types/geometry';
import { registerShape } from '../../factory';
import { getShapeStyle } from '../../../util/element';
import { getFunnelPath, getRectPoints } from '../util';

/** 漏斗图 */
registerShape('interval', 'funnel', {
  // 漏斗图的 size 是柱状图的两倍
  getPoints(shapePoint: ShapePoint) {
    shapePoint.size *= 2;
    return getRectPoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: Group) {
    const style = getShapeStyle(cfg, false, true);
    const path = this.parsePath(getFunnelPath(cfg.points as Point[], cfg.nextPoints as Point[], false));

    const shape = new Path({
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    // @ts-ignore G 类型定义问题
    container.appendChild(shape);

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

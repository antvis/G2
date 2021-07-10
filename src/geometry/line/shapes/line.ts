import { Path } from '@antv/g';
import { each } from '@antv/util';
import { Group } from '../../../types/g';
import { ShapeInfo, ShapeMarkerCfg } from '../../../types/geometry';
import { registerShape } from '../../factory';
import { getLineShapeAttrs, getLineMarker } from '../util';

/**
 * @description 折线图的若干形态
 *
 * - line: 默认折线
 * - dot: 点线 ···
 * - dash: 断线 - - -
 */
each(['line', 'dot', 'dash', 'smooth'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeInfo, container: Group) {
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.coordinate;
        constraint = [
          [start.x, end.y],
          [end.x, start.y],
        ];
      }

      const attrs = getLineShapeAttrs(cfg, smooth, constraint);

      const shape = new Path({
        attrs,
        name: 'line',
        // capture: !smooth,
      });

      container.appendChild(shape);

      return shape;
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      return getLineMarker(markerCfg, shapeType);
    },
  });
});

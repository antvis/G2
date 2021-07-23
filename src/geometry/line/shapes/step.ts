import { Path } from '@antv/g';
import { each } from '@antv/util';
import type { Group, ShapeInfo, ShapeMarkerCfg } from '../../../types';
import { registerShape } from '../../factory';
import { getLineMarker } from '../../path/util';
import { getInterpolateShapeAttrs } from '../util/step';

/**
 * @description step 折线图的若干形态
 */
each(['hv', 'vh', 'hvh', 'vhv'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeInfo, container: Group) {
      const attrs = getInterpolateShapeAttrs(cfg, shapeType);

      const shape = new Path({
        attrs,
        name: 'line',
      });

      container.appendChild(shape);

      return shape;
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      return getLineMarker(markerCfg, shapeType);
    },
  });
});

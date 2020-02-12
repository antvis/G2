import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { MarkerSymbols } from '../../../util/marker';
import { registerShape } from '../base';
import { drawPoints, SHAPES } from './util';

// 所有的 SHAPES 都注册一下
each(SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName, false);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: MarkerSymbols[shapeName] || shapeName,
        style: {
          r: 4.5,
          fill: color,
        },
      };
    },
  });
});

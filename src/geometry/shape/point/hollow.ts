import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { MarkerSymbols } from '../../../util/marker';
import { registerShape } from '../base';
import { drawPoints, HOLLOW_SHAPES } from './util';

// 添加 hollowShape
each(HOLLOW_SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName, true);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: MarkerSymbols[shapeName],
        style: {
          r: 4.5,
          stroke: color,
          fill: null,
        },
      };
    },
  });
});

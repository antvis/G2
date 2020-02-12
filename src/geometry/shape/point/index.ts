import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { MarkerSymbols } from '../../../util/marker';
import { registerShape, registerShapeFactory } from '../base';
import { splitPoints } from '../util/split-points';
import { drawPoints, SHAPES } from './util';

const PointShapeFactory = registerShapeFactory('point', {
  defaultShapeType: 'hollow-circle',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});

each(SHAPES, (shapeName: string) => {
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow-${shapeName}`, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName, true);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: MarkerSymbols[shapeName] || shapeName,
        style: {
          r: 4.5,
          stroke: color,
          fill: null,
        },
      };
    },
  });
});

export default PointShapeFactory;

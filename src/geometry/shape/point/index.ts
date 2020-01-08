import { each, upperFirst } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';
import { registerShape, registerShapeFactory } from '../base';
import { splitPoints } from '../util/split-points';
import { drawPoints, PointSymbols, SHAPES } from './util';

const PointShapeFactory = registerShapeFactory('point', {
  defaultShapeType: 'hollowCircle',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});

each(SHAPES, (shapeName: string) => {
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow${upperFirst(shapeName)}`, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName, true);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: PointSymbols[shapeName] || shapeName,
        style: {
          r: 4.5,
          stroke: color,
        },
      };
    },
  });
});

export default PointShapeFactory;

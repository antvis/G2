import { each, max, map, isArray } from '@antv/util';
import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg, ViolinShapePoint } from '../../../interface';
import { registerShape, registerShapeFactory } from '../base';
import { getViolinPath } from '../util/get-path-points';
import { getStyle } from '../util/get-style';

function normalizeSize(arr: number[]) {
  if (!isArray(arr)) {
    return [];
  }
  const maxValue = max(arr);
  return map(arr, (num) => num / maxValue);
}

const ViolinShapeFactory = registerShapeFactory('violin', {
  defaultShapeType: 'violin',
  getDefaultPoints(pointInfo: ViolinShapePoint) {
    const radius = pointInfo.size / 2;
    const points = [];
    const sizeArr = normalizeSize(pointInfo._size);

    each(pointInfo.y as number[], (y, index) => {
      const offset = sizeArr[index] * radius;
      const isMin = index === 0;
      const isMax = index === (pointInfo.y as number[]).length - 1;
      points.push({
        isMin,
        isMax,
        x: (pointInfo.x as number) - offset,
        y,
      });
      points.unshift({
        isMin,
        isMax,
        x: (pointInfo.x as number) + offset,
        y,
      });
    });
    return points;
  },
});

registerShape('violin', 'violin', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const shapeAttrs = getStyle(cfg, true, true);
    const path = this.parsePath(getViolinPath(cfg.points));
    return container.addShape('path', {
      attrs: {
        ...shapeAttrs,
        path,
      },
      name: 'violin',
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;

    return {
      symbol: 'circle',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});

export default ViolinShapeFactory;

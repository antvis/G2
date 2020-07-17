import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getPathPoints } from '../util/get-path-points';
import { getStyle } from '../util/get-style';
import { getLineMarker } from './util';

const interpolateCallback = (point: Point, nextPoint: Point, shapeType: string) => {
  const x = point.x as number;
  const y = point.y as number;
  const nextX = nextPoint.x as number;
  const nextY = nextPoint.y as number;
  let result;

  switch (shapeType) {
    case 'hv':
      result = [{ x: nextX, y }];
      break;
    case 'vh':
      result = [{ x, y: nextY }];
      break;
    case 'hvh':
      const middleX = (nextX + x) / 2;
      result = [
        { x: middleX, y },
        { x: middleX, y: nextY },
      ];
      break;
    case 'vhv':
      const middleY = (y + nextY) / 2;
      result = [
        { x, y: middleY },
        { x: nextX, y: middleY },
      ];
      break;
    default:
      break;
  }

  return result;
};

function getInterpolatePoints(points: Point[], shapeType: string) {
  let result = [];
  each(points, (point: Point, index) => {
    const nextPoint = points[index + 1];
    result.push(point);
    if (nextPoint) {
      const interpolatePoint = interpolateCallback(point, nextPoint, shapeType);
      result = result.concat(interpolatePoint);
    }
  });
  return result;
}

// 插值的图形path，不考虑null
function getInterpolatePath(points: Point[]) {
  return points.map((point, index) => {
    return index === 0 ? ['M', point.x, point.y] : ['L', point.x, point.y];
  });
}

// 插值的图形
function getInterpolateShapeAttrs(cfg: ShapeInfo, shapeType: string) {
  const points = getPathPoints(cfg.points, cfg.connectNulls, cfg.showSinglePoint); // 根据 connectNulls 值处理 points
  let path = [];
  each(points, (eachLinePoints) => {
    const interpolatePoints = getInterpolatePoints(eachLinePoints, shapeType);
    path = path.concat(getInterpolatePath(interpolatePoints));
  });

  return {
    ...getStyle(cfg, true, false, 'lineWidth'),
    path,
  };
}

// step line
each(['hv', 'vh', 'hvh', 'vhv'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const attrs = getInterpolateShapeAttrs(cfg, shapeType);
      const shape = container.addShape({
        type: 'path',
        attrs,
        name: 'line',
      });

      return shape;
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      return getLineMarker(markerCfg, shapeType);
    },
  });
});

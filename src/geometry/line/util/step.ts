import { each } from '@antv/util';
import { Point, ShapeInfo } from '../../../types';
import { getShapeStyle } from '../../../util/element';
import { getPathPoints } from './path';

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
      result = [
        { x: (nextX + x) / 2, y },
        { x: (nextX + x) / 2, y: nextY },
      ];
      break;
    case 'vhv':
      result = [
        { x, y: (y + nextY) / 2 },
        { x: nextX, y: (y + nextY) / 2 },
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
export function getInterpolateShapeAttrs(cfg: ShapeInfo, shapeType: string) {
  const points = getPathPoints(cfg.points, cfg.connectNulls, cfg.showSinglePoint); // 根据 connectNulls 值处理 points
  let path = [];
  each(points, (eachLinePoints) => {
    const interpolatePoints = getInterpolatePoints(eachLinePoints, shapeType);
    path = path.concat(getInterpolatePath(interpolatePoints));
  });

  return {
    ...getShapeStyle(cfg, true, false, 'lineWidth'),
    path,
  };
}

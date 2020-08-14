import { each } from '@antv/util';
import { Coordinate, PathCommand } from '../../../dependents';
import { Point, Position, Shape, ShapeInfo } from '../../../interface';

import { getPathPoints } from '../util/get-path-points';
import { getStyle } from '../util/get-style';
import { getLinePath, getSplinePath } from '../util/path';

function getPath(
  points: Point[],
  isInCircle: boolean,
  smooth: boolean,
  registeredShape: Shape,
  constraint?: Position[]
): PathCommand[] {
  let path = [];

  if (points.length) {
    const topLinePoints = []; // area 区域上部分
    let bottomLinePoints = []; // area 区域下部分
    for (let i = 0, len = points.length; i < len; i++) {
      const point = points[i];
      topLinePoints.push(point[1]);
      bottomLinePoints.push(point[0]);
    }
    bottomLinePoints = bottomLinePoints.reverse();

    each([topLinePoints, bottomLinePoints], (pointsData, index) => {
      let subPath = [];
      const parsedPoints = registeredShape.parsePoints(pointsData);
      const p1 = parsedPoints[0];

      if (topLinePoints.length === 1 && bottomLinePoints.length === 1) {
        // 都只有一个点，绘制一条竖线
        subPath =
          index === 0
            ? [
                ['M', p1.x - 0.5, p1.y],
                ['L', p1.x + 0.5, p1.y],
              ]
            : [
                ['L', p1.x + 0.5, p1.y],
                ['L', p1.x - 0.5, p1.y],
              ];
      } else {
        if (isInCircle) {
          parsedPoints.push({ x: p1.x, y: p1.y });
        }
        if (smooth) {
          subPath = getSplinePath(parsedPoints, false, constraint);
        } else {
          subPath = getLinePath(parsedPoints, false);
        }
        if (index > 0) {
          subPath[0][0] = 'L';
        }
      }

      path = path.concat(subPath);
    });

    path.push(['Z']);
  }

  return path;
}

/**
 * @ignore
 * Gets shape attrs
 * @param cfg
 * @param isStroke
 * @param smooth
 * @param registeredShape
 * @param [constraint]
 * @returns
 */
export function getShapeAttrs(
  cfg: ShapeInfo,
  isStroke: boolean,
  smooth: boolean,
  registeredShape: Shape,
  constraint?: Position[]
) {
  const attrs = getStyle(cfg, isStroke, !isStroke, 'lineWidth');
  const { connectNulls, isInCircle, points, showSinglePoint } = cfg;
  const pathPoints = getPathPoints(points, connectNulls, showSinglePoint); // 根据 connectNulls 配置获取图形关键点

  let path = [];
  for (let i = 0, len = pathPoints.length; i < len; i++) {
    const eachPoints = pathPoints[i];
    path = path.concat(getPath(eachPoints, isInCircle, smooth, registeredShape, constraint));
  }
  attrs.path = path;

  return attrs;
}

/**
 * @ignore
 * Gets constraint
 * @param coordinate
 * @returns constraint
 */
export function getConstraint(coordinate: Coordinate): Position[] {
  const { start, end } = coordinate;
  return [
    [start.x, end.y],
    [end.x, start.y],
  ];
}

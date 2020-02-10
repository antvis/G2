import { isArray, isNil } from '@antv/util';
import { PathCommand } from '../../../dependents';
import { Point } from '../../../interface';
import { ShapePoint } from '../interface';


/**
 * 根据数据点生成矩形的四个关键点
 * @param pointInfo 数据点信息
 * @param [isPyramid] 是否为尖底漏斗图
 * @returns rect points 返回矩形四个顶点信息
 */
export function getRectPoints(pointInfo: ShapePoint, isPyramid = false): Point[] {
  const { x, y, y0, size } = pointInfo;
  // 有 4 种情况，
  // 1. x, y 都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  // 4. x, y 都是数组
  let yMin;
  let yMax;
  if (isArray(y)) {
    [yMin, yMax] = y;
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (isArray(x)) {
    [xMin, xMax] = x;
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  const points = [
    { x: xMin, y: yMin },
    { x: xMin, y: yMax },
  ];

  if (isPyramid) {
    // 绘制尖底漏斗图
    // 金字塔漏斗图的关键点
    // 1
    // |   2
    // 0
    points.push({
      x: xMax,
      y: (yMax + yMin) / 2,
    });
  } else {
    // 矩形的四个关键点，结构如下（左下角顺时针连接）
    // 1 ---- 2
    // |      |
    // 0 ---- 3
    points.push({ x: xMax, y: yMax }, { x: xMax, y: yMin });
  }

  return points;
}

/**
 * 根据矩形关键点绘制 path
 * @param points 关键点数组
 * @returns 返回矩形的 path
 */
export function getRectPath(points: Point[]): PathCommand[] {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
  path.push(['z']);
  return path;
}

/**
 * 根据 funnel 关键点绘制漏斗图的 path
 * @param points 图形关键点信息
 * @param nextPoints 下一个数据的图形关键点信息
 * @param isPyramid 是否为尖底漏斗图
 * @returns 返回漏斗图的图形 path
 */
export function getFunnelPath(points: Point[], nextPoints: Point[], isPyramid: boolean) {
  const path = [];
  if (!isNil(nextPoints)) {
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', nextPoints[1].x, nextPoints[1].y],
      ['L', nextPoints[0].x, nextPoints[0].y],
      ['Z']
    );
  } else if (isPyramid) {
    // 金字塔最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[2].x, points[2].y],
      ['Z']
    );
  } else {
    // 漏斗图最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z']
    );
  }

  return path;
}

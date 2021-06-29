import { Coordinate } from '@antv/coord';
import { isArray, isNil } from '@antv/util';
import { PathCommand } from '../../types/g';
import { Point } from '../../types/common';
import { ShapePoint } from '../../types/geometry';

/**
 * @ignore
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
 * @ignore
 * 根据矩形关键点绘制 path
 * @param points 关键点数组
 * @param isClosed path 是否需要闭合
 * @returns 返回矩形的 path
 */
export function getRectPath(points: Point[], isClosed: boolean = true): PathCommand[] {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  // 对于 shape="line" path 不应该闭合，否则会造成 lineCap 绘图属性失效
  if (isClosed) {
    path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
    path.push(['z']);
  }
  return path;
}

/**
 * 处理 rect path 的 radius
 * @returns 返回矩形 path 的四个角的 arc 半径
 */
export function parseRadius(radius: number | number[], minLength: number): number[] {
  let r1 = 0;
  let r2 = 0;
  let r3 = 0;
  let r4 = 0;
  if (isArray(radius)) {
    if (radius.length === 1) {
      r1 = r2 = r3 = r4 = radius[0];
    } else if (radius.length === 2) {
      r1 = r3 = radius[0];
      r2 = r4 = radius[1];
    } else if (radius.length === 3) {
      r1 = radius[0];
      r2 = r4 = radius[1];
      r3 = radius[2];
    } else {
      r1 = radius[0];
      r2 = radius[1];
      r3 = radius[2];
      r4 = radius[3];
    }
  } else {
    r1 = r2 = r3 = r4 = radius;
  }

  // 处理 边界值
  if (r1 + r2 > minLength) {
    r1 = r1 ? minLength / (1 + r2 / r1) : 0;
    r2 = minLength - r1;
  }

  if (r3 + r4 > minLength) {
    r3 = r3 ? minLength / (1 + r4 / r3) : 0;
    r4 = minLength - r3;
  }

  return [r1 || 0, r2 || 0, r3 || 0, r4 || 0];
}

/**
 * @ignore
 * 根据矩形关键点绘制 path
 * @param points 关键点数组
 * @param lineCap 'round'圆角样式
 * @param coor 坐标
 * @returns 返回矩形的 path
 */
export function getIntervalRectPath(
  points: Point[], lineCap: 'butt' | 'round' | 'square', coor: Coordinate,
): PathCommand[] {
  const width = coor.getWidth();
  const height = coor.getHeight();
  const isRect = coor.type === 'rect';
  let path = [];
  const r = (points[2].x - points[1].x) / 2;
  const ry = coor.isTransposed ? (r * height) / width : (r * width) / height;
  if (lineCap === 'round') {
    if (isRect) {
      path.push(['M', points[0].x, points[0].y + ry]);
      path.push(['L', points[1].x, points[1].y - ry]);
      path.push(['A', r, r, 0, 0, 1, points[2].x, points[2].y - ry]);
      path.push(['L', points[3].x, points[3].y + ry]);
      path.push(['A', r, r, 0, 0, 1, points[0].x, points[0].y + ry]);
    } else {
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path.push(['A', r, r, 0, 0, 1, points[2].x, points[2].y]);
      path.push(['L', points[3].x, points[3].y]);
      path.push(['A', r, r, 0, 0, 1, points[0].x, points[0].y]);
    }
    path.push(['z']);
  } else {
    path = getRectPath(points);
  }
  return path;
}

/**
 * @ignore
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
      ['Z'],
    );
  } else if (isPyramid) {
    // 金字塔最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[2].x, points[2].y],
      ['Z'],
    );
  } else {
    // 漏斗图最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z'],
    );
  }

  return path;
}

/**
 * 获取 倒角 矩形
 * - 目前只适用于笛卡尔坐标系下
 */
export function getRectWithCornerRadius(points: Point[], coordinate: Coordinate, radius?: number | number[]) {
  // 获取 四个关键点
  let [p0, p1, p2, p3] = points;
  let [r1, r2, r3, r4] = [0, 0, 0, 0];

  /**
   *  p1 → p2
   *  ↑    ↓
   *  p0 ← p3
   *
   *  负数的情况，关键点会变成下面的形式
   *
   *  p0 ← p3
   *  ↓    ↑
   *  p1 → p2
   */
  if (p0.y < p1.y /** 负数情况 */) {
    [p1, p0, p3, p2] = points;
    [r4, r3, r2, r1] = parseRadius(radius, Math.min(p3.x - p0.x, p0.y - p1.y));
  } else {
    [r1, r2, r3, r4] = parseRadius(radius, Math.min(p3.x - p0.x, p0.y - p1.y));
  }

  /**
   * 转置前
   *  p1 → p2
   *  ↑    ↓
   *  p0 ← p3
   *
   * 转置后(↓ 是 x 轴递增，→ 是 y 轴递增)，从 p0 开始绘制，对应的 radius: [r3, r2, r1, r4]
   * p3 ← p2
   * ↓    ↑
   * P0 → p1（points[3]）
   *
   *  负数的情况，y 轴翻转
   *
   *  p0 → p1
   *  ↑    ↓
   *  p3 ← p2
   */
  if (coordinate.isTransposed) {
    [p0, p3, p2, p1] = points;
    if (points[0].x > points[1].x /** 负数情况 */) {
      [p3, p0, p1, p2] = points;
      [r1, r4, r3, r2] = parseRadius(radius, Math.min(p3.x - p0.x, p0.y - p1.y));
    } else {
      [r2, r3, r4, r1] = parseRadius(radius, Math.min(p3.x - p0.x, p0.y - p1.y));
    }
  }

  const path = [];
  path.push(['M', p1.x, p1.y + r1]);
  r1 !== 0 && path.push(['A', r1, r1, 0, 0, 1, p1.x + r1, p1.y]);
  path.push(['L', p2.x - r2, p2.y]);
  r2 !== 0 && path.push(['A', r2, r2, 0, 0, 1, p2.x, p2.y + r2]);
  path.push(['L', p3.x, p3.y - r3]);
  r3 !== 0 && path.push(['A', r3, r3, 0, 0, 1, p3.x - r3, p3.y]);
  path.push(['L', p0.x + r4, p0.y]);
  r4 !== 0 && path.push(['A', r4, r4, 0, 0, 1, p0.x, p0.y - r4]);
  path.push(['L', p1.x, p1.y + r1]);
  path.push(['z']);

  return path;
}

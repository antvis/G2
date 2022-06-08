import { Coordinate } from '@antv/coord';
import { isArray, isNil, get } from '@antv/util';
import { getAngle, getSectorPath } from '../../../util/graphics';
import { PathCommand } from '../../../dependents';
import { Point, ShapeInfo, ShapePoint } from '../../../interface';

/**
 * @ignore
 * 根据数据点生成矩形的四个关键点
 * @param pointInfo 数据点信息
 * @param [isPyramid] 是否为尖底漏斗图
 * @returns rect points 返回矩形四个顶点信息
 */
export function getRectPoints(pointInfo: ShapePoint): Point[] {
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

  // 矩形的四个关键点，结构如下（左下角顺时针连接）
  // 1 ---- 2
  // |      |
  // 0 ---- 3
  points.push({ x: xMax, y: yMax }, { x: xMax, y: yMin });

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
 * 获取 interval 矩形背景的 path
 * @param cfg 关键点的信息
 * @param points 已转化为画布坐标的 4 个关键点
 * @param coordinate 坐标系
 * @returns 返回矩形背景的 path
 */
export function getBackgroundRectPath(cfg: ShapeInfo, points: Point[], coordinate: Coordinate): PathCommand[] {
  let path = [];
  if (coordinate.isRect) {
    const p0 = coordinate.isTransposed
      ? { x: coordinate.start.x, y: points[0].y }
      : { x: points[0].x, y: coordinate.start.y };
    const p1 = coordinate.isTransposed
      ? { x: coordinate.end.x, y: points[2].y }
      : { x: points[3].x, y: coordinate.end.y };

    // corner radius of background shape works only in 笛卡尔坐标系
    const radius = get(cfg, ['background', 'style', 'radius']);
    if (radius) {
      const width = coordinate.isTransposed ? Math.abs(points[0].y - points[2].y) : points[2].x - points[1].x;
      const height = coordinate.isTransposed ? coordinate.getWidth() : coordinate.getHeight();
      const [r1, r2, r3, r4] = parseRadius(radius, Math.min(width, height));

      // 同时存在 坐标系是否发生转置 和 y 镜像的时候
      const isReflectYTransposed = (coordinate.isTransposed && coordinate.isReflect('y'));
      const bump = isReflectYTransposed ? 0 : 1;
      const opposite = (r: number) => isReflectYTransposed ? -r : r;

      path.push(['M', p0.x, p1.y + opposite(r1)]);
      r1 !== 0 && path.push(['A', r1, r1, 0, 0, bump, p0.x + r1, p1.y]);
      path.push(['L', p1.x - r2, p1.y]);
      r2 !== 0 && path.push(['A', r2, r2, 0, 0, bump, p1.x, p1.y + opposite(r2)]);
      path.push(['L', p1.x, p0.y - opposite(r3)]);
      r3 !== 0 && path.push(['A', r3, r3, 0, 0, bump, p1.x - r3, p0.y]);
      path.push(['L', p0.x + r4, p0.y]);
      r4 !== 0 && path.push(['A', r4, r4, 0, 0, bump, p0.x, p0.y - opposite(r4)]);
    } else {
      path.push(['M', p0.x, p0.y]);
      path.push(['L', p1.x, p0.y]);
      path.push(['L', p1.x, p1.y]);
      path.push(['L', p0.x, p1.y]);
      path.push(['L', p0.x, p0.y]);
    }

    path.push(['z']);
  }

  if (coordinate.isPolar) {
    const center = coordinate.getCenter();
    const { startAngle, endAngle } = getAngle(cfg, coordinate);
    if (coordinate.type !== 'theta' && !coordinate.isTransposed) {
      // 获取扇形 path
      path = getSectorPath(center.x, center.y, coordinate.getRadius(), startAngle, endAngle);
    } else {
      const pow = (v) => Math.pow(v, 2);
      const r1 = Math.sqrt(pow(center.x - points[0].x) + pow(center.y - points[0].y));
      const r2 = Math.sqrt(pow(center.x - points[2].x) + pow(center.y - points[2].y));
      // 获取扇形 path（其实是一个圆环，从 coordinate 的起始角度到结束角度）
      path = getSectorPath(center.x, center.y, r1, coordinate.startAngle, coordinate.endAngle, r2);
    }
  }
  return path;
}

/**
 * @ignore
 * 根据矩形关键点绘制 path
 * @param points 关键点数组
 * @param lineCap 'round'圆角样式
 * @param coor 坐标
 * @returns 返回矩形的 path
 */
export function getIntervalRectPath(points: Point[], lineCap: CanvasLineCap, coor: Coordinate): PathCommand[] {
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
      ['Z']
    );
  } else if (isPyramid) {
    // 金字塔最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', (points[2].x + points[3].x) / 2, (points[2].y + points[3].y) / 2],
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

/**
 * 交换两个对象
 */
function swap<T>(p0: T, p1: T) {
  return [p1, p0];
}

/**
 * 获取 倒角 矩形
 * - 目前只适用于笛卡尔坐标系下
 */
export function getRectWithCornerRadius(points: Point[], coordinate: Coordinate, radius?: number | number[]) {
  // 获取 四个关键点
  let [p0, p1, p2, p3] = [...points];
  let [r1, r2, r3, r4] = typeof radius === 'number' ? Array(4).fill(radius) : radius;

  if (coordinate.isTransposed) {
    [p1, p3] = swap(p1, p3);
  }

  /**
   * 存在镜像
   */
  if (coordinate.isReflect('y')) {
    [p0, p1] = swap(p0, p1);
    [p2, p3] = swap(p2, p3);
  }
  if (coordinate.isReflect('x')) {
    [p0, p3] = swap(p0, p3);
    [p1, p2] = swap(p1, p2);
  }

  const path = [];


  /**
   *  p1 → p2
   *  ↑    ↓
   *  p0 ← p3
   *
   *  负数的情况，关键点会变成下面的形式
   *
   *  p0 ← p3               p2 ← p1
   *  ↓    ↑                ↓     ↑
   *  p1 → p2  --> (转置下)  p3 → p0
   */
  const abs = v => Math.abs(v);
  [r1, r2, r3, r4] = parseRadius([r1, r2, r3, r4], Math.min(abs(p3.x - p0.x), abs(p1.y - p0.y))).map(d => abs(d));

  if (coordinate.isTransposed) {
    [r1, r2, r3, r4] = [r4, r1, r2, r3]
  }

  if (p0.y < p1.y /** 负数情况 */) {
    path.push(['M', p3.x, p3.y + r3]);
    r3 !== 0 && path.push(['A', r3, r3, 0, 0, 0, p3.x - r3, p3.y]);
    path.push(['L', p0.x + r4, p0.y]);
    r4 !== 0 && path.push(['A', r4, r4, 0, 0, 0, p0.x, p0.y + r4]);
    path.push(['L', p1.x, p1.y - r1]);
    r1 !== 0 && path.push(['A', r1, r1, 0, 0, 0/** 逆时针 */, p1.x + r1, p1.y]);
    path.push(['L', p2.x - r2, p2.y]);
    r2 !== 0 && path.push(['A', r2, r2, 0, 0, 0, p2.x, p2.y - r2]);
    path.push(['L', p3.x, p3.y + r3]);
    path.push(['z']);
  } else if (p3.x < p0.x) {
    path.push(['M', p2.x + r2, p2.y]);
    r2 !== 0 && path.push(['A', r2, r2, 0, 0, 0, p2.x, p2.y + r2]);
    path.push(['L', p3.x, p3.y - r3]);
    r3 !== 0 && path.push(['A', r3, r3, 0, 0, 0, p3.x + r3, p3.y]);
    path.push(['L', p0.x - r4, p0.y]);
    r4 !== 0 && path.push(['A', r4, r4, 0, 0, 0, p0.x, p0.y - r4]);
    path.push(['L', p1.x, p1.y + r1]);
    r1 !== 0 && path.push(['A', r1, r1, 0, 0, 0, p1.x - r1, p1.y]);
    path.push(['L', p2.x + r2, p2.y]);
    path.push(['z']);
  } else {
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
  }

  return path;
}

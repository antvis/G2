import { BBox } from '@antv/g-svg';
import { vec2 } from '@antv/matrix-util'; 
import { each, isEmpty, isNumber, isNumberEqual } from '@antv/util';
import { Coordinate, IShape, Point } from '../dependents';
import { ShapeInfo } from '../interface';

const { dot } = vec2;
type Vec2 = [number, number];

// 获取图形的包围盒
function getPointsBox(points) {
  if (isEmpty(points)) {
    return null;
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;
  each(points, (point) => {
    minX = minX > point.x ? point.x : minX;
    maxX = maxX < point.x ? point.x : maxX;
    minY = minY > point.y ? point.y : minY;
    maxY = maxY < point.y ? point.y : maxY;
  });

  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

/**
 * @ignore
 * 根据弧度计算极坐标系下的坐标点
 * @param centerX
 * @param centerY
 * @param radius
 * @param angleInRadian
 * @returns
 */
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadian: number) {
  return {
    x: centerX + radius * Math.cos(angleInRadian),
    y: centerY + radius * Math.sin(angleInRadian),
  };
}

/**
 * @ignore
 * 根据起始角度计算绘制扇形的 path
 * @param centerX
 * @param centerY
 * @param radius
 * @param startAngleInRadian
 * @param endAngleInRadian
 * @returns
 */
export function getSectorPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngleInRadian: number,
  endAngleInRadian: number,
  innerRadius: number = 0
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngleInRadian);
  const end = polarToCartesian(centerX, centerY, radius, endAngleInRadian);

  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngleInRadian);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngleInRadian);

  if (endAngleInRadian - startAngleInRadian === Math.PI * 2) {
    // 整个圆是分割成两个圆
    const middlePoint = polarToCartesian(centerX, centerY, radius, startAngleInRadian + Math.PI);
    const innerMiddlePoint = polarToCartesian(centerX, centerY, innerRadius, startAngleInRadian + Math.PI);
    const circlePathCommands = [
      ['M', start.x, start.y],
      ['A', radius, radius, 0, 1, 1, middlePoint.x, middlePoint.y],
      ['A', radius, radius, 0, 1, 1, end.x, end.y],
      ['M', innerStart.x, innerStart.y],
    ];
    if (innerRadius) {
      circlePathCommands.push(['A', innerRadius, innerRadius, 0, 1, 0, innerMiddlePoint.x, innerMiddlePoint.y]);
      circlePathCommands.push(['A', innerRadius, innerRadius, 0, 1, 0, innerEnd.x, innerEnd.y]);
    }

    circlePathCommands.push(['M', start.x, start.y]);
    circlePathCommands.push(['Z']);

    return circlePathCommands;
  }

  const arcSweep = endAngleInRadian - startAngleInRadian <= Math.PI ? 0 : 1;
  const sectorPathCommands = [
    ['M', start.x, start.y],
    ['A', radius, radius, 0, arcSweep, 1, end.x, end.y],
    ['L', innerEnd.x, innerEnd.y],
  ];
  if (innerRadius) {
    sectorPathCommands.push(['A', innerRadius, innerRadius, 0, arcSweep, 0, innerStart.x, innerStart.y]);
  }
  sectorPathCommands.push(['L', start.x, start.y]);
  sectorPathCommands.push(['Z']);

  return sectorPathCommands;
}

/**
 * @ignore
 * Gets arc path
 * @param centerX
 * @param centerY
 * @param radius
 * @param startAngleInRadian
 * @param endAngleInRadian
 * @returns
 */
export function getArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngleInRadian: number,
  endAngleInRadian: number
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngleInRadian);
  const end = polarToCartesian(centerX, centerY, radius, endAngleInRadian);

  if (isNumberEqual(endAngleInRadian - startAngleInRadian, Math.PI * 2)) {
    const middlePoint = polarToCartesian(centerX, centerY, radius, startAngleInRadian + Math.PI);
    return [
      ['M', start.x, start.y],
      ['A', radius, radius, 0, 1, 1, middlePoint.x, middlePoint.y],
      ['A', radius, radius, 0, 1, 1, start.x, start.y],
      ['A', radius, radius, 0, 1, 0, middlePoint.x, middlePoint.y],
      ['A', radius, radius, 0, 1, 0, start.x, start.y],
      ['Z'],
    ];
  }
  const arcSweep = endAngleInRadian - startAngleInRadian <= Math.PI ? 0 : 1;
  return [
    ['M', start.x, start.y],
    ['A', radius, radius, 0, arcSweep, 1, end.x, end.y],
  ];
}

/**
 * @ignore
 * 从数据模型中的 points 换算角度
 * @param shapeModel
 * @param coordinate
 * @returns
 */
export function getAngle(shapeModel: ShapeInfo, coordinate: Coordinate) {
  const points = shapeModel.points;
  const box = getPointsBox(points);
  let endAngle;
  let startAngle;
  const { startAngle: coordStartAngle, endAngle: coordEndAngle } = coordinate;
  const diffAngle = coordEndAngle - coordStartAngle;

  if (coordinate.isTransposed) {
    endAngle = box.maxY * diffAngle;
    startAngle = box.minY * diffAngle;
  } else {
    endAngle = box.maxX * diffAngle;
    startAngle = box.minX * diffAngle;
  }
  endAngle += coordStartAngle;
  startAngle += coordStartAngle;
  return {
    startAngle,
    endAngle,
  };
}

/**
 * @ignore
 * 计算多边形重心: https://en.wikipedia.org/wiki/Centroid#Of_a_polygon
 */
export function getPolygonCentroid(xs: number | number[], ys: number | number[]) {
  if (isNumber(xs) && isNumber(ys)) {
    // 普通色块图，xs 和 ys 是数值
    return [xs, ys];
  }
  let i = -1;
  let x = 0;
  let y = 0;
  let former;
  let current = (xs as number[]).length - 1;
  let diff;
  let k = 0;
  while (++i < (xs as number[]).length) {
    former = current;
    current = i;
    k += diff = xs[former] * ys[current] - xs[current] * ys[former];
    x += (xs[former] + xs[current]) * diff;
    y += (ys[former] + ys[current]) * diff;
  }
  k *= 3;
  return [x / k, y / k];
}

/**
 * @ignore
 * 获取需要替换的属性，如果原先图形元素存在，而新图形不存在，则设置 undefined
 */
export function getReplaceAttrs(sourceShape: IShape, targetShape: IShape) {
  const originAttrs = sourceShape.attr();
  const newAttrs = targetShape.attr();
  each(originAttrs, (v, k) => {
    if (newAttrs[k] === undefined) {
      newAttrs[k] = undefined;
    }
  });
  return newAttrs;
}

type Box = Pick<BBox, 'x' | 'y' | 'width' | 'height'> & { rotation?: number };

/**
 * 定义投影对象
 */
type Projection = { min: number; max: number };

/**
 * @private
 * 1. 获取投影轴
 */
function getAxes(points: Point[] /** 多边形的关键点 */): Vec2[] {
  // 目前先处理 平行矩形 的场景, 其他多边形不处理
  if (points.length > 4) {
    return [];
  }
  // 获取向量
  const vector = (start: Point, end: Point): Vec2 => {
    return [end.x - start.x, end.y - start.y];
  };

  // 由于 矩形的平行原理，所以只有 2 条投影轴: A -> B, B -> C
  const AB = vector(points[0], points[1]);
  const BC = vector(points[1], points[2]);

  return [AB, BC];
}

/**
 * @private
 * 绕指定点顺时针旋转后的点坐标
 * 默认绕原点旋转
 */
function rotateAtPoint(point: Point, deg = 0, origin = { x: 0, y: 0 }): Point {
  const { x, y } = point;
  return {
    x: (x - origin.x) * Math.cos(-deg) + (y - origin.y) * Math.sin(-deg) + origin.x,
    y: (origin.x - x) * Math.sin(-deg) + (y - origin.y) * Math.cos(-deg) + origin.y,
  };
}

/**
 * @private
 * 转化为顶点坐标数组
 *
 * @param {Object} box
 */
function getRectPoints(box: Box): Point[] {
  const points = [
    { x: box.x, y: box.y },
    { x: box.x + box.width, y: box.y },
    { x: box.x + box.width, y: box.y + box.height },
    { x: box.x, y: box.y + box.height },
  ];

  const rotation = box.rotation;
  if (rotation) {
    return [
      rotateAtPoint(points[0], rotation, points[0]),
      rotateAtPoint(points[1], rotation, points[0]),
      rotateAtPoint(points[2], rotation, points[0]),
      rotateAtPoint(points[3], rotation, points[0]),
    ];
  }

  return points;
}

/**
 * @private
 * 2. 获取多边形在投影轴上的投影
 *
 * 向量的点积的其中一个几何含义是：一个向量在平行于另一个向量方向上的投影的数值乘积。
 * 由于投影轴是单位向量（长度为1），投影的长度为 x1 * x2 + y1 * y2
 */
function getProjection(points: Point[] /** 多边形的关键点 */, axis: Vec2): Projection {
  // 目前先处理矩形的场景
  if (points.length > 4) {
    return { min: 0, max: 0 };
  }

  const scalars = [];
  points.forEach((point) => {
    scalars.push(dot([point.x, point.y], axis));
  });

  return { min: Math.min(...scalars), max: Math.max(...scalars) };
}

function isProjectionOverlap(projection1: Projection, projection2: Projection): boolean {
  return projection1.max > projection2.min && projection1.min < projection2.max;
}

/**
 * 快速判断两个无旋转矩形是否遮挡
 */
export function isIntersectRect(box1: Box, box2: Box, margin: number = 0): boolean {
  return !(
    box2.x > box1.x + box1.width + margin ||
    box2.x + box2.width < box1.x - margin ||
    box2.y > box1.y + box1.height + margin ||
    box2.y + box2.height < box1.y - margin
  );
}

/**
 * detect whether two shape is intersected, useful when shape is been rotated
 * 判断两个矩形是否重叠（相交和包含, 是否旋转）
 *
 * - 原理: 分离轴定律
 */
export function isIntersect(box1: Box, box2: Box) {

  // 如果两个矩形没有旋转，使用快速判断
  if (!box1.rotation && !box2.rotation) {
    return isIntersectRect(box1, box2);
  }

  // 分别获取 4 个关键点
  const rect1Points = getRectPoints(box1);
  const rect2Points = getRectPoints(box2);

  // 获取所有投影轴
  const axes = [...getAxes(rect1Points), ...getAxes(rect2Points)];

  for (let i = 0; i < axes.length; i++) {
    const axis = axes[i];
    const projection1 = getProjection(rect1Points, axis);
    const projection2 = getProjection(rect2Points, axis);

    // 判断投影轴上的投影是否存在重叠，若检测到存在间隙则立刻退出判断，消除不必要的运算。
    if (!isProjectionOverlap(projection1, projection2)) return false;
  }

  return true;
}

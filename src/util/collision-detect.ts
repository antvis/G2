import { isNumber } from '@antv/util';
import { Point } from '../dependents';

type Vec2 = [number, number];

type Item = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  visible?: boolean;
};
/**
 * 定义投影对象
 */
type Projection = { min: number; max: number };

function dot(a, b) {
  return (a[0] || 0) * (b[0] || 0) + (a[1] || 0) * (b[1] || 0) + (a[2] || 0) * (b[2] || 0);
}

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
function getRectPoints(box: Item): Point[] {
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

function isValidNumber(d: number) {
  return typeof d === 'number' && !Number.isNaN(d) && d !== Infinity && d !== -Infinity;
}

function isValidBox(box: Item) {
  return ['x', 'y', 'width', 'height'].every(attr => isValidNumber(box[attr]))
}

/**
 * 快速判断两个无旋转矩形是否遮挡
 */
export function isIntersectRect(box1: Item, box2: Item, margin: number = 0): boolean {
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
export function intersect(box1: Item, box2: Item, margin: number = 0) {
  // 如果两个 box 中有一个是不合法的 box，也就是不会被渲染出来的，那么它们就不相交。
  if (!isValidBox(box1) || !isValidBox(box2)) return false;

  // 如果两个矩形没有旋转，使用快速判断
  if (!box1.rotation && !box2.rotation) {
    return isIntersectRect(box1, box2, margin);
  }

  // 分别获取 4 个关键点
  const rect1Points = getRectPoints(box1);
  const rect2Points = getRectPoints(box2);

  // 获取所有投影轴
  const axes = getAxes(rect1Points).concat(getAxes(rect2Points));

  for (let i = 0; i < axes.length; i++) {
    const axis = axes[i];
    const projection1 = getProjection(rect1Points, axis);
    const projection2 = getProjection(rect2Points, axis);

    // 判断投影轴上的投影是否存在重叠，若检测到存在间隙则立刻退出判断，消除不必要的运算。
    if (!isProjectionOverlap(projection1, projection2)) {
      return false;
    }
  }

  return true;
}

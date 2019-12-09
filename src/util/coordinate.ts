import { each, some } from '@antv/util';
import { CoordinateOption } from '../chart/interface';
import { Coordinate, getCoordinate } from '../dependents';
import { Point } from '../interface';
import { BBox } from './bbox';
import { isBetween } from './helper';


/**
 * Gets x dimension length
 * @param coordinate
 * @returns x dimension length
 */
export function getXDimensionLength(coordinate): number {
  if (coordinate.isPolar && !coordinate.isTransposed) {
    // 极坐标系下 width 为弧长
    return (coordinate.endAngle - coordinate.startAngle) * coordinate.getRadius();
  }

  // 直角坐标系
  const start = coordinate.convert({ x: 0, y: 0 });
  const end = coordinate.convert({ x: 1, y: 0 });
  // 坐标系有可能发生 transpose 等变换，所有通过两点之间的距离进行计算
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
}

/**
 * Determines whether full circle is
 * @param coordinate
 * @returns true if full circle
 */
export function isFullCircle(coordinate: Coordinate): boolean {
  if (coordinate.isPolar) {
    const { startAngle, endAngle } = coordinate;
    return endAngle - startAngle === Math.PI * 2;
  }
  return false;
}

/**
 * Gets distance to center
 * @param coordinate
 * @param point
 * @returns distance to center
 */
export function getDistanceToCenter(coordinate: Coordinate, point: Point): number {
  const center = coordinate.getCenter() as Point;
  return Math.sqrt((point.x - center.x) ** 2 + (point.y - center.y) ** 2);
}

/**
 * 坐标点是否在坐标系中
 * @param coordinate
 * @param point
 */
export function isPointInCoordinate(coordinate: Coordinate, point: Point) {
  let result = false;

  if (coordinate) {
    if (coordinate.type === 'theta') {
      const { start, end } = coordinate;
      result = isBetween(point.x, start.x, end.x) && isBetween(point.y, start.y, end.y);
    } else {
      const invertPoint = coordinate.invert(point);

      result = isBetween(invertPoint.x, 0, 1) && isBetween(invertPoint.y, 0, 1);
    }
  }

  return result;
}

/** 获取点到圆心的连线与水平方向的夹角 */
export function getPointAngle(coordinate: Coordinate, point: Point): number {
  const center = coordinate.getCenter();
  return Math.atan2(point.y - center.y, point.x - center.x);
}

/**
 * 是否存在 action
 * @param actions
 * @param actionName
 * @returns whether has action
 */
export function hasAction(actions, actionName) {
  return some(actions, (action) => action[0] === actionName);
}

/**
 * 是够是 Theta 坐标系
 * @param type
 * @returns whether theta
 */
export function isTheta(type: string): boolean {
  return type === 'theta';
}
/**
 * 创建坐标系
 * @param coordinateOption
 * @param coordinateBBox
 * @returns [[Coordinate]]
 */
export function createCoordinate(
  coordinateOption: CoordinateOption = {},
  coordinateBBox: BBox = new BBox(0, 0, 0, 0)
): Coordinate {
  const { type = 'rect', cfg, actions = [] } = coordinateOption;

  // 1. 起始位置
  const start = coordinateBBox.bl;
  const end = coordinateBBox.tr;

  const props = {
    start,
    end,
    ...cfg,
  };

  // 2. 创建实例
  const C = getCoordinate(isTheta(type) ? 'polar' : type);

  const coordinate = new C(props);
  // @ts-ignore FIXME coordinate 包问题导致 type 不正确
  coordinate.type = type;

  // 3. 执行 actions
  let coordinateActions = actions;
  if (isTheta(type)) {
    // 不存在 transpose，为其自动设置一个 action
    if (!hasAction(coordinateActions, 'transpose')) {
      coordinateActions = [...coordinateActions, ['transpose']];
    }
  }

  each(coordinateActions, (action: any[]) => {
    const [act, ...args] = action;
    coordinate[act](...args);
  });

  return coordinate;
}

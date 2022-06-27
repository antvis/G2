import { Coordinate } from '../dependents';
import { Point } from '../interface';
import { getSectorPath } from './graphics';
import { isBetween } from './helper';
import { BBox } from './bbox';

/**
 * @ignore
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
 * @ignore
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
 * @ignore
 * 获取当前点到坐标系圆心的距离
 * @param coordinate 坐标系
 * @param point 当前点
 * @returns distance to center
 */
export function getDistanceToCenter(coordinate: Coordinate, point: Point): number {
  const center = coordinate.getCenter() as Point;
  return Math.sqrt((point.x - center.x) ** 2 + (point.y - center.y) ** 2);
}

/**
 * @ignore
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

/**
 * @ignore
 * 获取点到圆心的连线与水平方向的夹角
 */
export function getAngleByPoint(coordinate: Coordinate, point: Point): number {
  const center = coordinate.getCenter();
  return Math.atan2(point.y - center.y, point.x - center.x);
}

/**
 * @ignore
 * 获取同坐标系范围相同的剪切区域
 * @param coordinate
 * @returns
 */
export function getCoordinateClipCfg(coordinate: Coordinate, margin: number = 0) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();

  if (coordinate.isPolar) {
    const { startAngle, endAngle } = coordinate;
    const center = coordinate.getCenter();
    const radius = coordinate.getRadius();

    return {
      type: 'path',
      startState: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
      endState: (ratio) => {
        const diff = (endAngle - startAngle) * ratio + startAngle;
        const path = getSectorPath(center.x, center.y, radius + margin, startAngle, diff);
        return {
          path,
        };
      },
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, endAngle),
      },
    };
  }

  let endState;
  if (coordinate.isTransposed) {
    endState = {
      height: height + margin * 2,
    };
  } else {
    endState = {
      width: width + margin * 2,
    };
  }

  return {
    type: 'rect',
    startState: {
      x: start.x - margin,
      y: end.y - margin,
      width: coordinate.isTransposed ? width + margin * 2 : 0,
      height: coordinate.isTransposed ? 0 : height + margin * 2,
    },
    endState,
    attrs: {
      x: start.x - margin,
      y: end.y - margin,
      width: width + margin * 2,
      height: height + margin * 2,
    },
  };
}

/**
 * 获取坐标系范围的 BBox
 * @param coordinate
 * @param margin
 */
export function getCoordinateBBox(coordinate: Coordinate, margin = 0) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  const minX = Math.min(start.x, end.x);
  const minY = Math.min(start.y, end.y);

  return BBox.fromRange(minX - margin, minY - margin, minX + width + margin, minY + height + margin);
}

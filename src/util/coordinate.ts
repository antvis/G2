import { Point } from '../types';
import { Coordinate } from '../types/coordinate';

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
 * Gets x dimension length
 * @param coordinate
 * @returns x dimension length
 */
export function getXDimensionLength(coordinate: Coordinate): number {
  if (coordinate.isPolar && !coordinate.isTransposed) {
    // 极坐标系下 width 为弧长
    return (coordinate.endAngle - coordinate.startAngle) * coordinate.getRadius();
  }

  // 直角坐标系
  const start = coordinate.convert({ x: 0, y: 0 });
  const end = coordinate.convert({ x: 1, y: 0 });
  // 坐标系有可能发生 transpose 等变换，所有通过两点之间的距离进行计算
  return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
}

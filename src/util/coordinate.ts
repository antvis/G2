import { Coordinate } from '../dependents';

/**
 * Gets coordinate width
 * @param coordinate
 * @returns coordinate width
 */
export function getCoordinateWidth(coordinate: Coordinate): number {
  if (coordinate.isPolar && !coordinate.isTransposed) {
    // 极坐标系下 width 为弧长
    return (coordinate.endAngle - coordinate.startAngle) * coordinate.radius;
  }

  // 直角坐标系
  const start = coordinate.convertPoint({ x: 0, y: 0 });
  const end = coordinate.convertPoint({ x: 1, y: 0 });
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

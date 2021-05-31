import { Point } from '../types';
import { Coordinate } from '../types/coordinate';
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

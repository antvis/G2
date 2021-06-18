// TOOD: 基于 0.4 的 coordinate 进行封装，然后 G2 用起来稍微方便一些，且能将 coordinate 的能力透出。
import { Coordinate, getCoordinate } from '@antv/coord';

export { Coordinate };
export const Rect = getCoordinate('rect');

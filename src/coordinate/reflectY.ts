import { CoordinateComponent as CC } from '../runtime';
import { ReflectYCoordinate } from '../spec';

export type ReflectYOptions = ReflectYCoordinate;

/**
 * ReflectY
 */
export const ReflectY: CC<ReflectYOptions> = () => [
  ['translate', 0.5, 0.5],
  ['reflect.y'],
  ['translate', -0.5, -0.5],
];

ReflectY.props = {};

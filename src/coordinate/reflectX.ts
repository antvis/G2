import { CoordinateComponent as CC } from '../runtime';
import { ReflectXCoordinate } from '../spec';

export type ReflectXOptions = ReflectXCoordinate;

/**
 * ReflectX
 */
export const ReflectX: CC<ReflectXOptions> = () => [
  ['translate', 0.5, 0.5],
  ['reflect.x'],
  ['translate', -0.5, -0.5],
];

ReflectX.props = {};

import { CoordinateComponent as CC } from '../runtime';
import { ReflectCoordinate } from '../spec';

export type ReflectOptions = ReflectCoordinate;

/**
 * Reflect
 */
export const Reflect: CC<ReflectOptions> = () => [
  ['translate', 0.5, 0.5],
  ['reflect'],
  ['translate', -0.5, -0.5],
];

Reflect.props = {};

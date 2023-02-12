import { CoordinateComponent as CC } from '../runtime';
import { TransposeCoordinate } from '../spec';

export type TransposeOptions = Omit<TransposeCoordinate, 'type'>;

/**
 * Transpose transformation for transposing chart according to center of canvas.
 */
export const Transpose: CC<TransposeOptions> = () => [
  ['transpose'],
  ['translate', 0.5, 0.5],
  ['reflect.x'],
  ['translate', -0.5, -0.5],
];

Transpose.props = { transform: true };

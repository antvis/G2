import { CoordinateComponent as CC } from '../runtime';

export type CartesianOptions = {};

export const Cartesian: CC<CartesianOptions> = () => {
  return [['cartesian']];
};

Cartesian.props = {};

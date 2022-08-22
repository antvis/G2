import { CoordinateComponent as CC } from '../runtime';
import { ThetaCoordinate } from '../spec';
import { Polar } from './polar';
import { Transpose } from './transpose';

export type ThetaOptions = ThetaCoordinate;

/**
 * Theta = Transpose + Polar.
 */
export const Theta: CC<ThetaOptions> = ({
  startAngle = -Math.PI / 2,
  endAngle = (Math.PI * 3) / 2,
  innerRadius = 0,
  outerRadius = 1,
}) => [
  ...Transpose(),
  ...Polar({ startAngle, endAngle, innerRadius, outerRadius }),
];

Theta.props = {};

import { CoordinateComponent as CC } from '../runtime';
import { RadialCoordinate } from '../spec';
import { Polar } from './polar';
import { Reflect } from './reflect';

export type RadialOptions = Omit<RadialCoordinate, 'type'>;

/**
 * Radial
 */
export const Radial: CC<RadialOptions> = ({
  startAngle = -Math.PI / 2,
  endAngle = (Math.PI * 3) / 2,
  innerRadius = 0,
  outerRadius = 1,
}) => [
  ['transpose'],
  ...Reflect(),
  ...Polar({ startAngle, endAngle, innerRadius, outerRadius }),
];

Radial.props = {};

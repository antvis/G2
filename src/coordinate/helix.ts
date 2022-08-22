import { CoordinateComponent as CC } from '../runtime';
import { HelixCoordinate } from '../spec';

export type HelixOptions = HelixCoordinate;

/**
 * Helix
 */
export const Helix: CC<HelixOptions> = ({
  startAngle = 0,
  endAngle = Math.PI * 6,
  innerRadius = 0,
  outerRadius = 1,
}) => [
  ['translate', 0.5, 0.5],
  ['reflect.y'],
  ['translate', -0.5, -0.5],
  ['helix', startAngle, endAngle, innerRadius, outerRadius],
];

Helix.props = {};

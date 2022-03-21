import { CoordinateComponent as CC } from '../runtime';
import { PolarCoordinate } from '../spec';

export type PolarOptions = Omit<PolarCoordinate, 'type'>;

/**
 * Polar transformation for circular charts using center of canvas as origin.
 */
export const Polar: CC<PolarOptions> = ({
  startAngle = 0,
  endAngle = Math.PI * 2,
  innerRadius = 0,
  outerRadius = 1,
}) => [
  ['translate', 0, 0.5],
  ['reflect.y'],
  ['translate', 0, -0.5],
  ['polar', startAngle, endAngle, innerRadius, outerRadius],
];

Polar.props = {};

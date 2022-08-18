import { CoordinateComponent as CC } from '../runtime';
import { ThetaCoordinate } from '../spec';

export type ThetaOptions = ThetaCoordinate;

/**
 * Theta
 */
export const Theta: CC<ThetaOptions> = ({
  startAngle = -Math.PI / 2,
  endAngle = (Math.PI * 3) / 2,
  innerRadius = 0,
  outerRadius = 1,
}) => [
  ['transpose'],
  ['translate', 0.5, 0.5],
  ['reflect.x'],
  ['translate', -0.5, 0],
  ['reflect.y'],
  ['translate', 0, -0.5],
  ['polar', startAngle, endAngle, innerRadius, outerRadius],
];

Theta.props = {};

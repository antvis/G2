import { CoordinateComponent as CC } from '../runtime';
import { RadialCoordinate } from '../spec';
import { Polar } from './polar';
import { Reflect } from './reflect';

export type RadialOptions = Omit<RadialCoordinate, 'type'>;

export const getRadialOptions = (options: RadialOptions = {}) => {
  const defaultOptions = {
    startAngle: -Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
    innerRadius: 0,
    outerRadius: 1,
  };
  return { ...defaultOptions, ...options };
};

/**
 * Radial
 */
export const Radial: CC<RadialOptions> = (options) => {
  const { startAngle, endAngle, innerRadius, outerRadius } =
    getRadialOptions(options);
  return [
    ['transpose'],
    ...Reflect(),
    ...Polar({ startAngle, endAngle, innerRadius, outerRadius }),
  ];
};

Radial.props = {};

import { CoordinateComponent as CC } from '../runtime';
import { RadarCoordinate } from '../spec';
import { Polar } from './polar';
import { Parallel } from './parallel';

export type RadarOptions = RadarCoordinate;

/**
 *  Radar = Parallel + Polar.
 */
export const Radar: CC<RadarOptions> = (options) => {
  const {
    startAngle = -Math.PI / 2,
    endAngle = (Math.PI * 3) / 2,
    innerRadius = 0,
    outerRadius = 1,
  } = options;
  return [
    ...Parallel(),
    ...Polar({ startAngle, endAngle, innerRadius, outerRadius }),
  ];
};

Radar.props = {};

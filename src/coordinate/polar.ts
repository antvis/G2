import { convertAngles } from '../utils/angle';
import { CoordinateComponent as CC } from '../runtime';
import { PolarCoordinate } from '../spec';

export type PolarOptions = Omit<PolarCoordinate, 'type'>;

export const getPolarOptions = (options: PolarOptions = {}) => {
  const defaultOptions = {
    startAngle: -Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
    innerRadius: 0,
    outerRadius: 1,
  };
  const polarOption = { ...defaultOptions, ...options };
  return {
    ...polarOption,
    ...convertAngles(polarOption.startAngle, polarOption.endAngle),
  };
};
/**
 * Polar transformation for circular charts using center of canvas as origin.
 * @todo Adjust size of canvas by startAngle and endAngle to make chart as big as possible.
 */
export const Polar: CC<PolarOptions> = (options) => {
  const { startAngle, endAngle, innerRadius, outerRadius } =
    getPolarOptions(options);
  return [
    ['translate', 0, 0.5],
    ['reflect.y'],
    ['translate', 0, -0.5],
    ['polar', startAngle, endAngle, innerRadius, outerRadius],
  ];
};

Polar.props = {};

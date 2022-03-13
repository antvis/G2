import { CoordinateComponent as CC } from '../runtime';

export type PolarOptions = {
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export const Polar: CC<PolarOptions> = ({
  startAngle = 0,
  endAngle = Math.PI * 2,
  innerRadius = 0,
  outerRadius = 1,
}) => {
  return [
    ['translate', 0, 0.5],
    ['reflect.y'],
    ['translate', 0, -0.5],
    ['polar', startAngle, endAngle, innerRadius, outerRadius],
  ];
};

Polar.props = {};

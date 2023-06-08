import { curveLinear, curveLinearClosed } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type LineOptions = Record<string, any>;

export const Line: SC<LineOptions> = (options, context) => {
  const { coordinate } = context;
  return (...params) => {
    const curve = isPolar(coordinate) ? curveLinearClosed : curveLinear;
    return Curve({ curve, ...options }, context)(...params);
  };
};

Line.props = {
  ...Curve.props,
  defaultMarker: 'line',
};

import { curveLinear, curveLinearClosed } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type LineOptions = Record<string, any>;

export const Line: SC<LineOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    const curve = isPolar(coordinate) ? curveLinearClosed : curveLinear;
    return Curve({ curve, ...options })(P, value, coordinate, theme);
  };
};

Line.props = {
  ...Curve.props,
  defaultMarker: 'line',
};

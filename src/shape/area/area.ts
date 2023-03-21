import { curveLinearClosed, curveLinear } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type AreaOptions = Record<string, any>;

export const Area: SC<AreaOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    const curve = isPolar(coordinate) ? curveLinearClosed : curveLinear;
    return Curve({ curve: curve, ...options })(P, value, coordinate, theme);
  };
};

Area.props = {
  ...Curve.props,
  defaultMarker: 'point',
};

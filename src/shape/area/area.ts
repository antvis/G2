import { curveLinearClosed, curveLinear } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type AreaOptions = Record<string, any>;

export const Area: SC<AreaOptions> = (options, context) => {
  const { coordinate } = context;
  return (...params) => {
    const curve = isPolar(coordinate) ? curveLinearClosed : curveLinear;
    return Curve({ curve: curve, ...options }, context)(...params);
  };
};

Area.props = {
  ...Curve.props,
  defaultMarker: 'square',
};

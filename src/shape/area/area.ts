import { curveLinearClosed, curveLinear } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { CurveArea } from './curveArea';

export type AreaOptions = Record<string, any>;

export const Area: SC<AreaOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    const curve = isPolar(coordinate) ? curveLinearClosed : curveLinear;
    return CurveArea({ curve: curve, ...options })(P, value, coordinate, theme);
  };
};

Area.props = {
  ...CurveArea.props,
};

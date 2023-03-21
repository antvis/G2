import { curveCatmullRom, curveCatmullRomClosed } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type SmoothOptions = {
  alpha?: number;
};

export const Smooth: SC<SmoothOptions> = (options) => {
  const { alpha = 0.5, ...rest } = options;
  return (P, value, coordinate, theme) => {
    const curve = isPolar(coordinate) ? curveCatmullRomClosed : curveCatmullRom;
    return Curve({ curve: curve.alpha(alpha), ...rest })(
      P,
      value,
      coordinate,
      theme,
    );
  };
};

Smooth.props = {
  ...Curve.props,
  defaultMarker: 'smooth',
};

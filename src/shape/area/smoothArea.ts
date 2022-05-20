import { curveCatmullRomClosed, curveCatmullRom } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { CurveArea } from './curveArea';

export type SmoothAreaOptions = {
  alpha?: number;
};

export const SmoothArea: SC<SmoothAreaOptions> = (options) => {
  const { alpha = 0.5, ...rest } = options;
  return (P, value, coordinate, theme) => {
    const curve = isPolar(coordinate) ? curveCatmullRomClosed : curveCatmullRom;
    return CurveArea({ curve: curve.alpha(alpha), ...rest })(
      P,
      value,
      coordinate,
      theme,
    );
  };
};

SmoothArea.props = {
  ...CurveArea.props,
};

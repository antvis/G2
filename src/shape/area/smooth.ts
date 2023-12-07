import {
  curveCatmullRomClosed,
  curveMonotoneX,
  curveMonotoneY,
} from 'd3-shape';
import { isPolar, isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type SmoothOptions = Record<string, any>;

export const Smooth: SC<SmoothOptions> = (options, context) => {
  const { ...rest } = options;
  const { coordinate } = context;
  return (...params) => {
    const curve = isPolar(coordinate)
      ? curveCatmullRomClosed
      : isTranspose(coordinate)
      ? curveMonotoneY
      : curveMonotoneX;
    return Curve({ curve, ...rest }, context)(...params);
  };
};

Smooth.props = {
  ...Curve.props,
  defaultMarker: 'smooth',
};

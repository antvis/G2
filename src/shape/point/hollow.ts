import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowPointOptions = Record<string, any>;

/**
 * ○
 */
export const HollowPoint: SC<HollowPointOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'point', ...options },
    context,
  );
};

HollowPoint.props = {
  defaultMarker: 'hollowPoint',
  ...Color.props,
};

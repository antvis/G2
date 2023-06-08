import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type CrossOptions = Record<string, any>;

/**
 * ✕
 */
export const Cross: SC<CrossOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'cross', ...options },
    context,
  );
};

Cross.props = {
  defaultMarker: 'cross',
  ...Color.props,
};

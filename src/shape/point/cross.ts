import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type CrossOptions = Record<string, any>;

/**
 * ✕
 */
export const Cross: SC<CrossOptions> = (options) => {
  return Color({ colorAttribute: 'stroke', symbol: 'cross', ...options });
};

Cross.props = {
  defaultMarker: 'cross',
  ...Color.props,
};

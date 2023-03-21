import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type PlusOptions = Record<string, any>;

/**
 * +
 */
export const Plus: SC<PlusOptions> = (options) => {
  return Color({ colorAttribute: 'stroke', symbol: 'plus', ...options });
};

Plus.props = {
  defaultMarker: 'plus',
  ...Color.props,
};

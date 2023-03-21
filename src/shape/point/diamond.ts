import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type DiamondOptions = Record<string, any>;

/**
 * ◆
 */
export const Diamond: SC<DiamondOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'diamond', ...options });
};

Diamond.props = {
  defaultMarker: 'diamond',
  ...Color.props,
};

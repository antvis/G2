import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type DiamondOptions = Record<string, any>;

/**
 * ◆
 */
export const Diamond: SC<DiamondOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'diamond', ...options });
};

Diamond.props = {
  ...ColorPoint.props,
};

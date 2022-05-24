import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type PlusOptions = Record<string, any>;

/**
 * +
 */
export const Plus: SC<PlusOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'plus', ...options });
};

Plus.props = {
  ...ColorPoint.props,
};

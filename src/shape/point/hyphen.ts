import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HyphenOptions = Record<string, any>;

/**
 * -
 */
export const Hyphen: SC<HyphenOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'hyphen', ...options });
};

Hyphen.props = {
  ...ColorPoint.props,
};

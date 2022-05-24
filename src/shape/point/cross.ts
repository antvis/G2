import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type CrossOptions = Record<string, any>;

/**
 * ✕
 */
export const Cross: SC<CrossOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'cross', ...options });
};

Cross.props = {
  ...ColorPoint.props,
};

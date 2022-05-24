import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type TickOptions = Record<string, any>;

/**
 * 工
 */
export const Tick: SC<TickOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'tick', ...options });
};

Tick.props = {
  ...ColorPoint.props,
};

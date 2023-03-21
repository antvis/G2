import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type TickOptions = Record<string, any>;

/**
 * 工
 */
export const Tick: SC<TickOptions> = (options) => {
  return Color({ colorAttribute: 'stroke', symbol: 'tick', ...options });
};

Tick.props = {
  defaultMarker: 'tick',
  ...Color.props,
};

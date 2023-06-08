import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type TickOptions = Record<string, any>;

/**
 * 工
 */
export const Tick: SC<TickOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'tick', ...options },
    context,
  );
};

Tick.props = {
  defaultMarker: 'tick',
  ...Color.props,
};

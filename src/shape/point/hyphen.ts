import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HyphenOptions = Record<string, any>;

/**
 * -
 */
export const Hyphen: SC<HyphenOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'hyphen', ...options },
    context,
  );
};

Hyphen.props = {
  defaultMarker: 'hyphen',
  ...Color.props,
};

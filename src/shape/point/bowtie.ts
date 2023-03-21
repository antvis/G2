import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type BowtieOptions = Record<string, any>;

/**
 * ▶◀
 */
export const Bowtie: SC<BowtieOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'bowtie', ...options });
};

Bowtie.props = {
  defaultMarker: 'bowtie',
  ...Color.props,
};

import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type BowtieOptions = Record<string, any>;

/**
 * ▶◀
 */
export const Bowtie: SC<BowtieOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'bowtie', ...options });
};

Bowtie.props = {
  ...ColorPoint.props,
};

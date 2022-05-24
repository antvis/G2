import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowBowtieOptions = Record<string, any>;

/**
 * ▷◁
 */
export const HollowBowtie: SC<HollowBowtieOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'bowtie', ...options });
};

HollowBowtie.props = {
  ...ColorPoint.props,
};

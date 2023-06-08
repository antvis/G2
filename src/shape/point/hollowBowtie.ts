import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowBowtieOptions = Record<string, any>;

/**
 * ▷◁
 */
export const HollowBowtie: SC<HollowBowtieOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'bowtie', ...options },
    context,
  );
};

HollowBowtie.props = {
  defaultMarker: 'hollowBowtie',
  ...Color.props,
};

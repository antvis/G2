import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { ColorRect } from './colorRect';
import { Funnel } from './funnel';

export type PyramidOptions = Record<string, any>;

/**
 * Render pyramid in different coordinate and using color channel for stroke and fill attribute.
 */
export const Pyramid: SC<PyramidOptions> = (options) => {
  return Funnel({ isPyramid: true, ...options });
};

Pyramid.props = {
  defaultEnterAnimation: 'fadeIn',
};

import { ShapeComponent as SC } from '../../runtime';
import { Edge } from '../../shape/edge/edge';

export type LinkOptions = Record<string, any>;

// Draw a line from `start` to `end`.
export const Link: SC<LinkOptions> = (...args) => {
  return Edge(...args);
};

Link.props = {
  defaultEnterAnimation: 'fadeIn',
};

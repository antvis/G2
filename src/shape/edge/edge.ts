import { ShapeComponent as SC } from '../../runtime';
import { Link } from '../../shape/link/link';

export type EdgeOptions = Record<string, any>;

/**
 * Draw a line from `start` to `end`.
 */
export const Edge: SC<EdgeOptions> = (...args) => {
  return Link(...args);
};

Edge.props = {
  defaultEnterAnimation: 'fadeIn',
};

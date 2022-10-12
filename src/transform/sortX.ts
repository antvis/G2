import { TransformComponent as TC } from '../runtime';
import { SortXTransform } from '../spec';
import { Sort } from './sort';

export type SortXOptions = Omit<SortXTransform, 'type'>;

/**
 * Sort domain of x scale of mark groups by groups.
 */
export const SortX: TC<SortXOptions> = (options = {}) => {
  return Sort({ ...options, channel: 'x' });
};

SortX.props = {};

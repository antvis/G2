import { TransformComponent as TC } from '../runtime';
import { SortColorTransform } from '../spec';
import { Sort } from './sort';

export type SortColorOptions = Omit<SortColorTransform, 'type'>;

/**
 * Sort domain of x scale of mark groups by groups.
 */
export const SortColor: TC<SortColorOptions> = (options = {}) => {
  return Sort({ ...options, channel: 'color' });
};

SortColor.props = {};

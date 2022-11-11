import { TransformComponent as TC } from '../runtime';
import { GroupYTransform } from '../spec';
import { Group } from './group';

export type GroupYOptions = Omit<GroupYTransform, 'type'>;

/**
 * The GroupY transform group data by x channel, and aggregate.
 */
export const GroupY: TC<GroupYOptions> = (options = {}) => {
  return Group({ ...options, channels: ['y', 'color', 'series'] });
};

GroupY.props = {};

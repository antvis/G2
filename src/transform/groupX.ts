import { TransformComponent as TC } from '../runtime';
import { GroupXTransform } from '../spec';
import { Group } from './group';

export type GroupXOptions = Omit<GroupXTransform, 'type'>;

/**
 * The GroupX transform group data by x channel, and aggregate.
 */
export const GroupX: TC<GroupXOptions> = (options = {}) => {
  return Group({ ...options, channels: ['x', 'color', 'series'] });
};

GroupX.props = {};

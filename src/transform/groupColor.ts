import { TransformComponent as TC } from '../runtime';
import { GroupColorTransform } from '../spec';
import { Group } from './group';

export type GroupColorOptions = Omit<GroupColorTransform, 'type'>;

/**
 * The GroupColor transform group data by x channel, and aggregate.
 */
export const GroupColor: TC<GroupColorOptions> = (options = {}) => {
  return Group({ ...options, channels: ['color'] });
};

GroupColor.props = {};

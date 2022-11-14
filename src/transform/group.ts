import { TransformComponent as TC, G2Mark } from '../runtime';
import { GroupTransform } from '../spec';
import { createGroups } from './utils/order';
import { GroupN } from './groupN';

export type GroupOptions = Omit<
  GroupTransform & {
    channels?: string | string[];
    groupBy?: (
      I: number[],
      mark: G2Mark,
      options?: Record<string, any>,
    ) => number[][];
  },
  'type'
>;

/**
 * The Group transform group data by x and y channels, and aggregate.
 */
export const Group: TC<GroupOptions> = (options = {}) => {
  const { channels = ['x', 'y'], ...rest } = options;
  const groupBy = (I, mark) => createGroups(channels, I, mark);
  return GroupN({ ...rest, groupBy });
};

Group.props = {};

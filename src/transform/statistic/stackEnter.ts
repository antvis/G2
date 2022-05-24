import { group, max } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { StackEnterTransform } from '../../spec';
import { merge, column } from '../utils/helper';

export type StackEnterOptions = Omit<StackEnterTransform, 'type'>;

/**
 * Group marks by channels into groups and stacking their enterDelay
 * to make marks show up groups by groups.
 * It will update enterDelay channel for each mark by its enterDuration and group.
 * @todo Sort among groups(e.g. reverse).
 * @todo Stack enter in groups rather than between groups?
 * @todo Auto inter this statistic for scaleInY animation in stacked interval?
 * @todo All the groups shared the enterDuration?
 */
export const StackEnter: TC<StackEnterOptions> = (options) => {
  const { by = ['x'] } = options;
  return merge(({ encode, I, data, columnOf }) => {
    const { enterDuration, enterDelay } = encode;
    if (enterDuration === undefined) return {};

    // Extract group information by each specified channel,
    // and skip if all values of channels are empty.
    const groupEntries = by.map((k) => [k, columnOf(data, encode[k])]);
    if (groupEntries.length === 0) return {};

    // Nest group index and flatten them in right order among timeline.
    // [[1, 2, 3, 4, 5, 6]] ->
    // [[1, 2, 3], [4, 5, 6]] ->
    // [[1], [2], [3], [4], [5], [6]]
    let groups = [I];
    for (const [, V] of groupEntries) {
      const newGroups = [];
      for (const I of groups) {
        const G = Array.from(group(I, (i) => V[i]).values());
        // @todo sort by x.
        newGroups.push(...G);
      }
      groups = newGroups;
    }

    // Stack delay for each group.
    const ED = columnOf(data, enterDuration);
    const EDL = columnOf(data, enterDelay) || new Array(I.length).fill(0);
    const newEnterDelay = new Array(I.length);
    for (let i = 0, pd = 0; i < groups.length; i++) {
      const I = groups[i];
      const maxDuration = max(I, (i) => +ED[i]);
      for (const j of I) newEnterDelay[j] = EDL[j] + pd;
      pd += maxDuration;
    }

    return {
      encode: {
        enterDuration: column(ED),
        enterDelay: column(newEnterDelay),
      },
    };
  });
};

StackEnter.props = {
  type: 'statistic',
};

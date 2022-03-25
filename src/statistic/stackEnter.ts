import { group, max } from 'd3-array';
import { StatisticComponent as SC } from '../runtime';
import { StackDurationStatistic } from '../spec';
import { firstOf, isFlatArray } from '../utils/array';

export type StackEnterOptions = Omit<StackDurationStatistic, 'type'>;

/**
 * Group marks by channels into groups and stacking their enterDelay
 * to make marks show up groups by groups.
 * It will update enterDelay channel for each mark by its enterDuration and group.
 * @todo Sort among groups(e.g. reverse).
 * @todo Stack enter in groups rather than between groups?
 * @todo Auto inter this statistic for scaleInY animation in stacked interval?
 * @todo All the groups shared the enterDuration?
 */
export const StackEnter: SC<StackEnterOptions> = (options) => {
  const { by = ['x'] } = options;
  return ({ index, value }) => {
    // Skip value with empty enterDuration.
    const { enterDuration: ED } = value;
    if (ED === undefined) return { index, value };

    // Extract group information by each specified channel,
    // and skip if all values of channels are empty.
    const K = by
      .filter((k) => value[k] !== undefined)
      .map((k) => {
        const V = value[k];
        // Position channels are not flay array(e.g. x, y).
        return isFlatArray(V) ? V : V.map(firstOf);
      });
    if (K.length === 0) return { index, value };

    // Nest group index and flatten them in right order among timeline.
    // [[1, 2, 3, 4, 5, 6]] ->
    // [[1, 2, 3], [4, 5, 6]] ->
    // [[1], [2], [3], [4], [5], [6]]
    let groups = [index];
    for (const V of K) {
      const newGroups = [];
      for (const I of groups) {
        const G = Array.from(group(I, (i) => V[i]).values());
        // @todo sort by x.
        newGroups.push(...G);
      }
      groups = newGroups;
    }

    // Stack delay for each group.
    const newEnterDelay = new Array(index.length);
    const { enterDelay: EDL = new Array(index.length).fill(0) } = value;
    for (let i = 0, pd = 0; i < groups.length; i++) {
      const I = groups[i];
      const maxDuration = max(I, (i) => +ED[i]);
      for (const j of I) newEnterDelay[j] = EDL[j] + pd;
      pd += maxDuration;
    }

    return {
      index,
      value: {
        ...value,
        enterDelay: newEnterDelay,
      },
    };
  };
};

StackEnter.props = {};

import { InferComponent as IC, InferValue } from '../runtime';
import { composeTransform } from './utils';

export type MaybeSplitPositionOptions = Record<string, never>;

const inferStatistic: InferValue['transform'] = (indexedValue, statistic) => {
  if (statistic.find(({ type }) => type === 'splitPosition')) {
    return statistic;
  }
  const { value } = indexedValue;
  const { position } = value;
  if (position === undefined) return statistic;
  return [{ type: 'splitPosition' }, ...statistic];
};

/**
 * Split position channel into multiple position channels.
 * @example position -> position[0], position[1], position[2]...
 */
export const MaybeSplitPosition: IC<MaybeSplitPositionOptions> = () => {
  return ({ encode, transform }) => ({
    encode,
    transform: composeTransform(transform, inferStatistic),
  });
};

MaybeSplitPosition.props = {};

import { group } from 'd3-array';
import { InferComponent as IC, InferValue } from '../runtime';
import { firstOf } from '../utils/array';
import { composeTransform } from './utils';

export type MaybeStackYOptions = Record<string, never>;

const inferStatistic: InferValue['transform'] = (indexedValue, statistic) => {
  // Avoid duplicate stackY.
  // In most of case only one of stackY and dodgeX is needed.
  // So pass statistic with stackY and dodgeX.
  if (statistic.find(({ type }) => type === 'stackY' || type === 'dodgeX')) {
    return statistic;
  }

  // StackY need both x and y channel values, so pass value with empty x or y channel.
  const { index, value } = indexedValue;
  const { x: X, y: Y } = value;
  if (X === undefined || Y === undefined) return statistic;

  // Group mark index by channel x.
  const X1 = X.map(firstOf);
  const groups = Array.from(group(index, (i) => X1[i]).values());

  // Every group having sing value means on overlapping, so pass.
  if (groups.every((d) => d.length <= 1)) return statistic;
  return [{ type: 'stackY' }, ...statistic];
};

/**
 * Add stack statistic for marks grouped by x channel.
 */
export const MaybeStackY: IC<MaybeStackYOptions> = () => {
  return ({ encode, transform }) => ({
    encode,
    transform: composeTransform(transform, inferStatistic),
  });
};

MaybeStackY.props = {};

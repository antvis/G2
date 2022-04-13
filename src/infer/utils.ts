import { InferValue } from 'runtime';

/**
 * Returns a zero constant encoding.
 */
export const zero = () => ({ type: 'constant', value: 0 });

export const composeTransform = (
  a: InferValue['transform'],
  b: InferValue['transform'],
): InferValue['transform'] => {
  return (indexedValue, statistic) => {
    const inferredStatistic = a?.(indexedValue, statistic) || statistic;
    return b?.(indexedValue, inferredStatistic) || inferredStatistic;
  };
};

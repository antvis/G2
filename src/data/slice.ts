import { DataComponent as DC } from '../runtime';
import { SliceTransform } from '../spec';

export type SliceOptions = Omit<SliceTransform, 'type'>;

/**
 * Slice data between `start` ~ `end`.
 * Same with https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */
export const Slice: DC<SliceOptions> = (options) => {
  const { start, end } = options;
  return (data) => data.slice(start, end);
};

Slice.props = {};

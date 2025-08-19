import { get, set } from '@antv/util';
import { G2ViewTree } from '../types/options';

/**
 * Convert a percentage string to a ratio.
 */
export const percentToRatio = (gap: string) => {
  if (!gap || typeof gap !== 'string') {
    return gap;
  }
  const value = gap.endsWith('%')
    ? parseFloat(gap.slice(0, -1)) / 100
    : parseFloat(gap);
  if (isNaN(value) || value < 0 || value > 1) {
    throw new Error(`Invalid gap value: ${gap}. It should be between 0 and 1.`);
  }
  return value;
};

export function axisBreaks<T extends G2ViewTree = G2ViewTree>(options: T): T {
  const { axis } = options;
  const breaks = get(axis, 'y.breaks');

  if (breaks) {
    set(
      options,
      'scale.y.breaks',
      breaks.map((item) => ({
        key: `break-${item.start}-${item.end}`,
        ...item,
        gap: percentToRatio(item.gap),
      })),
    );
  }
  return options;
}

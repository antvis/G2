import { get, set } from '@antv/util';
import { G2ViewTree } from '../types/options';

export function breaks<T extends G2ViewTree = G2ViewTree>(options: T): T {
  const { axis } = options;
  const breaks = get(axis, 'y.breaks');

  if (breaks) {
    set(
      options,
      'scale.y.breaks',
      breaks.map((item) => ({
        key: Math.random().toString(36).substring(2, 15),
        ...item,
      })),
    );
  }
  return options;
}

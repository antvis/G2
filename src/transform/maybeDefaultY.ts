import { deepMix } from '@antv/util';
import { Primitive, TransformComponent as TC } from '../runtime';
import { column, isObject } from './utils/helper';

export type MaybeDefaultYOptions = Record<string, never>;

/**
 * Add a default encode for rangeY
 * when data is just an array
 */
export const MaybeDefaultY: TC<MaybeDefaultYOptions> = () => {
  return (I, mark) => {
    const { data } = mark;
    if (
      Array.isArray(data) &&
      (data.every(Array.isArray) || !data.some(isObject))
    ) {
      const extractY = (data, index: number) =>
        Array.isArray(data[0])
          ? data.map((item) => item[index])
          : [data[index]];
      return [
        I,
        deepMix({}, mark, {
          encode: {
            y: column(extractY(data, 0)),
            y1: column(extractY(data, 1)),
          },
        }),
      ];
    }
    return [I, mark];
  };
};

MaybeDefaultY.props = {};

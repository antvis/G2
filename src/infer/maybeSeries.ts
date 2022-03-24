import { InferComponent as IC } from '../runtime';

export type MaybeSeriesOptions = Record<string, never>;

/**
 * Wrap flat x and y channel into nested array.
 * @example {x: [1, 2, 3]} -> {x: [[1], [2], [3]]}
 */
export const MaybeSeries: IC<MaybeSeriesOptions> = () => {
  return (encodings) => {
    const { color, series, ...rest } = encodings;
    if (series) return encodings;
    if (typeof color === 'object' && color.type === 'field') {
      return { color, series: color, ...rest };
    }
    return encodings;
  };
};

MaybeSeries.props = {};

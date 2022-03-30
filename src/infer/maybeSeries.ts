import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeSeriesOptions = Record<string, never>;

function inferEncode(encode: InferredEncode) {
  const { color, series, ...rest } = encode;
  if (series) return encode;
  if (color !== undefined) return { color, series: color, ...rest };
  return encode;
}

/**
 * Produce series channel by color channel.
 * It useful for line and area geometries to draw multiple series and areas.
 * @example {x: [1, 2, 3]} -> {x: [[1], [2], [3]]}
 */
export const MaybeSeries: IC<MaybeSeriesOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeSeries.props = {};

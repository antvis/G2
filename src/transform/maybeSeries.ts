import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeSeriesOptions = Record<string, never>;

/**
 * Assume color channel is series channel.
 */
export const MaybeSeries: TC<MaybeSeriesOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { series, color } = encode;
    if (series !== undefined || color === undefined) return [I, mark];
    const [C, fc] = columnOf(encode, 'color');
    return [I, deepMix({}, mark, { encode: { series: column(C, fc) } })];
  };
};

MaybeSeries.props = {};

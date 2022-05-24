import { TransformComponent as TC } from '../../runtime';
import { merge, column } from '../utils/helper';

export type MaybeSeriesOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeSeries: TC<MaybeSeriesOptions> = () => {
  return merge(({ encode, data, columnOf }) => {
    const { series, color } = encode;
    if (series !== undefined) return {};
    const C = columnOf(data, color);
    return {
      encode: {
        color: column(C),
        series: column(C),
      },
    };
  });
};

MaybeSeries.props = {
  category: 'inference',
};

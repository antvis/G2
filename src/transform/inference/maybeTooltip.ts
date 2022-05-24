import { TransformComponent as TC } from '../../runtime';
import { merge, column } from '../utils/helper';

export type MaybeTooltipOptions = {
  channel: string;
};

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeTooltip: TC<MaybeTooltipOptions> = (options) => {
  const { channel } = options;
  return merge(({ encode, data, columnOf }) => {
    const { tooltip } = encode;
    if (tooltip !== undefined) return {};
    const entries = Object.entries(encode)
      .filter(([key]) => key.startsWith(channel))
      .flatMap(([key, value]) => {
        const match = new RegExp(`${channel}(\\d*)`).exec(key);
        const index = match[1];
        const V = columnOf(data, value);
        const E = [[key, column(V)]];
        if (V && V.field !== null) {
          E.push([`tooltip${index}`, column(V)]);
        }
        return E;
      });
    return { encode: Object.fromEntries(entries) };
  });
};

MaybeTooltip.props = {
  type: 'inference',
};

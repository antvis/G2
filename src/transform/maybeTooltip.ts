import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeTooltipOptions = {
  channel: string;
};

/**
 * Infer tooltip channel from specified channel.
 */
export const MaybeTooltip: TC<MaybeTooltipOptions> = (options) => {
  const { channel } = options;
  return (I, mark) => {
    const { encode } = mark;
    const { tooltip } = encode;
    if (tooltip !== undefined) return [I, mark];
    const entries = Object.entries(encode)
      .filter(([key]) => key.startsWith(channel))
      .flatMap(([key]) => {
        const match = new RegExp(`${channel}(\\d*)`).exec(key);
        const index = match[1];
        const [V, fv] = columnOf(encode, key);
        const E = [[key, column(V)]];
        if (V && fv !== null) {
          E.push([`tooltip${index}`, column(V, fv)]);
        }
        return E;
      });
    return [I, deepMix({}, mark, { encode: Object.fromEntries(entries) })];
  };
};

MaybeTooltip.props = {};

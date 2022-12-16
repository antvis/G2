import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeTooltipOptions = {
  channel: string | string[];
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
    const channels = Array.isArray(channel) ? channel : [channel];
    let index = 0;
    const entries = channels.flatMap((channel) =>
      Object.entries(encode)
        .filter(([key]) => key.startsWith(channel))
        .flatMap(([key]) => {
          const [V, fv] = columnOf(encode, key);
          const E = [[key, column(V)]];
          // Only show channel with field.
          if (V && fv !== null) {
            const T = V.map((v) => ({ value: v, field: fv }));
            //@ts-ignore
            E.push([`tooltip${index === 0 ? '' : index}`, column(T, fv)]);
            index++;
          }
          return E;
        }),
    );
    return [I, deepMix({}, mark, { encode: Object.fromEntries(entries) })];
  };
};

MaybeTooltip.props = {};

import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';

export type MaybeTooltipOptions = {
  channel: string | string[];
};

/**
 * Infer tooltip channel from specified channel.
 */
export const MaybeTooltip: TC<MaybeTooltipOptions> = (options) => {
  const { channel } = options;
  return (I, mark) => {
    const { encode, tooltip } = mark;
    if (tooltip === null) return [I, mark];
    const { items = [] } = tooltip;
    if (items.length > 0) return [I, mark];
    const channels = Array.isArray(channel) ? channel : [channel];
    const newItems = channels.flatMap((channel) =>
      Object.keys(encode)
        .filter((key) => key.startsWith(channel))
        .map((key) => {
          const { field, value, inferred = false } = encode[key];
          // Do not show inferred column.
          if (inferred) return null;
          if (field) return { field };
          if (value) return { channel: key };
          return null;
        })
        .filter((d) => d !== null),
    );
    return [I, deepMix({}, mark, { tooltip: { items: newItems } })];
  };
};

MaybeTooltip.props = {};

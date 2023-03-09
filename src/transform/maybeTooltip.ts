import { deepMix } from '@antv/util';
import { isUnset } from '../utils/helper';
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
    if (isUnset(tooltip)) return [I, mark];
    const { items = [] } = tooltip;
    if (!items || items.length > 0) return [I, mark];
    const channels = Array.isArray(channel) ? channel : [channel];
    const newItems = channels.flatMap((channel) =>
      Object.keys(encode)
        .filter((key) => key.startsWith(channel))
        .map((key) => {
          const { field, value, inferred = false, aggregate } = encode[key];
          if (inferred) return null;
          // Do not show inferred column.
          if (aggregate && value) return { channel: key };
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

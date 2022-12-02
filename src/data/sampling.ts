import { group, max, mean, median, min, sum } from 'd3-array';
import { get, isArray, isFunction } from '@antv/util';
import { DataComponent as DC, Primitive } from '../runtime';
import { SamplingTransform } from '../spec';

export type SamplingOptions = Omit<SamplingTransform, 'type'>;

function sampling(
  frames: any[],
  field: string,
  strategy: SamplingOptions['strategy'],
): number {
  const frame = frames.map((f) => f[field]);
  if (isFunction(strategy)) return strategy(frame);
  if (strategy === 'lttb') return frame[0]; // todo lttb
  if (strategy === 'mean') return mean(frame);
  if (strategy === 'median') return median(frame);
  if (strategy === 'max') return max(frame);
  if (strategy === 'min') return min(frame);
  if (strategy === 'sum') return sum(frame);
  if (strategy === 'first') return frame[0];
  if (strategy === 'last') return frame[frame.length - 1];
  return mean(frame);
}

/**
 * Split the array into frame with each frameSize.
 */
function getFrames(I: Primitive[], frameSize: number) {
  const size = I.length;
  const frames = [];
  let i = 0;
  while (i < size) {
    frames.push(I.slice(i, (i += frameSize)));
  }
  return frames;
}

/**
 * The sampling transform groups marks with specified groupBy fields, and
 * sampling data for each group when data.length >= threshold(default = 2000).
 */
export const Sampling: DC<SamplingOptions> = (options) => {
  const {
    groupBy = [],
    fields,
    strategy = 'mean',
    thresholds = 2000,
  } = options;
  const groupFields = isArray(groupBy) ? groupBy : [groupBy];
  const samplingFields = isArray(fields) ? fields : [fields];

  return (data) => {
    const fields = Object.keys(get(data, [0]));
    const key = (d) => groupFields.map((f) => d[f]).join('-');
    const groups = Array.from(group(data, key));
    const length = max(groups, (g) => g[1].length);
    // Skip sampling.
    if (length <= thresholds) return data;

    return groups.reduce((arr, [_, g]) => {
      // Keep more data as possible.
      // After sampled, the length of each group.
      const frameSize = Math.max(1, Math.floor(g.length / thresholds));
      const frames = getFrames(g, frameSize);

      const sampled = frames.map((frame) => {
        return fields.reduce((d, f) => {
          if (samplingFields.includes(f)) {
            d[f] = sampling(frame, f, strategy);
          } else {
            d[f] = sampling(frame, f, 'first');
          }
          return d;
        }, {});
      });

      return arr.concat(sampled);
    }, []);
  };
};

Sampling.props = {};

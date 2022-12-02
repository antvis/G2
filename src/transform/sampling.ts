import { max } from 'd3-array';
import { TransformComponent as TC, G2Mark, Primitive } from '../runtime';
import { SamplingTransform } from '../spec';
import { createGroups } from './utils/order';
import { GroupN } from './groupN';

export type SamplingOptions = Omit<SamplingTransform, 'type'>;

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
export const Sampling: TC<SamplingOptions> = (options = {}) => {
  const { groupBy: by, thresholds = 2000, ...rest } = options;

  const groupBy = (I, mark) => {
    const groups = createGroups(by, I, mark);
    // Skip
    if (groups.every((g) => g.length <= thresholds)) return null;

    return groups.flatMap((g) => {
      // Keep more data as possible.
      // After sampled, the length of each group.
      const frameSize = Math.max(1, Math.floor(g.length / thresholds));
      const frames = getFrames(g, frameSize);
      return frames;
    });
  };
  return GroupN({ ...rest, groupBy });
};

Sampling.props = {};

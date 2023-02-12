// @ts-ignore medianIndex exist in d3-array@3.2.0, but @types/d3-array Expired.
import { maxIndex, minIndex, medianIndex } from 'd3-array';
import { TransformComponent as TC, Primitive } from '../runtime';
import { SampleTransform, SampleFunction } from '../spec';
import { createGroups } from './utils/order';
import { columnOf } from './utils/helper';
import { lttb } from './utils/lttb';

export type SampleOptions = Omit<SampleTransform, 'type'>;

function normalizeSample(
  strategy: SampleTransform['strategy'],
): SampleFunction {
  if (typeof strategy === 'function') return strategy;
  if (strategy === 'lttb') return lttb;

  const strategies = {
    first: (f: number[]) => [f[0]],
    last: (f: number[]) => [f[f.length - 1]],
    min: (f: number[], X: number[], Y: number[]) => [
      f[minIndex(f, (i) => Y[i])],
    ],
    max: (f: number[], X: number[], Y: number[]) => [
      f[maxIndex(f, (i) => Y[i])],
    ],
    median: (f: number[], X: number[], Y: number[]) => [
      f[medianIndex(f, (i) => Y[i])],
    ],
  };
  const sampleFunction = strategies[strategy] || strategies.median;
  return (I: number[], X: number[], Y: number[], thresholds: number) => {
    // Sepreate group to frames, then sample each frame.
    // Keep more data as possible.
    const frameSize = Math.max(1, Math.floor(I.length / thresholds));
    const frames = getFrames(I, frameSize);
    return frames.flatMap((frame) => sampleFunction(frame, X, Y));
  };
}

/**
 * Split the array into frame with each frameSize.
 */
function getFrames(I: Primitive[], frameSize: number): number[][] {
  const size = I.length;
  const frames = [];
  let i = 0;
  while (i < size) {
    frames.push(I.slice(i, (i += frameSize)));
  }
  return frames;
}

/**
 * The sample transform groups marks with specified groupBy fields, and
 * sample data for each group when data.length >= threshold(default = 2000).
 */
export const Sample: TC<SampleOptions> = (options = {}) => {
  const {
    strategy = 'median',
    thresholds = 2000,
    groupBy = ['series', 'color'],
  } = options;
  const sampleFunction = normalizeSample(strategy);

  return (I, mark) => {
    const { encode } = mark;
    const groups = createGroups(groupBy, I, mark);
    const [X] = columnOf(encode, 'x');
    const [Y] = columnOf(encode, 'y');

    return [
      groups.flatMap((g) =>
        sampleFunction(g, X as number[], Y as number[], thresholds),
      ),
      mark,
    ];
  };
};

Sample.props = {};

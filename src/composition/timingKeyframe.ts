import { deepMix } from '@antv/util';
import { CompositionComponent as CC, G2ViewTree } from '../runtime';
import { TimingKeyframeComposition } from '../spec';

export type TimingKeyframeOptions = Omit<TimingKeyframeComposition, 'type'>;

function range(
  direction: TimingKeyframeComposition['direction'],
  iterationCount: number,
  keyframeCount: number,
): [number, number] {
  const start = 0;
  const end = keyframeCount;
  const normal: [number, number] = [start, end];
  const reverse: [number, number] = [-end + 1, -start + 1];
  if (direction === 'normal') return normal;
  if (direction === 'reverse') return reverse;
  if (direction === 'alternate') {
    return iterationCount % 2 === 0 ? normal : reverse;
  }
  if (direction === 'reverse-alternate') {
    return iterationCount % 2 === 0 ? reverse : normal;
  }
}

/**
 * Set animation options for all descendants.
 */
function setAnimation(node: G2ViewTree, duration: number, easing: string) {
  const discovered = [node];
  while (discovered.length) {
    const n = discovered.pop();
    n.animate = deepMix(
      {
        enter: {
          duration,
        },
        update: {
          duration,
          easing,
          type: 'morphing',
          fill: 'both',
        },
        exit: {
          type: 'fadeOut',
          duration,
        },
      },
      n.animate || {},
    );
    const { children } = n;
    if (Array.isArray(children)) discovered.push(...children);
  }
  return node;
}

/**
 * @todo More options, such as fill, totalDuration...
 */
export const TimingKeyframe: CC<TimingKeyframeOptions> = () => {
  return (options) => {
    const {
      children = [],
      duration = 1000,
      iterationCount = 1,
      direction = 'normal',
      easing = 'ease-in-out-sine',
    } = options;
    const n = children.length;
    if (!Array.isArray(children) || n === 0) return [];
    const { key } = children[0];
    const newChildren = children
      .map((d) => ({ ...d, key }))
      .map((d) => setAnimation(d, duration, easing));
    return function* () {
      let count = 0;
      let prevIndex: number;
      while (iterationCount === 'infinite' || count < iterationCount) {
        const [start, end] = range(direction, count, n);
        for (let i = start; i < end; i += 1) {
          // For reverse direction, the range is from negative to negative
          // so the absolute value of i is the real index for newChildren.
          const index = Math.abs(i);
          // This is for preventing alternate or reverse-alternate keyframe
          // to yield two same node one by one when the direction change.
          if (prevIndex !== index) yield newChildren[index];
          prevIndex = index;
        }
        count++;
      }
    };
  };
};

TimingKeyframe.props = {};

import { deepMix } from '@antv/util';
import { CompositionComponent as CC } from '../runtime';
import { KeyframeComposition } from '../spec';

export type KeyframeOptions = Omit<KeyframeComposition, 'type'>;

function range(
  direction: KeyframeComposition['direction'],
  iterationCount: number,
  keyframeCount: number,
) {
  const start = 0;
  const end = keyframeCount;
  const normal = [start, end];
  const reverse = [-end + 1, -start + 1];
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
 * @todo More options, such as fill, totalCount...
 */
export const Keyframe: CC<KeyframeOptions> = () => {
  return (options) => {
    const {
      children = [],
      duration = 1000,
      iterationCount = 1,
      direction = 'normal',
    } = options;
    const n = children.length;
    if (!Array.isArray(children) || n === 0) return [];
    const { key } = children[0];
    const newChildren = children.map((d) =>
      deepMix(
        {
          animate: {
            enter: { duration },
            update: {
              duration,
              type: 'morphing',
              easing: 'ease-in-out-sine',
              fill: 'both',
            },
            exit: { duration },
          },
        },
        d,
        {
          key,
        },
      ),
    );
    return function* () {
      let count = 0;
      let prevIndex: number;
      while (iterationCount === 'infinite' || count < iterationCount) {
        const [start, end] = range(direction, count, n);
        for (let i = start; i < end; i += 1) {
          const node = newChildren[Math.abs(i)];
          if (Math.abs(i) !== Math.abs(prevIndex)) yield node;
          prevIndex = i;
        }
        count++;
      }
    };
  };
};

Keyframe.props = {};

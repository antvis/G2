import { G2Spec } from '../../../src';

export async function peopleIntervalSplitMerge(): Promise<G2Spec> {
  const data = await fetch('data/people.json').then((res) => res.json());
  return {
    type: 'timingKeyframe',
    duration: 1000,
    children: [
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'mean' }],
        data,
        encode: {
          x: 'gender',
          y: 'weight',
          color: 'gender',
          key: 'gender',
        },
      },
      {
        type: 'point',
        data,
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
          shape: 'point',
          groupKey: 'gender',
        },
      },
    ],
  };
}

peopleIntervalSplitMerge.intervals = [false, [500], [500]];

import { Field } from 'encode';
import { TransformComponent as TC } from '../runtime';
import { PickTransform } from '../spec';
import { useMemoTransform } from './utils';

export type PickOptions = Omit<PickTransform, 'type'>;

/**
 * Immutable data sort by specified fields.
 */
export const Pick: TC<PickOptions> = (options) => {
  const { fields: F = [] } = options;
  return useMemoTransform(
    (data: any[]) => {
      const pick = (v: any) => {
        const pickedV = {};
        F.forEach((field) => {
          if (field in v) {
            pickedV[field] = v[field];
          }
        });
        return pickedV;
      };
      return data.map(pick);
    },
    [options],
  );
};

Pick.props = {};

/**
  数据不规整的情况？
const data = [
  { x: 1, y: 11 },
  { x: 2, y: 12 },
  { y: 13 },
  { x: 4, y: 14 },
  { x: 5, y: 15 },
];

Pick({ fields: ['x'] })(data);
/**
  result: [
    { x: 1 },
    { x: 2 },
    { x: 3 },
    { x: 4 },
    { x: 5 }
  ]

 */

import { TransformComponent as TC } from '../runtime';
import { PickTransform } from '../spec';
import { useMemoTransform } from './utils';

export type PickOptions = Omit<PickTransform, 'type'>;

/**
 * Immutable data pick by specified fields.
 */
export const Pick: TC<PickOptions> = (options) => {
  const { fields: F = [] } = options;
  return useMemoTransform(
    (data: any[]) => {
      const pick = (v: any) =>
        F.reduce((prev, field) => {
          if (field in v) {
            prev[field] = v[field];
          }
          return prev;
        }, {});

      return data.map(pick);
    },
    [options],
  );
};

Pick.props = {};

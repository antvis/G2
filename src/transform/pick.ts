import { TransformComponent as TC } from '../runtime';
import { PickTransform } from '../spec';
import { Subset } from './subset';
import { useMemoTransform } from './utils';

export type PickOptions = Omit<PickTransform, 'type'>;

/**
 * Immutable data pick by specified fields.
 */
export const Pick: TC<PickOptions> = (options) => {
  const { fields } = options;
  return useMemoTransform(Subset({ fields }), [options]);
};

Pick.props = {};

import { DataComponent as DC } from '../runtime';
import { PickTransform } from '../spec';
import { Subset } from './subset';

export type PickOptions = Omit<PickTransform, 'type'>;

/**
 * Immutable data pick by specified fields.
 */
export const Pick: DC<PickOptions> = (options) => {
  const { fields } = options;
  return Subset({ fields });
};

Pick.props = {};

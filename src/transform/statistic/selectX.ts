import { TransformComponent as TC } from '../../runtime';
import { SelectXTransform } from '../../spec';
import { Select } from './Select';

export type SelectXOptions = Omit<SelectXTransform, 'type'>;

/**
 * The selectX transform filter index by y channel.
 */
export const SelectX: TC<SelectXOptions> = (options = {}) => {
  const { selector, ...rest } = options;
  return Select({ x: selector, ...rest });
};

SelectX.props = {
  category: 'statistic',
};

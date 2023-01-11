import { TransformComponent as TC } from '../runtime';
import { SelectYTransform } from '../spec';
import { Select } from './select';

export type SelectYOptions = Omit<SelectYTransform, 'type'>;

/**
 * The selectY transform filter index by y channel.
 */
export const SelectY: TC<SelectYOptions> = (options = {}) => {
  const { selector, ...rest } = options;
  return Select({ channel: 'y', selector, ...rest });
};

SelectY.props = {};

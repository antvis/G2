import { createColorKey } from './utils';
import { ElementSelect } from './elementSelect';

export function ElementSelectByColor(options) {
  return ElementSelect({ ...options, createGroup: createColorKey });
}

ElementSelectByColor.props = {
  reapplyWhenUpdate: true,
};

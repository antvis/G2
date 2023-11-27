import { createXKey } from './utils';
import { ElementSelect } from './elementSelect';

export function ElementSelectByX(options) {
  return ElementSelect({ ...options, createGroup: createXKey });
}

ElementSelectByX.props = {
  reapplyWhenUpdate: true,
};

import {
  createDatumof,
  selectG2Elements,
  applyDefaultsActiveStyle,
  createXKey,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByX(options) {
  return (context) => {
    const { container, view } = context;
    return elementSelect(container, {
      ...applyDefaultsActiveStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
    });
  };
}

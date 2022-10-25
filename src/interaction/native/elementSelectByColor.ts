import {
  createDatumof,
  selectG2Elements,
  applyDefaultsActiveStyle,
  createColorKey,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByColor(options) {
  return (context) => {
    const { container, view } = context;
    return elementSelect(container, {
      ...applyDefaultsActiveStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createColorKey(view),
    });
  };
}

import {
  createDatumof,
  selectG2Elements,
  applyDefaultsHighlightedStyle,
  createColorKey,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByColor(options) {
  return (context) => {
    const { container, view } = context;
    return elementSelect(container, {
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createColorKey(view),
    });
  };
}

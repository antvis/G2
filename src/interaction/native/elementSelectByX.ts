import {
  createDatumof,
  selectG2Elements,
  applyDefaultsHighlightedStyle,
  createXKey,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByX(options) {
  return (context) => {
    const { container, view } = context;
    return elementSelect(container, {
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
    });
  };
}

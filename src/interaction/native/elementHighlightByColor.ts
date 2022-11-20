import {
  applyDefaultsHighlightedStyle,
  createDatumof,
  selectG2Elements,
  createColorKey,
} from './utils';
import { elementHighlight } from './elementHighlight';

/**
 * @todo Bind abstract data or data index.
 */
export function ElementHighlightByColor(options) {
  return (context) => {
    const { container, view } = context;
    return elementHighlight(container, {
      ...options,
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createColorKey(view),
    });
  };
}

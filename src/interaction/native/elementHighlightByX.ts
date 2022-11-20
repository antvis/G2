import {
  applyDefaultsHighlightedStyle,
  createDatumof,
  selectG2Elements,
  createXKey,
} from './utils';
import { elementHighlight } from './elementHighlight';

/**
 *
 * @todo Bind abstract data or data index.
 */
export function ElementHighlightByX(
  options = { selectedLineWidth: 1, selectedColor: 'black' },
) {
  return (context) => {
    const { container, view } = context;
    return elementHighlight(container, {
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
    });
  };
}

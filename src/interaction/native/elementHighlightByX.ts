import {
  applyDefaultsHighlightedStyle,
  createDatumof,
  selectG2Elements,
  createXKey,
  selectPlotArea,
} from './utils';
import { elementHighlight } from './elementHighlight';

/**
 *
 * @todo Bind abstract data or data index.
 */
export function ElementHighlightByX({ delay, ...rest }) {
  return (context) => {
    const { container, view } = context;
    const { scale, coordinate } = view;
    const plotArea = selectPlotArea(container);
    return elementHighlight(plotArea, {
      ...applyDefaultsHighlightedStyle(rest),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
      scale,
      coordinate,
      delay,
    });
  };
}

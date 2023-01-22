import {
  createDatumof,
  selectG2Elements,
  applyDefaultsHighlightedStyle,
  createColorKey,
  selectPlotArea,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByColor(options) {
  return (context) => {
    const { container, view } = context;
    const plot = selectPlotArea(container);
    return elementSelect(plot, {
      ...options,
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createColorKey(view),
    });
  };
}

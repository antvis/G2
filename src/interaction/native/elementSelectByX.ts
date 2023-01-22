import {
  createDatumof,
  selectG2Elements,
  applyDefaultsHighlightedStyle,
  createXKey,
  selectPlotArea,
} from './utils';
import { elementSelect } from './elementSelect';

export function ElementSelectByX(options) {
  return (context) => {
    const { container, view } = context;
    const plot = selectPlotArea(container);
    return elementSelect(plot, {
      ...options,
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createXKey(view),
    });
  };
}

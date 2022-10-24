import {
  applyDefaultsSelectedStyle,
  createDatumof,
  selectG2Elements,
} from './utils';
import { elementActive } from './elementActive';

/**
 *
 * @todo Bind abstract data or data index.
 */
export function ElementActiveByX(
  options = { selectedLineWidth: 1, selectedColor: 'black' },
) {
  return (context) => {
    const { container, view } = context;
    const { x: scaleX } = context.view.scale;
    return elementActive(container, {
      ...applyDefaultsSelectedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: (element) => {
        const { x } = element.__data__;
        return scaleX.invert(x);
      },
    });
  };
}

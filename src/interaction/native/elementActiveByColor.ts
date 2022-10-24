import {
  applyDefaultsSelectedStyle,
  createDatumof,
  selectG2Elements,
} from './utils';
import { elementActive } from './elementActive';

/**
 * @todo Bind abstract data or data index.
 */
export function ElementActiveByColor(options) {
  return (context) => {
    const { container, view } = context;
    return elementActive(container, {
      ...options,
      ...applyDefaultsSelectedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: (element) => element.__data__.color,
    });
  };
}

import { GuideComponentComponent as GCC } from '../runtime';
import { Scrollbar, ScrollbarOptions } from './scrollbar';

export type ScrollbarXOptions = ScrollbarOptions;

/**
 * ScrollbarX component.
 */
export const ScrollbarX: GCC<ScrollbarXOptions> = (options) => {
  return Scrollbar({ ...options, orientation: 'horizontal' });
};

ScrollbarX.props = {
  ...Scrollbar.props,
  defaultPosition: 'bottom',
};

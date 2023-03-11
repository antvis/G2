import { GuideComponentComponent as GCC } from '../runtime';
import { Scrollbar, ScrollbarOptions } from './scrollbar';

export type ScrollbarYOptions = ScrollbarOptions;

/**
 * ScrollbarY component.
 */
export const ScrollbarY: GCC<ScrollbarYOptions> = (options) => {
  return Scrollbar({ ...options, orientation: 'vertical' });
};

ScrollbarY.props = {
  ...Scrollbar.props,
  defaultPosition: 'left',
};

import { GuideComponentComponent as GCC } from '../runtime';
import { Slider, SliderOptions } from './slider';

export type SliderXOptions = SliderOptions;

/**
 * SliderX component.
 */
export const SliderX: GCC<SliderXOptions> = (options) => {
  return Slider({ ...options, orientation: 'horizontal' });
};

SliderX.props = {
  ...Slider.props,
  defaultPosition: 'bottom',
};

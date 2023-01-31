import { GuideComponentComponent as GCC } from '../runtime';
import { Slider, SliderOptions } from './slider';

export type SliderYOptions = SliderOptions;

/**
 * SliderY component.
 */
export const SliderY: GCC<SliderYOptions> = (options) => {
  return Slider({ ...options, orient: 'vertical' });
};

SliderY.props = {
  ...Slider.props,
  defaultPosition: 'left',
};

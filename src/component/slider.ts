import { Slider as SliderComponent } from '@antv/gui';
import { format } from 'd3-format';
import { least } from 'd3-array';
import { GuideComponentComponent as GCC, Scale } from '../runtime';
import { invert } from '../utils/scale';

export type SliderOptions = {
  orient: 'horizontal' | 'vertical';
  [key: string]: any;
};

/**
 * Slider component.
 */
export const Slider: GCC<SliderOptions> = (options) => {
  // do not pass size.
  const { orient, labelFormatter, size, ...rest } = options;

  return (scale, value, coordinate, theme) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { slider: sliderTheme = {} } = theme;
    const defaultFormatter = scale.getFormatter?.() || ((v) => v);
    const formatter =
      typeof labelFormatter === 'string'
        ? format(labelFormatter)
        : labelFormatter;

    return new SliderComponent({
      className: 'slider',
      style: Object.assign({}, sliderTheme, {
        x,
        y,
        trackLength: orient === 'horizontal' ? width : height,
        orient,
        formatter: (v) => {
          const f = formatter || defaultFormatter;
          // @todo Pass index to distinguish the left and the right value.
          const tick = invert(scale, v, true);
          return f(tick);
        },
        ...rest,
      }),
    });
  };
};

Slider.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
};

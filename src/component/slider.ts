import { Slider as SliderComponent } from '@antv/gui';
import { format } from 'd3-format';
import { GuideComponentComponent as GCC } from '../runtime';

export type SliderOptions = {
  orient: 'horizontal' | 'vertical';
  [key: string]: any;
};

/**
 * Slider component.
 */
export const Slider: GCC<SliderOptions> = (options) => {
  const { orient, formatter } = options;

  return (scale, value, coordinate, theme) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { slider: sliderTheme } = theme;
    const defaultFormatter = scale.getFormatter?.() || ((v) => v);

    return new SliderComponent({
      className: 'slider',
      style: Object.assign({}, sliderTheme, {
        x,
        y,
        length: orient === 'horizontal' ? width : height,
        orient,
        values: [0, 1],
        formatter: (v) => {
          const origin = scale.invert(v);
          const f =
            typeof formatter === 'string' ? format(formatter) : formatter;
          return f ? f(origin) : defaultFormatter(origin);
        },
      }),
    });
  };
};

Slider.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
};

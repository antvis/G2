import { Slider as SliderComponent } from '@antv/gui';
import { format } from 'd3-format';
import { GuideComponentComponent as GCC } from '../runtime';
import { invert } from '../utils/scale';

export type SliderOptions = {
  orientation: 'horizontal' | 'vertical';
  [key: string]: any;
};

/**
 * Slider component.
 */
export const Slider: GCC<SliderOptions> = (options) => {
  // do not pass size.
  const { orientation, labelFormatter, size, style, ...rest } = options;

  return ({ scales: [scale], value, theme }) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { slider: sliderTheme = {} } = theme;
    const defaultFormatter = scale.getFormatter?.() || ((v) => v.toString());
    const formatter =
      typeof labelFormatter === 'string'
        ? format(labelFormatter)
        : labelFormatter;

    return new SliderComponent({
      className: 'slider',
      style: Object.assign({}, sliderTheme, {
        x,
        y,
        trackLength: orientation === 'horizontal' ? width : height,
        orientation,
        formatter: (v) => {
          const f = formatter || defaultFormatter;
          // @todo Pass index to distinguish the left and the right value.
          const tick = invert(scale, v, true);
          return f(tick);
        },
        ...style,
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

import { Slider as SliderComponent } from '@antv/gui';
import { format } from 'd3-format';
import { least } from 'd3-array';
import { GuideComponentComponent as GCC, Scale } from '../runtime';

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
          const tick = invertTick(scale, v);
          return f(tick);
        },
        ...rest,
      }),
    });
  };
};

/**
 * Translate [0,1] value to origin value.
 */
function invertTick(scale: Scale, v: number) {
  if (!scale.getBandWidth) return scale.invert(v);
  // @ts-ignore  @todo should support in scale
  const range = scale.adjustedRange as number[];
  const abs = (v) => Math.abs(v);
  return scale.invert(least(range, (a, b) => abs(a - v) - abs(b - v)));
}

Slider.props = {
  defaultPosition: { anchor: 'bottom' },
  defaultSize: 24,
  defaultOrder: 1,
};

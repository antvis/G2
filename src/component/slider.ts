import { Slider as SliderComponent } from '@antv/component';
import { format } from 'd3-format';
import { DisplayObject } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import { GuideComponentComponent as GCC } from '../runtime';
import { invert } from '../utils/scale';

export type SliderOptions = {
  orientation: 'horizontal' | 'vertical';
  [key: string]: any;
};

function inferPosition(bbox, position, trackSize) {
  const { x, y, width, height } = bbox;
  if (position === 'left') return [x + width - trackSize, y];
  if (position === 'right') return [x, y];
  if (position === 'bottom') return [x, y];
  if (position === 'top') return [x, y + height - trackSize];
}

/**
 * Slider component.
 */
export const Slider: GCC<SliderOptions> = (options) => {
  // do not pass size.
  const {
    orientation,
    labelFormatter,
    size,
    style = {},
    position,
    ...rest
  } = options;

  return ({ scales: [scale], value, theme, coordinate }) => {
    const { bbox } = value;

    const { width, height } = bbox;
    const { slider: sliderTheme = {} } = theme;
    const defaultFormatter = scale.getFormatter?.() || ((v) => v + '');
    const formatter =
      typeof labelFormatter === 'string'
        ? format(labelFormatter)
        : labelFormatter;

    const isHorizontal = orientation === 'horizontal';
    const reverse = isTranspose(coordinate) && isHorizontal;
    const { trackSize = sliderTheme.trackSize } = style;
    const [x0, y0] = inferPosition(bbox, position, trackSize);
    return new SliderComponent({
      className: 'slider',
      style: Object.assign({}, sliderTheme, {
        x: x0,
        y: y0,
        trackLength: isHorizontal ? width : height,
        orientation,
        formatter: (v) => {
          const f = formatter || defaultFormatter;
          const v1 = reverse ? 1 - v : v;
          const tick = invert(scale, v1, true);
          return f(tick);
        },
        ...style,
        ...rest,
      }),
    }) as unknown as DisplayObject;
  };
};

Slider.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
  defaultCrossPadding: [12, 12],
  defaultPadding: [12, 12],
};

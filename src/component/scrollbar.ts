import { Scrollbar as ScrollbarComponent } from '@antv/component';
import { DisplayObject } from '@antv/g';
import { GuideComponentComponent as GCC } from '../runtime';

export type ScrollbarOptions = {
  orientation?: 'horizontal' | 'vertical';
  ratio?: number;
  [key: string]: any;
};

/**
 * Scrollbar component.
 */
export const Scrollbar: GCC<ScrollbarOptions> = (options) => {
  const { orientation, labelFormatter, style, ...rest } = options;

  return ({ scales: [scale], value, theme }) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { scrollbar: scrollbarTheme = {} } = theme;
    const { ratio, range } = scale.getOptions();
    const mainSize = orientation === 'horizontal' ? width : height;
    const actualSize = mainSize / ratio;
    const [r0, r1] = range;
    const value1 = r1 > r0 ? 0 : 1;
    return new ScrollbarComponent({
      className: 'g2-scrollbar',
      style: Object.assign({}, scrollbarTheme, {
        ...style,
        x,
        y,
        trackLength: mainSize,
        value: value1,
        ...rest,
        orientation,
        contentLength: actualSize,
        viewportLength: mainSize,
      }),
    }) as unknown as DisplayObject;
  };
};

Scrollbar.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
  defaultCrossPadding: [12, 12],
  defaultPadding: [12, 12],
};

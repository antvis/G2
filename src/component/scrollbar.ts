import { Scrollbar as ScrollbarComponent } from '@antv/gui';
import { GuideComponentComponent as GCC } from '../runtime';

export type ScrollbarOptions = {
  orientation: 'horizontal' | 'vertical';
  [key: string]: any;
};

/**
 * Scrollbar component.
 */
export const Scrollbar: GCC<ScrollbarOptions> = (options) => {
  const { orientation, labelFormatter, style, ...rest } = options;

  return ({ value, theme }) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { scrollbar: scrollbarTheme = {} } = theme;

    return new ScrollbarComponent({
      className: 'scrollbar',
      style: Object.assign({}, scrollbarTheme, {
        ...style,
        x,
        y,
        trackLength: orientation === 'horizontal' ? width : height,
        ...rest,
        orientation,
        value: 0,
        // @todo Get actual length of content.
        contentLength: 1500,
        viewportLength: orientation === 'horizontal' ? width : height,
      }),
    });
  };
};

Scrollbar.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
};

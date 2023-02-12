import { Scrollbar as ScrollbarComponent } from '@antv/gui';
import { GuideComponentComponent as GCC } from '../runtime';

export type ScrollbarOptions = {
  orient: 'horizontal' | 'vertical';
  [key: string]: any;
};

/**
 * Scrollbar component.
 */
export const Scrollbar: GCC<ScrollbarOptions> = (options) => {
  const { orient, labelFormatter, style, ...rest } = options;

  return (scales, value, coordinate, theme) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const { scrollbar: scrollbarTheme = {} } = theme;

    return new ScrollbarComponent({
      className: 'scrollbar',
      style: Object.assign({}, scrollbarTheme, {
        ...style,
        x,
        y,
        trackLength: orient === 'horizontal' ? width : height,
        ...rest,
        orient,
        value: 0,
        // @todo Get actual length of content.
        contentLength: 1500,
        viewportLength: orient === 'horizontal' ? width : height,
      }),
    });
  };
};

Scrollbar.props = {
  defaultPosition: 'bottom',
  defaultSize: 24,
  defaultOrder: 1,
};

import { Path as GPath } from '@antv/g';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  [key: string]: any;
};

/**
 * Connect 2 points with a single line.
 */
export const Color: SC<ColorOptions> = (options) => {
  const { arrow, colorAttribute, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { stroke, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { d, color } = value;
    return select(new GPath())
      .call(applyStyle, shapeTheme)
      .style('d', d)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

Color.props = {
  defaultEnterAnimation: 'fadeIn',
};

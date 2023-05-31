import { Path as GPath } from '@antv/g';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  [key: string]: any;
};

/**
 * Draw a filled or hollow path.
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
    const [width, height] = coordinate.getSize();
    return (
      select(new GPath())
        .call(applyStyle, shapeTheme)
        // Path support string, function with parameter { width, height }.
        .style('d', typeof d === 'function' ? d({ width, height }) : d)
        .style(colorAttribute, color)
        .call(applyStyle, style)
        .node()
    );
  };
};

Color.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

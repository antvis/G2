import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  [key: string]: any;
};

/**
 * Draw a filled or hollow path.
 */
export const Color: SC<ColorOptions> = (options, context) => {
  const { arrow, colorAttribute, ...style } = options;
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { color: defaultColor, stroke, ...rest } = defaults;
    const { d, color = defaultColor } = value;
    const [width, height] = coordinate.getSize();
    return (
      select(document.createElement('path', {}))
        .call(applyStyle, rest)
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

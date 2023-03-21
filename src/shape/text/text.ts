import { ShapeComponent as SC } from '../../runtime';
import { applyStyle, getShapeTheme } from '../../shape/utils';
import { select } from '../../utils/selection';
import { Advance } from './advance';

export type TextOptions = Record<string, any>;

/**
 * todo autoRotate when in polar coordinate
 */
export const Text: SC<TextOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { ...shapeTheme } = getShapeTheme(theme, mark, shape, defaultShape);
    const { color, text = '', fontSize, rotate = 0, transform = '' } = value;

    const textStyle = {
      text: String(text),
      stroke: color,
      fill: color,
      fontSize,
    };

    const [[x0, y0]] = points;

    return select(new Advance())
      .style('x', x0)
      .style('y', y0)
      .call(applyStyle, shapeTheme)
      .style('transform', `${transform}rotate(${+rotate})`)
      .style('coordCenter', coordinate.getCenter())
      .call(applyStyle, textStyle)
      .call(applyStyle, style)
      .node();
  };
};

Text.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

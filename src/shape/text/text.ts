import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { select } from '../../utils/selection';
import { Advance } from './advance';

export type TextOptions = Record<string, any>;

/**
 * @todo autoRotate when in polar coordinate
 */
export const Text: SC<TextOptions> = (options, context) => {
  const { coordinate } = context;
  return (points, value, defaults) => {
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
      .call(applyStyle, defaults)
      .style('transform', `${transform}rotate(${+rotate})`)
      .style('coordCenter', coordinate.getCenter())
      .call(applyStyle, textStyle)
      .call(applyStyle, options)
      .node();
  };
};

Text.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

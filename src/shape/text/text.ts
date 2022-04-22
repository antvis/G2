import { Text as GText } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { select } from '../../utils/selection';

export type TextOptions = Record<string, any>;

/**
 * todo autoRotate when in polar coordinate
 */
export const Text: SC<TextOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const {
      color = defaultColor,
      text = '',
      fontSize = 14,
      rotate = 0,
      transform = '',
    } = value;
    const [[x0, y0]] = points;

    return select(new GText())
      .style('x', x0)
      .style('y', y0)
      .style('text', String(text))
      .style('stroke', color)
      .style('fill', color)
      .style('fontSize', fontSize as any)
      .style('transform', `${transform}rotate(${+rotate})`)
      .call(applyStyle, style)
      .node();
  };
};

Text.props = {
  defaultEnterAnimation: 'fadeIn',
};

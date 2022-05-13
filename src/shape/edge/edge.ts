import { Line as GLine } from '@antv/g';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type EdgeOptions = Record<string, any>;

export const Edge: SC<EdgeOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    return select(new GLine())
      .style('x1', from[0])
      .style('y1', from[1])
      .style('x2', to[0])
      .style('y2', to[1])
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Edge.props = {
  defaultEnterAnimation: 'fadeIn',
};

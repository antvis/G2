import { path as d3path } from 'd3-path';
import { Path } from '@antv/g';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type VectorOptions = Record<string, any>;

export const Vector: SC<VectorOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    return select(new Path())
      .style('d', path.toString())
      .style('stroke', color)
      .style('fill', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Vector.props = {
  defaultEnterAnimation: 'fadeIn',
};

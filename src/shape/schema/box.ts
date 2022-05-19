import { Path as GPath } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type BoxOptions = Record<string, any>;

export const Box: SC<BoxOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    const path = d3path();

    path.moveTo(...points[0]);
    path.lineTo(...points[1]);

    path.moveTo(...points[2]);
    path.lineTo(...points[3]);

    path.moveTo(...points[4]);
    path.lineTo(...points[5]);
    path.lineTo(...points[6]);
    path.lineTo(...points[7]);
    path.closePath();

    path.moveTo(...points[8]);
    path.lineTo(...points[9]);

    path.moveTo(...points[10]);
    path.lineTo(...points[11]);

    path.moveTo(...points[12]);
    path.lineTo(...points[13]);

    path.closePath();

    return select(new GPath())
      .style('d', path.toString())
      .style('stroke', color)
      .style('fill', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Box.props = {
  defaultEnterAnimation: 'fadeIn',
};

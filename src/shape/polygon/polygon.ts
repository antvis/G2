import { Path as GPath } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type PolygonOptions = Record<string, any>;

export const Polygon: SC<PolygonOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    const path = d3path();
    points.forEach((p, idx) =>
      idx === 0 ? path.moveTo(p[0], p[1]) : path.lineTo(p[0], p[1]),
    );
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

Polygon.props = {
  defaultEnterAnimation: 'fadeIn',
};

import { Path as GPath } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type RibbonOptions = Record<string, any>;

/**
 * Used in sankey edge.
 * p0                          p2
 *    ┌──────────────────────┐
 *    │                      │
 *    │                      │
 * p1 └──────────────────────┘ p3
 */
export const Ribbon: SC<RibbonOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    const [p0, p1, p2, p3] = points;

    const path = d3path();

    path.moveTo(p0[0], p0[1]);
    path.bezierCurveTo(
      p0[0] / 2 + p2[0] / 2,
      p0[1],
      p0[0] / 2 + p2[0] / 2,
      p2[1],
      p2[0],
      p2[1],
    );
    path.lineTo(p3[0], p3[1]);
    path.bezierCurveTo(
      p3[0] / 2 + p1[0] / 2,
      p3[1],
      p3[0] / 2 + p1[0] / 2,
      p1[1],
      p1[0],
      p1[1],
    );
    path.lineTo(p0[0], p0[1]);

    path.closePath();

    return select(new GPath())
      .style('d', path.toString())
      .style('fill', color)
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Ribbon.props = {
  defaultEnterAnimation: 'fadeIn',
};

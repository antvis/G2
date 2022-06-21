import { Path } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { point as path } from '../point/symbol';
import { select } from '../../utils/selection';
import { applyStyle } from '../utils';

export type PointOptions = Record<string, any>;

/**
 * ●
 */
export const Point: SC<PointOptions> = (style) => {
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform, size } = value;
    // When point shape, only use points[0].
    const [cx, cy] = points[0];

    return select(new Path())
      .style('d', path(cx, cy, +size))
      .style('lineWidth', 0)
      .style('stroke', color)
      .style('transform', transform)
      .style('fill', color)
      .call(applyStyle, style)
      .node();
  };
};

Point.props = {
  defaultEnterAnimation: 'fadeIn',
};

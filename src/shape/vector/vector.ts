import { path as d3path } from 'd3-path';
import { Path } from '@antv/g';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { dist } from '../../utils/vector';
import { ShapeComponent as SC, Vector2 } from '../../runtime';

export type VectorOptions = Record<string, any>;

function getArrowPoints(from: Vector2, to: Vector2) {
  const arrowSize = 0.4 * dist(from, to);
  // TODO Use config from style.
  // Default arrow rotate is 30°.
  const arrowAngle = Math.PI / 6;

  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);

  const arrowAngle1 = Math.PI / 2 - angle - arrowAngle;
  const arrow1: Vector2 = [
    to[0] - arrowSize * Math.sin(arrowAngle1),
    to[1] - arrowSize * Math.cos(arrowAngle1),
  ];

  const arrowAngle2 = angle - arrowAngle;
  const arrow2: Vector2 = [
    to[0] - arrowSize * Math.cos(arrowAngle2),
    to[1] - arrowSize * Math.sin(arrowAngle2),
  ];

  return [arrow1, arrow2];
}

/**
 * ----->
 */
export const Vector: SC<VectorOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    // Calculate arrow end point.
    const [arrow1, arrow2] = getArrowPoints(from, to);

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    path.moveTo(...to);
    path.lineTo(...arrow1);
    path.moveTo(...to);
    path.lineTo(...arrow2);

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

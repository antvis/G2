import { path as d3path } from 'd3-path';
import { Path } from '@antv/g';
import { applyStyle, arrowPoints, ArrowOptions, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type VectorOptions = ArrowOptions;

/**
 * Connect 2 points with a single line with arrow.
 * ----->
 */
export const Vector: SC<VectorOptions> = (options) => {
  const { arrow = true, arrowSize = '40%', ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape, transform } = value;
    const { defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor } = value;
    const [from, to] = points;

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    if (arrow) {
      // Calculate arrow end point.
      const [arrow1, arrow2] = arrowPoints(from, to, { arrowSize });
      path.moveTo(...to);
      path.lineTo(...arrow1);
      path.moveTo(...to);
      path.lineTo(...arrow2);
    }

    return select(new Path())
      .call(applyStyle, shapeTheme)
      .style('d', path.toString())
      .style('stroke', color || defaultColor)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Vector.props = {
  defaultMarker: 'line',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

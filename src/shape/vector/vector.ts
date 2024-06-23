import { path as d3path } from 'd3-path';
import { applyStyle, arrowPoints, ArrowOptions } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type VectorOptions = ArrowOptions;

/**
 * Connect 2 points with a single line with arrow.
 * ----->
 */
export const Vector: SC<VectorOptions> = (options, context) => {
  const { arrow = true, arrowSize = '40%', ...style } = options;
  const { document } = context;
  return (points, value, defaults) => {
    const { defaultColor, ...rest } = defaults;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    if (arrow) {
      // Calculate arrow end point.
      const [arrow1, arrow2] = arrowPoints(from, to, { arrowSize });
      path.moveTo(...arrow1);
      path.lineTo(...to);
      path.lineTo(...arrow2);
    }

    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path.toString())
      .style('stroke', color)
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

import { Path } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle, arrowPoints, ArrowOptions, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type LinkOptions = ArrowOptions;

/**
 * Connect 2 points with a single line.
 */
export const Link: SC<LinkOptions> = (options) => {
  const { arrowSize, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    if (arrowSize) {
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
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Link.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

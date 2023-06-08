import { path as d3path } from 'd3-path';
import { appendArc, applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { isPolar } from '../../utils/coordinate';
import { dist, mid } from '../../utils/vector';
import { ShapeComponent as SC } from '../../runtime';

export type ArcOptions = Record<string, any>;

/**
 * Connect points for 2 points:
 * - In rect, draw half circle.
 * - In polar, draw quadratic curve.
 */
export const Arc: SC<ArcOptions> = (options, context) => {
  const { ...style } = options;
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { color: defaultColor, ...rest } = defaults;

    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    const path = d3path();
    path.moveTo(from[0], from[1]);

    if (isPolar(coordinate)) {
      const center = coordinate.getCenter();
      path.quadraticCurveTo(center[0], center[1], to[0], to[1]);
    } else {
      const center = mid(from, to);
      const raduis = dist(from, to) / 2;
      appendArc(path, from, to, center, raduis);
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

Arc.props = {
  defaultMarker: 'smooth',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

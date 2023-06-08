import { path as d3path } from 'd3-path';
import { Coordinate } from '@antv/coord';
import { appendArc, applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { isPolar } from '../../utils/coordinate';
import { dist } from '../../utils/vector';
import { ShapeComponent as SC, Vector2 } from '../../runtime';

/**
 * p0                          p2
 *    ┌──────────────────────┐
 *    │                      │
 *    │                      │
 * p1 └──────────────────────┘ p3
 */
export type RibbonOptions = Record<string, any>;

function getRibbonPath(points: Vector2[], coordinate: Coordinate) {
  const [p0, p1, p2, p3] = points;
  const path = d3path();

  // In polar, draw shape only for Chord.
  if (isPolar(coordinate)) {
    const center = coordinate.getCenter();
    const radius = dist(center, p0);

    path.moveTo(p0[0], p0[1]);
    // p0 -> p2
    path.quadraticCurveTo(center[0], center[1], p2[0], p2[1]);
    // p2 -> p3
    appendArc(path, p2, p3, center, radius);
    // p3 -> p1
    path.quadraticCurveTo(center[0], center[1], p1[0], p1[1]);
    // p1 -> p0
    appendArc(path, p1, p0, center, radius);
    path.closePath();

    return path;
  }

  // In Rect, draw shape for Sankey.
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

  return path;
}

/**
 * Connect points for 4 points:
 * - In rect, draw ribbon used in Sankey.
 * - In polar, draw arc used in Chord.
 */
export const Ribbon: SC<RibbonOptions> = (options, context) => {
  const { ...style } = options;
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { color: defaultColor, ...rest } = defaults;
    const { color = defaultColor, transform } = value;
    const path = getRibbonPath(points, coordinate);
    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path.toString())
      .style('fill', color || defaultColor)
      .style('stroke', color || defaultColor)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Ribbon.props = {
  defaultMarker: 'square',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

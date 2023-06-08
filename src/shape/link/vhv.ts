import { path as d3path } from 'd3-path';
import { Coordinate } from '@antv/coord';
import { appendArc, applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { isTranspose, isPolar } from '../../utils/coordinate';
import { Vector2, dist } from '../../utils/vector';
import { ShapeComponent as SC } from '../../runtime';

export type VHVOptions = {
  /**
   * The ratio of line corner, default: 1/3.
   */
  cornerRatio?: number;
  [key: string]: any;
};

/**
 * Get vhv path in different coordinate.
 */
function getVHVPath(
  from: Vector2,
  to: Vector2,
  coordinate: Coordinate,
  ratio: number,
) {
  const path = d3path();

  if (isPolar(coordinate)) {
    const center = coordinate.getCenter();

    const a = dist(from, center);
    const b = dist(to, center);
    const radius = (b - a) * ratio + a;

    path.moveTo(from[0], from[1]);
    appendArc(path, from, to, center, radius);
    path.lineTo(to[0], to[1]);

    return path;
  }

  if (isTranspose(coordinate)) {
    path.moveTo(from[0], from[1]);
    // VHV in x.
    path.lineTo(from[0] + (to[0] - from[0]) * ratio, from[1]);
    path.lineTo(from[0] + (to[0] - from[0]) * ratio, to[1]);
    path.lineTo(to[0], to[1]);

    return path;
  }

  path.moveTo(from[0], from[1]);
  // VHV in y.
  path.lineTo(from[0], from[1] + (to[1] - from[1]) * ratio);
  path.lineTo(to[0], from[1] + (to[1] - from[1]) * ratio);
  path.lineTo(to[0], to[1]);

  return path;
}

/**
 * Connect 2 points with a VHV line, used in tree.
 */
export const VHV: SC<VHVOptions> = (options, context) => {
  const { cornerRatio = 1 / 3, ...style } = options;
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { defaultColor, ...rest } = defaults;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;
    const path = getVHVPath(from, to, coordinate, cornerRatio);
    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path.toString())
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

VHV.props = {
  defaultMarker: 'vhv',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

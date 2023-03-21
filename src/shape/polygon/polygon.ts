import { Path as GPath } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { path as d3path } from 'd3-path';
import { isPolar } from '../../utils/coordinate';
import { applyStyle, appendPolygon, appendArc, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { dist } from '../../utils/vector';
import { ShapeComponent as SC, Vector2 } from '../../runtime';

export type PolygonOptions = Record<string, any>;

function getPolygonPath(points: Vector2[], coordinate: Coordinate) {
  const path = d3path();
  // In polar, draw arc.
  if (isPolar(coordinate)) {
    const center = coordinate.getCenter();
    const closedPoints = [...points, points[0]];
    // Calculate dist array for cache.
    const dists = closedPoints.map((p) => dist(p, center));

    closedPoints.forEach((curr, idx) => {
      if (idx === 0) {
        path.moveTo(curr[0], curr[1]);
        return;
      }
      const currDist = dists[idx];
      const prev = points[idx - 1];
      const prevDist = dists[idx - 1];

      // When radius is equal, draw 2 point with arc.
      // todo: choose a minimum value.
      if (prevDist !== undefined && Math.abs(currDist - prevDist) < 1e-10) {
        appendArc(path, prev, curr, center, currDist);
      } else {
        path.lineTo(curr[0], curr[1]);
      }
    });
    path.closePath();

    return path;
  }

  // In rect, draw polygon.
  return appendPolygon(path, points);
}

export const Polygon: SC<PolygonOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape, color, transform } = value;
    const { defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );

    const path = getPolygonPath(points, coordinate);

    return select(new GPath())
      .call(applyStyle, shapeTheme)
      .style('d', path.toString())
      .style('stroke', color || defaultColor)
      .style('fill', color || defaultColor)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Polygon.props = {
  defaultMarker: 'square',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

import { path as d3path } from 'd3-path';
import { Coordinate } from '@antv/coord';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { isPolar } from '../../utils/coordinate';
import { angle, sub, dist } from '../../utils/vector';

export type ViolinOptions = Record<string, any>;

function getPath(p: Vector2[], coordinate: Coordinate, size = 4) {
  const path = d3path();

  if (!isPolar(coordinate)) {
    path.moveTo(...p[2]);
    path.lineTo(...p[3]);

    path.lineTo(p[3][0] - size, p[3][1]);
    path.lineTo(p[10][0] - size, p[10][1]);
    path.lineTo(p[10][0] + size, p[10][1]);
    path.lineTo(p[3][0] + size, p[3][1]);
    path.lineTo(...p[3]);
    path.closePath();

    path.moveTo(...p[10]);
    path.lineTo(...p[11]);

    path.moveTo(p[3][0] + size / 2, p[8][1]);
    path.arc(p[3][0], p[8][1], size / 2, 0, Math.PI * 2);
    path.closePath();

    return path;
  }

  const center = coordinate.getCenter();
  const [x, y] = center;

  const radiusQ3 = dist(center, p[3]);
  const radiusMedian = dist(center, p[8]);
  const radiusQ1 = dist(center, p[10]);

  const middleAngle = angle(sub(p[2], center));
  const rectAngle = Math.asin(size / radiusMedian);
  const startAngle = middleAngle - rectAngle;
  const endAngle = middleAngle + rectAngle;

  path.moveTo(...p[2]);
  path.lineTo(...p[3]);

  path.moveTo(
    Math.cos(startAngle) * radiusQ3 + x,
    Math.sin(startAngle) * radiusQ3 + y,
  );
  path.arc(x, y, radiusQ3, startAngle, endAngle);
  path.lineTo(
    Math.cos(endAngle) * radiusQ1 + x,
    Math.sin(endAngle) * radiusQ1 + y,
  );
  path.arc(x, y, radiusQ1, endAngle, startAngle, true);
  path.lineTo(
    Math.cos(startAngle) * radiusQ3 + x,
    Math.sin(startAngle) * radiusQ3 + y,
  );
  path.closePath();

  path.moveTo(...p[10]);
  path.lineTo(...p[11]);

  const a = (startAngle + endAngle) / 2;

  path.moveTo(
    Math.cos(a) * (radiusMedian + size / 2) + x,
    Math.sin(a) * (radiusMedian + size / 2) + y,
  );
  path.arc(
    Math.cos(a) * radiusMedian + x,
    Math.sin(a) * radiusMedian + y,
    size / 2,
    a,
    Math.PI * 2 + a,
  );
  path.closePath();

  return path;
}

export const Violin: SC<ViolinOptions> = (options, context) => {
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { color, transform } = value;
    // TODO: how to setting it by size channel.
    const size = 4;
    const {
      color: defaultColor,
      fill = defaultColor,
      stroke = defaultColor,
      ...rest
    } = defaults;
    const path = getPath(points, coordinate, size);
    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path.toString())
      .style('stroke', stroke)
      .style('fill', color || fill)
      .style('transform', transform)
      .call(applyStyle, options)
      .node();
  };
};

Violin.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

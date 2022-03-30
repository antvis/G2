import { Rect, Path } from '@antv/g';
import { arc } from 'd3-shape';
import { Container } from '../../utils/container';
import { angle, sub, dist } from '../../utils/vector';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isTranspose, isPolar } from '../../utils/coordinate';
import { applyStyle, attr } from '../utils';

export type ColorRectOptions = {
  colorAttribute: 'fill' | 'stroke';
};

/**
 * Render rect in different coordinate.
 * @todo Replace d3-arc with custom arc path generator because of accuracy problem.
 */
export const ColorRect: SC<ColorRectOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute } = options;
  const lineWidth = colorAttribute === 'stroke' ? 2 : undefined;

  return (points, style, coordinate) => {
    const { color, radius = 0 } = style;
    const [p0, p1, p2, p3] = isTranspose(coordinate) ? reorder(points) : points;

    // Render rect in non-polar coordinate.
    if (!isPolar(coordinate)) {
      const [x, y] = p0;
      const [width, height] = sub(p2, p0);
      return (
        Container.of<Rect>(new Rect({}))
          .map(attr, 'lineWidth', lineWidth)
          .map(attr, 'x', x)
          .map(attr, 'y', y)
          .map(attr, 'width', width)
          .map(attr, 'height', height)
          .map(attr, 'stroke', color)
          .map(attr, colorAttribute, color)
          // The priority of style is higher than encode value.
          .map(applyStyle, style)
          .value()
      );
    }

    // Render path in polar coordinate.
    const center = coordinate.getCenter() as Vector2;
    const a1 = angle(sub(p0, center));
    const a2 = angle(sub(p1, center));
    const arcObject = {
      startAngle: a1,
      endAngle: a2 - a1 >= 0 ? a2 : Math.PI * 2 + a2,
      innerRadius: dist(p3, center),
      outerRadius: dist(p0, center),
    };
    const path = arc().cornerRadius(radius as number);

    return Container.of<Path>(new Path({}))
      .map(attr, 'path', path(arcObject))
      .map(attr, 'transform', `translate(${center[0]}, ${center[1]})`)
      .map(attr, 'stroke', color)
      .map(attr, colorAttribute, color)
      .map(applyStyle, style)
      .value();
  };
};

// @todo Should Shape have default animations using for ordinal scale?
ColorRect.props = {
  defaultEnterAnimation: 'scaleInY',
};

function reorder(points: Vector2[]): Vector2[] {
  const [p0, p1, p2, p3] = points;
  return [p3, p0, p1, p2];
}

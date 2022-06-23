import { Path } from '@antv/g';
import { arc } from 'd3-shape';
import { path as d3path } from 'd3-path';
import { angle, sub, dist } from '../../utils/vector';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isTranspose, isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { applyStyle, appendPolygon } from '../utils';

function reorder(points: Vector2[]): Vector2[] {
  const [p0, p1, p2, p3] = points;
  return [p3, p0, p1, p2];
}

export type ColorRectOptions = {
  colorAttribute: 'fill' | 'stroke';
  [key: string]: any;
};

/**
 * Render rect in different coordinate.
 * @todo Replace d3-arc with custom arc path generator.
 * Calc arc path based on control points directly rather startAngle, endAngle, innerRadius,
 * outerRadius. This is not accurate and will cause bug when the range of y scale is [1, 0]
 * for grid geometry.
 * @todo Radius in rect.
 */
export const ColorRect: SC<ColorRectOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, ...style } = options;
  const lineWidth = colorAttribute === 'stroke' ? 1 : 0;

  return (points, value, coordinate, theme) => {
    const { radius = 0 } = style;
    const { defaultColor } = theme;
    const { color = defaultColor } = value;
    const [p0, p1, p2, p3] = isTranspose(coordinate) ? reorder(points) : points;

    // Render rect in non-polar coordinate.
    if (!isPolar(coordinate)) {
      return select(new Path())
        .style('lineWidth', lineWidth)
        .style('d', appendPolygon(d3path(), points).toString())
        .style('stroke', color)
        .style(colorAttribute, color)
        .call(applyStyle, style) // The priority of style is higher than encode value.
        .node();
    }

    // Render path in polar coordinate.
    const { y, y1 } = value;
    const center = coordinate.getCenter() as Vector2;
    const a1 = angle(sub(p0, center));
    const a2 = angle(sub(p1, center));
    // There are two situations that a2 === a1:
    // 1. a1 - a2 = 0
    // 2. |a1 - a2| = Math.PI * 2
    // Distinguish them by y and y1:
    const a3 = a2 === a1 && y !== y1 ? a2 + Math.PI * 2 : a2;
    const arcObject = {
      startAngle: a1,
      endAngle: a3 - a1 >= 0 ? a3 : Math.PI * 2 + a3,
      innerRadius: dist(p3, center),
      outerRadius: dist(p0, center),
    };
    const path = arc().cornerRadius(radius as number);

    return select(new Path({}))
      .style('path', path(arcObject))
      .style('transform', `translate(${center[0]}, ${center[1]})`)
      .style('stroke', color)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

// @todo Should Shape have default animations using for ordinal scale?
ColorRect.props = {
  defaultEnterAnimation: 'scaleInY',
};

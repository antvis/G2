import { Path, Rect } from '@antv/g';
import { arc } from 'd3-shape';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isPolar, isHelix, isTranspose } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { applyStyle, appendPolygon, getArcObject, reorder } from '../utils';
import { sub } from '../.././utils/vector';

export type ColorOptions = {
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
export const Color: SC<ColorOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, ...style } = options;
  const lineWidth = colorAttribute === 'stroke' ? 1 : 0;

  return (points, value, coordinate, theme) => {
    const {
      radius = 0,
      radiusTopLeft = radius,
      radiusTopRight = radius,
      radiusBottomRight = radius,
      radiusBottomLeft = radius,
    } = style;
    const { defaultColor } = theme;
    const { color = defaultColor } = value;

    // Render rect in non-polar coordinate.
    if (!isPolar(coordinate) && !isHelix(coordinate)) {
      const [p0, , p2] = isTranspose(coordinate) ? reorder(points) : points;
      const [x, y] = p0;
      const [width, height] = sub(p2, p0);
      // Deal with width or height is negative.
      const absX = width > 0 ? x : x + width;
      const absY = height > 0 ? y : y + height;
      const absWidth = Math.abs(width);
      const absHeight = Math.abs(height);
      return select(new Rect({}))
        .style('lineWidth', lineWidth)
        .style('x', absX)
        .style('y', absY)
        .style('width', absWidth)
        .style('height', absHeight)
        .style('stroke', color)
        .style(colorAttribute, color)
        .style('radius', [
          radiusTopLeft,
          radiusTopRight,
          radiusBottomRight,
          radiusBottomLeft,
        ])
        .call(applyStyle, style)
        .node();
    }

    // Render path in polar coordinate.
    const { y, y1 } = value;
    const center = coordinate.getCenter() as Vector2;
    const arcObject = getArcObject(coordinate, points, [y, y1]);
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
Color.props = {
  defaultEnterAnimation: 'scaleInY',
};

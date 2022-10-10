import { Path, Rect } from '@antv/g';
import { arc } from 'd3-shape';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isPolar, isHelix, isTranspose } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { sub } from '../.././utils/vector';
import { applyStyle, getArcObject, getShapeTheme, reorder } from '../utils';

export type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  [key: string]: any;
};

/**
 * Render rect in different coordinate.
 * Calc arc path based on control points directly rather startAngle, endAngle, innerRadius,
 * outerRadius. This is not accurate and will cause bug when the range of y scale is [1, 0]
 * for cell geometry.
 */
export const Color: SC<ColorOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, inset = 0, ...style } = options;

  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { [colorAttribute]: defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const defaultLineWidth = shapeTheme.lineWidth || 1;
    const {
      stroke,
      radius = 0,
      radiusTopLeft = radius,
      radiusTopRight = radius,
      radiusBottomRight = radius,
      radiusBottomLeft = radius,
      lineWidth = colorAttribute === 'stroke' || stroke ? defaultLineWidth : 0,
    } = style;
    const { color = defaultColor } = value;

    // Render rect in non-polar coordinate.
    if (!isPolar(coordinate) && !isHelix(coordinate)) {
      const tpShape = !!isTranspose(coordinate);

      const [p0, , p2] = tpShape ? reorder(points) : points;
      const [x, y] = p0;
      const [width, height] = sub(p2, p0);
      // Deal with width or height is negative.
      const absX = width > 0 ? x : x + width;
      const absY = height > 0 ? y : y + height;
      const absWidth = Math.abs(width);
      const absHeight = Math.abs(height);

      return select(new Rect({}))
        .call(applyStyle, shapeTheme)
        .style('lineWidth', lineWidth)
        .style('x', tpShape ? absX : absX + inset)
        .style('y', tpShape ? absY + inset : absY)
        .style('width', tpShape ? absWidth : absWidth - 2 * inset)
        .style('height', tpShape ? absHeight - 2 * inset : absHeight)
        .style('stroke', color)
        .style('stroke', color || stroke)
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
    const path = arc()
      .cornerRadius(radius as number)
      .padAngle((inset * Math.PI) / 180);

    return select(new Path({}))
      .call(applyStyle, shapeTheme)
      .style('path', path(arcObject))
      .style('transform', `translate(${center[0]}, ${center[1]})`)
      .style('stroke', color || stroke)
      .style('lineWidth', lineWidth)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

// @todo Should Shape have default animations using for ordinal scale?
Color.props = {
  defaultEnterAnimation: 'scaleInY',
};

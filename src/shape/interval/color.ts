import { Path, Rect } from '@antv/g';
import { arc } from 'd3-shape';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isPolar, isHelix, isTranspose } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { sub } from '../.././utils/vector';
import {
  applyStyle,
  getArcObject,
  getShapeTheme,
  reorder,
  toOpacityKey,
} from '../utils';

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
  const {
    colorAttribute,
    opacityAttribute = 'fill',
    first = true,
    last = true,
    ...style
  } = options;

  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const {
      [colorAttribute]: defaultColor,
      radius: dftR = 0,
      ...defaults
    } = getShapeTheme(theme, mark, shape, defaultShape);

    const defaultLineWidth = defaults.lineWidth || 1;
    const {
      stroke,
      radius = dftR,
      radiusTopLeft = radius,
      radiusTopRight = radius,
      radiusBottomRight = radius,
      radiusBottomLeft = radius,
      innerRadius = 0,
      innerRadiusTopLeft = innerRadius,
      innerRadiusTopRight = innerRadius,
      innerRadiusBottomRight = innerRadius,
      innerRadiusBottomLeft = innerRadius,
      inset = 0,
      insetLeft = inset,
      insetRight = inset,
      insetBottom = inset,
      insetTop = inset,
      lineWidth = colorAttribute === 'stroke' || stroke ? defaultLineWidth : 0,
      ...rest
    } = style;
    const { color = defaultColor, opacity } = value;

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
      const finalX = absX + insetLeft;
      const finalY = absY + insetTop;
      const finalWidth = absWidth - (insetLeft + insetRight);
      const finalHeight = absHeight - (insetTop + insetBottom);

      return select(new Rect({}))
        .call(applyStyle, defaults)
        .style('lineWidth', lineWidth)
        .style('x', finalX)
        .style('y', finalY)
        .style('width', finalWidth)
        .style('height', finalHeight)
        .style('stroke', stroke === undefined ? color : stroke)
        .style(toOpacityKey(options), opacity)
        .style(colorAttribute, color)
        .style('radius', [
          first ? radiusTopLeft : innerRadiusTopLeft,
          first ? radiusTopRight : innerRadiusTopRight,
          last ? radiusBottomRight : innerRadiusBottomRight,
          last ? radiusBottomLeft : innerRadiusBottomLeft,
        ])
        .call(applyStyle, rest)
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
      .call(applyStyle, defaults)
      .style('path', path(arcObject))
      .style('transform', `translate(${center[0]}, ${center[1]})`)
      .style('stroke', color || stroke)
      .style('lineWidth', lineWidth)
      .style(colorAttribute, color)
      .style(toOpacityKey(options), opacity)
      .call(applyStyle, style)
      .node();
  };
};

// @todo Should Shape have default animations using for ordinal scale?
Color.props = {
  defaultEnterAnimation: 'scaleInY',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

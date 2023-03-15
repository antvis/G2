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

// Render rect in different coordinate.
export function rect(
  points,
  value,
  coordinate,
  style: Record<string, any> = {},
) {
  const {
    inset = 0,
    radius = 0,
    insetLeft = inset,
    insetTop = inset,
    insetRight = inset,
    insetBottom = inset,
    radiusBottomLeft = radius,
    radiusBottomRight = radius,
    radiusTopLeft = radius,
    radiusTopRight = radius,
    ...rest
  } = style;
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
      .style('x', finalX)
      .style('y', finalY)
      .style('width', finalWidth)
      .style('height', finalHeight)
      .style('radius', [
        radiusTopLeft,
        radiusTopRight,
        radiusBottomRight,
        radiusBottomLeft,
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
    .style('path', path(arcObject))
    .style('transform', `translate(${center[0]}, ${center[1]})`)
    .style('radius', radius)
    .style('inset', inset)
    .call(applyStyle, rest)
    .node();
}

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
      defaultColor,
      radius: defaultRadius = 0,
      ...defaults
    } = getShapeTheme(theme, mark, shape, defaultShape);

    const defaultLineWidth = defaults.lineWidth || 1;
    const {
      stroke,
      radius = defaultRadius,
      radiusTopLeft = radius,
      radiusTopRight = radius,
      radiusBottomRight = radius,
      radiusBottomLeft = radius,
      innerRadius = 0,
      innerRadiusTopLeft = innerRadius,
      innerRadiusTopRight = innerRadius,
      innerRadiusBottomRight = innerRadius,
      innerRadiusBottomLeft = innerRadius,
      lineWidth = colorAttribute === 'stroke' || stroke ? defaultLineWidth : 0,
      inset = 0,
      insetLeft = inset,
      insetRight = inset,
      insetBottom = inset,
      insetTop = inset,
      ...rest
    } = style;
    const { color = defaultColor, opacity } = value;

    // Extended style, which is not supported by native g shape,
    // should apply at first.
    const standardDirRadius = [
      first ? radiusTopLeft : innerRadiusTopLeft,
      first ? radiusTopRight : innerRadiusTopRight,
      last ? radiusBottomRight : innerRadiusBottomRight,
      last ? radiusBottomLeft : innerRadiusBottomLeft,
    ];
    const standardDir = [
      'radiusTopLeft',
      'radiusTopRight',
      'radiusBottomRight',
      'radiusBottomLeft',
    ];
    // Transpose: rotate it clockwise by 90.
    if (isTranspose(coordinate)) {
      standardDir.push(standardDir.shift());
    }
    const extendedStyle = {
      radius,
      ...Object.fromEntries(
        standardDir.map((d, i) => [d, standardDirRadius[i]]),
      ),
      inset,
      insetLeft,
      insetRight,
      insetBottom,
      insetTop,
    };

    return (
      select(rect(points, value, coordinate, extendedStyle))
        .call(applyStyle, defaults)
        .style('fill', 'transparent')
        .style(colorAttribute, color)
        .style(toOpacityKey(options), opacity)
        .style('lineWidth', lineWidth)
        .style('stroke', stroke === undefined ? color : stroke)
        // shape.style has higher priority.
        .call(applyStyle, rest)
        .node()
    );
  };
};

// @todo Should Shape have default animations using for ordinal scale?
Color.props = {
  defaultEnterAnimation: 'scaleInY',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

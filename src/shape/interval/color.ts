import { Path } from '@antv/g';
import { arc } from 'd3-shape';
import { path as d3path } from 'd3-path';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { isPolar, isHelix } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { applyStyle, appendPolygon, getArcObject } from '../utils';

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
    const { radius = 0 } = style;
    const { defaultColor } = theme;
    const { color = defaultColor } = value;

    // Render rect in non-polar coordinate.
    if (!isPolar(coordinate) && !isHelix(coordinate)) {
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

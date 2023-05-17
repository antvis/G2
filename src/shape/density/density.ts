import { path as d3path } from 'd3-path';
import { Path } from '@antv/g';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type DensityOptions = {
  colorAttribute: 'fill' | 'stroke';
};

/**
 * Draw density shape.
 */
export const Density: SC<DensityOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape, transform } = value;
    const { defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor } = value;
    const [first, ...p] = points;

    // todo smooth, hollow
    const path = d3path();
    path.moveTo(...first);
    p.forEach(([x, y]) => {
      path.lineTo(x, y);
    });
    path.closePath();

    return select(new Path())
      .call(applyStyle, shapeTheme)
      .style('d', path.toString())
      .style('stroke', color || defaultColor) // Always has stroke color.
      .style('fill', color || defaultColor)
      .style('fillOpacity', 0.4)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Density.props = {
  defaultMarker: 'square',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

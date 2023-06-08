import { path as d3path } from 'd3-path';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type DensityOptions = {
  colorAttribute: 'fill' | 'stroke';
};

/**
 * Draw density shape.
 */
export const Density: SC<DensityOptions> = (options, context) => {
  const { document } = context;
  return (points, value, defaults) => {
    const { transform } = value;
    const { color: defaultColor, ...rest } = defaults;
    const { color = defaultColor } = value;
    const [first, ...p] = points;

    // todo smooth, hollow
    const path = d3path();
    path.moveTo(...first);
    p.forEach(([x, y]) => {
      path.lineTo(x, y);
    });
    path.closePath();

    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path.toString())
      .style('stroke', color || defaultColor) // Always has stroke color.
      .style('fill', color || defaultColor)
      .style('fillOpacity', 0.4)
      .style('transform', transform)
      .call(applyStyle, options)
      .node();
  };
};

Density.props = {
  defaultMarker: 'square',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

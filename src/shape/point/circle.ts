import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { getRadius } from './color';

export type PointOptions = Record<string, any>;

type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  mode?: 'fixed' | 'auto' | 'normal';
  [key: string]: any;
};

/**
 * Render point in different coordinate.
 */
export const BaseCircle: SC<ColorOptions> = (options, context) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, mode = 'auto', ...style } = options;

  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { lineWidth, color: defaultColor } = defaults;
    const finalLineWidth = style.stroke ? lineWidth || 1 : lineWidth;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy] = getOrigin(points);
    const r = getRadius(mode, points, value, coordinate);
    const finalRadius = r || style.r || defaults.r;
    return select(document.createElement('circle', {}))
      .call(applyStyle, defaults)
      .style('fill', 'transparent')
      .style('cx', cx)
      .style('cy', cy)
      .style('r', finalRadius)
      .style('lineWidth', finalLineWidth)
      .style('transform', transform)
      .style('transformOrigin', `${cx} ${cy}`)
      .style('stroke', color)
      .style(toOpacityKey(options), opacity)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

/**
 * ●
 */
export const Circle: SC<PointOptions> = (options, context) => {
  return BaseCircle({ colorAttribute: 'fill', ...options }, context);
};

Circle.props = {
  defaultMarker: 'circle',
  defaultEnterAnimation: 'fadeIn',
  defaultExitAnimation: 'fadeOut',
};

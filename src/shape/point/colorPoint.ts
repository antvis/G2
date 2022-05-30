import { Path } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle } from '../utils';
import * as Symbols from './symbol';

export type ColorPointOptions = {
  colorAttribute: 'fill' | 'stroke';
  symbol: string;
  [key: string]: any;
};

/**
 * Render point in different coordinate.
 */
export const ColorPoint: SC<ColorPointOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, symbol, ...style } = options;
  const lineWidth = colorAttribute === 'stroke' ? 1 : undefined;

  const path = Symbols[symbol] || Symbols.point;

  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [[x0, y0], [x2, y2]] = points;
    const [cx, cy] = [(x0 + x2) / 2, (y0 + y2) / 2];
    const a = (x2 - x0) / 2;
    const b = (y2 - y0) / 2;
    const r = Math.max(0, (a + b) / 2);
    return select(new Path({}))
      .style('d', path(cx, cy, r))
      .style('lineWidth', lineWidth)
      .style('stroke', color)
      .style('transform', transform)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

ColorPoint.props = {
  defaultEnterAnimation: 'fadeIn',
};

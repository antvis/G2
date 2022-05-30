import { Path } from '@antv/g';
import { Coordinate, Vector2 } from '@antv/coord';
import { isFisheye } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle } from '../utils';
import * as Symbols from './symbol';

export type ColorPointOptions = {
  colorAttribute: 'fill' | 'stroke';
  symbol: string;
  mode?: 'fixed' | 'auto' | 'normal';
  [key: string]: any;
};

function getRadius(
  mode: ColorPointOptions['mode'],
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const { size } = value;
  if (mode === 'fixed') return size;
  if (mode === 'normal' || isFisheye(coordinate)) {
    const [[x0, y0], [x2, y2]] = points;
    const a = Math.abs((x2 - x0) / 2);
    const b = Math.abs((y2 - y0) / 2);
    return Math.max(0, (a + b) / 2);
  }
  return size;
}

function getOrigin(points: Vector2[]) {
  const [[x0, y0], [x2, y2]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2];
}

/**
 * Render point in different coordinate.
 */
export const ColorPoint: SC<ColorPointOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, symbol, mode = 'auto', ...style } = options;
  const lineWidth = colorAttribute === 'stroke' ? 1 : undefined;
  const path = Symbols[symbol] || Symbols.point;

  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [cx, cy] = getOrigin(points);
    const r = getRadius(mode, points, value, coordinate);
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

import { Path } from '@antv/g';
import { Coordinate, Vector2 } from '@antv/coord';
import { isFisheye } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, getShapeTheme, toOpacityKey } from '../utils';
import * as Symbols from './symbol';

export type ColorOptions = {
  colorAttribute: 'fill' | 'stroke';
  symbol: string;
  mode?: 'fixed' | 'auto' | 'normal';
  [key: string]: any;
};

function getRadius(
  mode: ColorOptions['mode'],
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  if (points.length === 1) return undefined;
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
  if (points.length === 1) return points[0];
  const [[x0, y0], [x2, y2]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2];
}

/**
 * Render point in different coordinate.
 */
export const Color: SC<ColorOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, symbol, mode = 'auto', ...style } = options;
  const path = Symbols[symbol] || Symbols.point;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { defaultColor, lineWidth, ...defaults } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const finalLineWidth = style.stroke ? lineWidth || 1 : lineWidth;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy] = getOrigin(points);
    const r = getRadius(mode, points, value, coordinate);
    const finalRadius = r || style.r || defaults.r;
    return select(new Path())
      .call(applyStyle, defaults)
      .style('d', path(cx, cy, finalRadius))
      .style('lineWidth', finalLineWidth)
      .style('transform', transform)
      .style('stroke', color)
      .style(toOpacityKey(options), opacity)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

Color.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

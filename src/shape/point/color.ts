import { Path } from '@antv/g';
import { Coordinate, Vector2 } from '@antv/coord';
import { isFisheye } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, getShapeTheme } from '../utils';
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
export const Color: SC<ColorOptions> = (options) => {
  // Render border only when colorAttribute is stroke.
  const { colorAttribute, symbol, mode = 'auto', ...style } = options;
  const defaultSize = colorAttribute === 'stroke' ? 1 : 0;
  const path = Symbols[symbol] || Symbols.point;

  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const {
      [colorAttribute]: defaultColor,
      lineWidth = defaultSize,
      ...shapeTheme
    } = getShapeTheme(theme, mark, shape, defaultShape);

    const { color = defaultColor, transform } = value;
    const [cx, cy] = getOrigin(points);
    const r = getRadius(mode, points, value, coordinate);
    return select(new Path())
      .call(applyStyle, shapeTheme)
      .style('d', path(cx, cy, r))
      .style('lineWidth', lineWidth)
      .style('stroke', color)
      .style('transform', transform)
      .style(colorAttribute, color)
      .call(applyStyle, style)
      .node();
  };
};

Color.props = {
  defaultEnterAnimation: 'fadeIn',
};

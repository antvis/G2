import { Coordinate } from '@antv/coord';
import { Text } from '@antv/g';
import { select } from '../../utils/selection';
import { G2Theme, ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle, getArcObject } from '../../shape/utils';
import { isTranspose, isCircular } from '../../utils/coordinate';

type LabelPosition =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'inside'
  | 'outside';

export type LabelOptions = Record<string, any>;

function inferPosition(position: LabelPosition, coordinate: Coordinate) {
  if (position !== undefined) return position;
  if (isCircular(coordinate)) return 'inside';
  if (isTranspose(coordinate)) return 'right';
  return 'top';
}

function maybePercentage(x: number | string, size: number) {
  if (x === undefined) return null;
  if (typeof x === 'number') return x;
  const px = +x.replace('%', '');
  return Number.isNaN(px) ? null : (px / 100) * size;
}

function inferNonCircularStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const { bounds } = value;
  const [[x0, y0], [x1, y1]] = bounds;
  const w = x1 - x0;
  const h = y1 - y0;
  const xy = (options) => {
    const { x: ox, y: oy } = options;
    const px = maybePercentage(value.x, w);
    const py = maybePercentage(value.y, h);
    return {
      ...options,
      x: (px || ox) + x0,
      y: (py || oy) + y0,
    };
  };
  // 4 direction.
  if (position === 'left')
    return xy({ x: 0, y: h / 2, textAnchor: 'start', textBaseline: 'middle' });
  if (position === 'right')
    return xy({ x: w, y: h / 2, textAnchor: 'end', textBaseline: 'middle' });
  if (position === 'top')
    return xy({ x: w / 2, y: 0, textAnchor: 'center', textBaseline: 'top' });
  if (position === 'bottom')
    return xy({ x: w / 2, y: h, textAnchor: 'center', textBaseline: 'bottom' });
  // 4 corner position.
  if (position === 'top-left')
    return xy({ x: 0, y: 0, textAnchor: 'start', textBaseline: 'top' });
  if (position === 'top-right')
    return xy({ x: w, y: 0, textAnchor: 'end', textBaseline: 'top' });
  if (position === 'bottom-left')
    return xy({ x: 0, y: h, textAnchor: 'start', textBaseline: 'bottom' });
  if (position === 'bottom-right')
    return xy({ x: w, y: h, textAnchor: 'end', textBaseline: 'bottom' });
  if (position === 'inside')
    return xy({
      x: w / 2,
      y: h / 2,
      textAnchor: 'center',
      textBaseline: 'middle',
    });
  return xy({});
}

function inferCircularStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  // Infer the label position in polar coordinate.
  const { y, y1 } = value;
  const arcObject = getArcObject(coordinate, points, [y, y1]);

  const { startAngle, endAngle, innerRadius, outerRadius } = arcObject;
  const midAngle = (startAngle + endAngle) / 2;

  const center = coordinate.getCenter() as Vector2;

  const offset = position === 'inside' ? 0 : 12;
  const { radius: radiusRatio = 0.5 } = value;
  const radius =
    position === 'inside'
      ? innerRadius + (outerRadius - innerRadius) * radiusRatio
      : outerRadius;
  const finalRadius = radius + offset;

  return {
    x: center[0] + Math.sin(midAngle) * finalRadius,
    y: center[1] - Math.cos(midAngle) * finalRadius,
    textAlign: 'center',
    textBaseline: 'middle',
  };
}

function getDefaultStyle(
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
): Record<string, any> {
  const { bounds } = value;
  // For series mark, such as line and area.
  // The bounds for text is defined with only one point.
  // Use this point as the label position.
  if (bounds.length === 1) {
    const [p] = bounds;
    return {
      ...theme['label'],
      x: p[0],
      y: p[1],
    };
  }

  // For non-seres mark, calc position for label based on
  // position and the bounds of shape.
  const { position } = value;
  const p = inferPosition(position, coordinate);
  const inferDefaultStyle = isCircular(coordinate)
    ? inferCircularStyle
    : inferNonCircularStyle;
  return {
    ...inferDefaultStyle(p, points, value, coordinate),
    ...theme[p === 'inside' ? 'innerLabel' : 'label'],
  };
}

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options) => {
  return (points, value, coordinate, theme) => {
    const { text, x, y, ...overrideStyle } = value;
    const defaultStyle = getDefaultStyle(points, value, coordinate, theme);
    return select(new Text())
      .call(applyStyle, defaultStyle)
      .style('text', `${text}`)
      .call(applyStyle, overrideStyle)
      .node();
  };
};

Label.props = {};

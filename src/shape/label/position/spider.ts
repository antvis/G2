import { Coordinate } from '@antv/coord';
import { sort } from 'd3-array';
import { Vector2 } from '../../../runtime';
import { isCircular } from '../../../utils/coordinate';
import { LabelPosition } from './default';
import { inferOutsideCircularStyle, radiusOf, angleOf } from './outside';

const styleByPoints = new WeakMap();

function compute(
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const { connectorLength, connectorLength2, connectorDistance } = value;
  const { ...style }: any = inferOutsideCircularStyle(
    'outside',
    points,
    value,
    coordinate,
  );
  const center = coordinate.getCenter();
  const radius = radiusOf(points, value, coordinate);
  const angle = angleOf(points, value, coordinate);
  const radius1 = radius + connectorLength + connectorLength2;
  const sign = Math.sin(angle) > 0 ? 1 : -1;
  const newX = center[0] + (radius1 + +connectorDistance) * sign;
  const { x: originX } = style;
  const dx = newX - originX;
  style.x += dx;
  style.connectorPoints[0][0] -= dx;
  return style;
}

// TODO: optimize
function dodgeY(
  styles: Record<string, any>[],
  options: Record<string, any> = {},
) {
  const { labelHeight = 15 } = options;
  const sortedStyles = sort(styles, (d) => d.y);
  let preY = -labelHeight;
  for (let i = 0; i < sortedStyles.length; ++i) {
    const cur = sortedStyles[i];
    const nextY = preY + labelHeight;
    const dy = Math.max(0, nextY - cur.y);
    cur.labelOffsetY = dy;
    preY = cur.y + dy;
  }
}

/**
 * Spider label transform only suitable for the labels in polar coordinate,
 * labels should distinguish coordinate type.
 */
export function spider(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
  options: Record<string, any>,
  labels: Vector2[][],
) {
  if (!isCircular(coordinate)) return {};
  if (styleByPoints.has(points)) return styleByPoints.get(points);
  const styles = labels.map((points) => compute(points, value, coordinate));
  const { width } = coordinate.getOptions();
  const left = styles.filter((d) => d.x < width / 2);
  const right = styles.filter((d) => d.x >= width / 2);
  dodgeY(left, options);
  dodgeY(right, options);
  styles.forEach((style, i) => styleByPoints.set(labels[i], style));
  return styleByPoints.get(points);
}

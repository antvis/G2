import { Coordinate } from '@antv/coord';
import { Vector2 } from '../../../runtime';
import { isCircular } from '../../../utils/coordinate';
import { LabelPosition } from './default';
import { inferOutsideCircularStyle, radiusOf, angleOf } from './outside';
import { hideAndDodgeY } from './utils';

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
  const computed = labels.map((points) => compute(points, value, coordinate));
  const { width, height } = coordinate.getOptions();
  const left = computed.filter((d) => d.x < width / 2);
  const right = computed.filter((d) => d.x >= width / 2);
  const extendedOptions = { ...options, height };
  hideAndDodgeY(left, extendedOptions);
  hideAndDodgeY(right, extendedOptions);
  computed.forEach((style, i) => styleByPoints.set(labels[i], style));
  return styleByPoints.get(points);
}

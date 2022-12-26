import { Coordinate } from '@antv/coord';
import { Vector2 } from '../../../runtime';
import { isCircular } from '../../../utils/coordinate';
import { LabelPosition } from './default';
import { inferOutsideCircularStyle, radiusOf, angleOf } from './outside';

/**
 * Spider label transform only suitable for the labels in polar coordinate, labels should distinguish coordinate type.
 */
export function spider(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  if (!isCircular(coordinate)) return {};
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

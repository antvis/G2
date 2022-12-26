import { Coordinate } from '@antv/coord';
import { Vector2 } from '../../../runtime';
import { getRadius, isCircular } from '../../../utils/coordinate';
import { angleWithQuadrant } from '../../../utils/vector';
import { LabelPosition, pointOfArc } from './default';
import { inferOutsideCircularStyle } from './outside';

/**
 * Surround label transform is used to make labels surround circular.
 */
export function surround(
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
  const { x0, y0 } = style;

  const center = coordinate.getCenter();
  const radius = getRadius(coordinate);
  const radius1 = radius + connectorLength;
  const angle = angleWithQuadrant([x0 - center[0], y0 - center[1]]);
  const sign = Math.sin(angle) > 0 ? 1 : -1;

  const [newX, newY] = pointOfArc(center, angle, radius1);

  style.x = newX + (connectorLength2 + connectorDistance) * sign;
  style.y = newY;

  return style;
}

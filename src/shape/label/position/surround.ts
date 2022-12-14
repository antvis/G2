import { Coordinate } from '@antv/coord';
import { PolarCoordinate } from 'spec';
import { Vector2 } from '../../../runtime';
import { getRadius, isCircular } from '../../../utils/coordinate';
import { angleWithQuadrant } from '../../../utils/vector';
import { inferCircularStyle, LabelPosition } from './default';

/**
 * Surround label transform is used to make labels surround circular.
 */
export function surround(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
  options,
) {
  if (!isCircular(coordinate)) return {};

  const { offset = 12 } = options;
  const { ...style }: any = inferCircularStyle(
    'outside',
    points,
    value,
    coordinate,
  );
  const center = coordinate.getCenter();
  const radius = getRadius(coordinate) + offset;

  const { x0, y0, connector, connectorLength2 = 0 } = style;
  const labelAngle = angleWithQuadrant([x0 - center[0], y0 - center[1]]);
  const length2 = connector
    ? connectorLength2 * (Math.sin(labelAngle) < 0 ? -1 : 1)
    : 0;
  const newX = center[0] + Math.sin(labelAngle) * radius;
  const newY = center[1] - Math.cos(labelAngle) * radius;
  style.x = newX + length2;
  style.y = newY;
  style.connectorPoints = [[-length2, 0]];

  return style;
}

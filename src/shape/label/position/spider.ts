import { Coordinate } from '@antv/coord';
import { sub } from '../../../utils/vector';
import { Vector2 } from '../../../runtime';
import { isCircular } from '../../../utils/coordinate';
import { maybePercentage } from '../../../utils/helper';
import { inferCircularStyle, LabelPosition } from './default';

/**
 * Spider label transform only suitable for the labels in polar coordinate, labels should distinguish coordinate type.
 */
export function spider(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
  options,
) {
  if (!isCircular(coordinate)) return {};
  const { edgeDistance = 0 } = options;

  const { ...style }: any = inferCircularStyle(
    'outside',
    points,
    value,
    coordinate,
  );
  const { x: coordX, width } = coordinate.getOptions();
  const center = coordinate.getCenter();
  // todo: How to configure spider.
  const margin = maybePercentage(edgeDistance, width);

  const edgeX = coordX + margin;
  const edgeX1 = coordX + width - margin;

  const { x: originX, x0, y0 } = style;
  const dx = originX <= center[0] ? edgeX - originX : edgeX1 - originX;
  style.x += dx;

  const { x, y } = style;
  const p0 = sub([x0, y0], center);
  const p1 = sub([0, y], center);
  const p1x = p0[1] ? (p0[0] * p1[1]) / p0[1] + center[0] : x;
  style.connectorPoints = [[p1x - x, 0]];

  return style;
}

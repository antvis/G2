import { Coordinate } from '@antv/coord';
import { Vector2 } from '../../../runtime';
import { getArcObject } from '../../../shape/utils';
import { isCircular, isRadial } from '../../../utils/coordinate';
import { maybePercentage } from '../../../utils/helper';
import { mid } from '../../../utils/vector';

export type LabelPosition =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'inside'
  | 'outside'
  | 'area'
  | 'spider'
  | 'surround';

export function inferNonCircularStyle(
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
  // default return 'inside'
  return xy({
    x: w / 2,
    y: h / 2,
    textAnchor: 'center',
    textBaseline: 'middle',
  });
}

export function inferRadialStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const { y, y1, autoRotate, rotateToAlignArc } = value;
  const center = coordinate.getCenter();
  const arcObject = getArcObject(coordinate, points, [y, y1]);

  const { innerRadius, outerRadius, startAngle, endAngle } = arcObject;
  const angle = position === 'inside' ? (startAngle + endAngle) / 2 : endAngle;
  const rotate = inferRotation(angle, autoRotate, rotateToAlignArc);

  const point = (() => {
    const [p0, p1] = points;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const [x, y] =
      position === 'inside' ? arcPoint(center, angle, radius) : mid(p0, p1);
    return { x, y };
  })();

  return {
    ...point,
    textAlign: position === 'inside' ? 'center' : 'start',
    textBaseline: 'middle',
    rotate,
  };
}

function arcPoint(center: Vector2, angle: number, radius: number): Vector2 {
  return [
    center[0] + Math.sin(angle) * radius,
    center[1] - Math.cos(angle) * radius,
  ];
}

function inferRotation(
  angle: number,
  autoRotate: boolean,
  rotateToAlignArc: boolean,
) {
  if (!autoRotate) return 0;

  const append = rotateToAlignArc ? 0 : Math.sin(angle) < 0 ? 90 : -90;
  return (angle / Math.PI) * 180 + append;
}

export function inferCircularStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const {
    y,
    y1,
    autoRotate,
    rotateToAlignArc,
    connector = true,
    connectorLength2 = 0,
    connectorDistance = 0,
    radius: radiusRatio = 0.5,
    offset = 0,
  } = value;
  const arcObject = getArcObject(coordinate, points, [y, y1]);
  const { startAngle, endAngle } = arcObject;
  const center = coordinate.getCenter();

  const angle = (startAngle + endAngle) / 2;

  const textStyle = (position: string, sign: boolean) => {
    const rotate = inferRotation(angle, autoRotate, rotateToAlignArc);
    if (position === 'inside')
      return { textAlign: 'center', textBaseline: 'middle', rotate };
    return {
      textAlign: sign ? 'start' : 'end',
      textBaseline: 'middle',
      rotate,
    };
  };
  const [r0, r1] = (() => {
    const ratio = position === 'inside' ? radiusRatio : 1;
    const { innerRadius, outerRadius } = arcObject;
    const r0 = innerRadius + (outerRadius - innerRadius) * ratio;
    const r1 = r0 + offset;
    return [r0, r1];
  })();
  const sign = Math.sin(angle) > 0 ? 1 : -1;

  const [p0, p1, ...connectorPoints] = ((
    radius: number,
    finalRadius: number,
  ) => {
    const [x0, y0] = arcPoint(center, angle, radius);
    const [x, y] = arcPoint(center, angle, finalRadius);
    const length2 = connector ? sign * connectorLength2 : 0;
    const p0 = [x0, y0];
    const p1 = [x + length2, y];
    return [p0, p1, [-length2, 0]] as Vector2[];
  })(r0, r1);

  const connectorStyle = {
    connector,
    connectorPoints,
    dx: connector ? +connectorDistance * sign : 0,
  };

  const toPoint = (v: Vector2, x = 'x', y = 'y') => ({ [x]: v[0], [y]: v[1] });

  return {
    ...toPoint(p0, 'x0', 'y0'),
    ...toPoint(p1),
    ...textStyle(position, sign > 0 || isRadial(coordinate)),
    ...connectorStyle,
  };
}

function inferIdentityStyle(position, points, value, coordinate) {
  const { bounds } = value;
  const [p] = bounds;
  return {
    x: p[0],
    y: p[1],
  };
}

export function getDefaultStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const { bounds } = value;
  // When bounds.length = 1
  // For series mark, such as line and area.
  // The bounds for text is defined with only one point.
  // Use this point as the label position.
  if (bounds.length === 1) {
    return inferIdentityStyle(position, points, value, coordinate);
  }

  const inferDefaultStyle = isRadial(coordinate)
    ? inferRadialStyle
    : isCircular(coordinate)
    ? inferCircularStyle
    : inferNonCircularStyle;

  return inferDefaultStyle(position, points, value, coordinate);
}

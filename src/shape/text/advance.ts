import { Vector2 } from '@antv/coord';
import {
  DisplayObject,
  Text as GText,
  Rect,
  TextStyleProps,
  RectStyleProps,
  PathStyleProps,
} from '@antv/g';
import { isNumber } from '@antv/util';
import { Marker } from '@antv/component';
import { line } from 'd3-shape';
import { WithPrefix } from '../../runtime';
import { createElement } from '../../utils/createElement';
import { applyStyle } from '../utils';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { dist } from '../../utils/vector';

type BackgroundStyleProps = WithPrefix<
  RectStyleProps & { padding?: number[]; radius?: number },
  'background'
>;

type ConnectorStyleProps = WithPrefix<
  PathStyleProps & { points?: Vector2[] },
  'connector'
>;

type MarkerStyleProps<P extends string> = WithPrefix<Record<string, any>, P>;

type TextShapeStyleProps = Omit<TextStyleProps, 'text'> &
  ConnectorStyleProps &
  BackgroundStyleProps &
  MarkerStyleProps<'startMarker'> &
  MarkerStyleProps<'endMarker'> & {
    id: string;
    className?: string;
    x0?: number; // x0 represents the x position of relative point, default is equal to x
    y0?: number;
    coordCenter?: Vector2; // center of coordinate
    background?: boolean;
    connector?: boolean;
    startMarker?: boolean;
    endMarker?: boolean;
    labelTransform?: string;
    labelTransformOrigin?: string;
    rotate?: number;
    innerHTML?: string | HTMLElement;
    text?: string;
  };

function getConnectorPoint(shape: GText | Rect) {
  const {
    min: [x0, y0],
    max: [x1, y1],
  } = shape.getLocalBounds();
  let x = 0;
  let y = 0;
  if (x0 > 0) x = x0;
  if (x1 < 0) x = x1;
  if (y0 > 0) y = y0;
  if (y1 < 0) y = y1;

  return [x, y];
}

function inferBackgroundBounds(textShape: DisplayObject, padding = []) {
  const [top = 0, right = 0, bottom = top, left = right] = padding;
  const container = textShape.parentNode as DisplayObject;

  const angle = container.getEulerAngles();
  container.setEulerAngles(0);
  const { min, halfExtents } = textShape.getLocalBounds();
  const [x, y] = min;
  const [hw, hh] = halfExtents;
  container.setEulerAngles(angle);

  return {
    x: x - left,
    y: y - top,
    width: hw * 2 + left + right,
    height: hh * 2 + top + bottom,
  };
}

const cos = (p0: Vector2, p1: Vector2, p2: Vector2) => {
  const a = dist(p0, p1);
  const b = dist(p1, p2);
  const c = dist(p2, p0);
  return (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);
};

function inferConnectorPath(
  shape: DisplayObject,
  points: Vector2[],
  controlPoints: Vector2[],
  coordCenter,
) {
  const [[x0, y0], [x1, y1]] = points;
  const [x, y] = getConnectorPoint(shape);
  // Straight connector line.
  if (x0 === x1 && y0 === y1) {
    return line()([
      [0, 0],
      [x, y],
    ]);
  }

  const P: any = [[x0 - x1, y0 - y1]].concat(
    controlPoints.length ? controlPoints : [[0, 0]],
  );

  const p0 = [coordCenter[0] - x1, coordCenter[1] - y1] as Vector2;
  const [p1, p2] = P;
  // If angle is smaller than 90, which will cause connector overlap with element.
  if (cos(p0, p1, p2) > 0) {
    const x2 = (() => {
      const { min, max } = shape.getLocalBounds();
      // A(x1,y2) perpendicular to B(x2,y2) => x1*x2 + y1*y2 = 0
      const vx = p1[0] + ((p1[1] - p0[1]) * (p1[1] - 0)) / (p1[0] - p0[0]);
      if (max[0] < p0[0]) return Math.min(max[0], vx);
      return Math.max(min[0], vx);
    })();
    P.splice(1, 1, [x2, 0]);
  }

  return line()(P);
}

export const Advance = createElement((g) => {
  const {
    className,
    // Do not pass className
    class: _c,
    transform,
    rotate,
    labelTransform,
    labelTransformOrigin,
    x,
    y,
    x0 = x,
    y0 = y,
    text,
    background,
    connector,
    startMarker,
    endMarker,
    coordCenter,
    innerHTML,
    ...rest
  } = g.attributes as TextShapeStyleProps;

  g.style.transform = `translate(${x}, ${y})`;

  // Position is invalid, do not render the UI,
  // or clear previous elements.
  if ([x, y, x0, y0].some((v) => !isNumber(v))) {
    g.children.forEach((d) => d.remove());
    return;
  }

  const { padding, ...backgroundStyle } = subObject(rest, 'background');
  const { points = [], ...connectorStyle } = subObject(rest, 'connector');
  const endPoints: Vector2[] = [
    [+x0, +y0],
    [+x, +y],
  ];

  let textShape;
  // Use html to customize advance text.
  if (innerHTML) {
    textShape = select(g)
      .maybeAppend('html', 'html', className)
      .style('zIndex', 0)
      .style('innerHTML', innerHTML)
      .call(applyStyle, {
        transform: labelTransform,
        transformOrigin: labelTransformOrigin,
        ...rest,
      })
      .node();
  } else {
    textShape = select(g)
      .maybeAppend('text', 'text')
      .style('zIndex', 0)
      .style('text', text)
      .call(applyStyle, {
        textBaseline: 'middle',
        transform: labelTransform,
        transformOrigin: labelTransformOrigin,
        ...rest,
      })
      .node();
  }

  const rect = select(g)
    .maybeAppend('background', 'rect')
    .style('zIndex', -1)
    .call(applyStyle, inferBackgroundBounds(textShape, padding))
    .call(applyStyle, background ? backgroundStyle : {})
    .node();

  const connectorPath = inferConnectorPath(
    rect,
    endPoints,
    points,
    coordCenter,
  );
  const markerStart =
    startMarker &&
    new Marker({
      id: 'startMarker',
      style: { x: 0, y: 0, ...(subObject(rest, 'startMarker') as any) },
    });
  const markerEnd =
    endMarker &&
    new Marker({
      id: 'endMarker',
      style: { x: 0, y: 0, ...(subObject(rest, 'endMarker') as any) },
    });
  select(g)
    .maybeAppend('connector', 'path')
    .style('zIndex', 0)
    .style('d', connectorPath)
    .style('markerStart', markerStart)
    .style('markerEnd', markerEnd)
    .call(applyStyle, connector ? connectorStyle : {});
});

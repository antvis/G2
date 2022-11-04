import {
  Text as GText,
  TextStyleProps,
  Rect,
  RectStyleProps,
  PathStyleProps,
  DisplayObject,
} from '@antv/g';
import { Marker } from '@antv/gui';
import { ShapeComponent as SC, Vector2, WithPrefix } from '../../runtime';
import { createElement } from '../../shape/createElement';
import { applyStyle, getShapeTheme } from '../../shape/utils';
import { lastOf } from '../../utils/array';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';

export type TextOptions = TextShapeStyleProps & Record<string, any>;

type BackgroundStyleProps = WithPrefix<
  RectStyleProps & { padding?: number[]; radius?: number },
  'background'
>;

type ConnectorStyleProps = WithPrefix<
  PathStyleProps & { distance?: number; points?: Vector2[] },
  'connector'
>;

type MarkerStyleProps<P extends string> = WithPrefix<Record<string, any>, P>;

type TextShapeStyleProps = Omit<TextStyleProps, 'text'> &
  ConnectorStyleProps &
  BackgroundStyleProps &
  MarkerStyleProps<'startMarker'> &
  MarkerStyleProps<'endMarker'> & {
    basePoint?: Vector2;
    background?: boolean;
    connector?: boolean;
    startMarker?: boolean;
    endMarker?: boolean;
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

function inferConnectorPath(
  shape: DisplayObject,
  point: Vector2,
  controlPoints: Vector2[],
  distance = 0,
) {
  const [x0, y0] = point;
  const [x1, y1] = getConnectorPoint(shape);

  const sign = x1 < x0 ? 1 : -1;
  return [['M', x0, y0]]
    .concat(controlPoints.map(([x, y]) => ['L', x, y]))
    .concat([['L', x1 + sign * distance, y1]]);
}

const TextShape = createElement((g) => {
  const {
    // Do not pass className
    class: className,
    transform,
    rotate,
    x,
    y,
    basePoint = [x, y],
    background,
    connector,
    startMarker,
    endMarker,
    ...rest
  } = g.attributes;
  const { padding, ...backgroundStyle } = subObject(rest, 'background');
  const {
    distance,
    points = [],
    ...connectorStyle
  } = subObject(rest, 'connector');
  const point: Vector2 = [basePoint[0] - +x, basePoint[1] - +y];

  const shape1 = select(g)
    .maybeAppend('text', 'text')
    .call(applyStyle, rest)
    .node();

  const shape2 = select(g)
    .maybeAppend('background', 'rect')
    .style('zIndex', -1)
    .call(applyStyle, inferBackgroundBounds(shape1, padding))
    .call(applyStyle, background ? backgroundStyle : {})
    .node();

  const connectorPath = inferConnectorPath(shape2, point, points, distance);
  select(g)
    .maybeAppend('connector', 'path')
    .style('path', connectorPath)
    .call(applyStyle, connector ? connectorStyle : {});

  const marker1 = subObject(rest, 'startMarker');
  select(g)
    .maybeAppend('startMarker', () => new Marker({}))
    .call((selection) => (selection.node() as Marker).update(marker1))
    .call((selection) => !startMarker && selection.node().remove());

  const [x1 = 0, y1 = 0] = lastOf(connectorPath).slice(1);
  const marker2 = subObject(rest, 'endMarker');
  select(g)
    .maybeAppend('endMarker', () => new Marker({}))
    .call((selection) =>
      (selection.node() as Marker).update({ ...marker2, x: x1, y: y1 }),
    )
    .call((selection) => !endMarker && selection.node().remove());
});

/**
 * todo autoRotate when in polar coordinate
 */
export const Text: SC<TextOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const shapeTheme = getShapeTheme(theme, mark, shape, defaultShape);
    const { color, text = '', fontSize, rotate = 0, transform = '' } = value;

    const textStyle = {
      text: String(text),
      stroke: color,
      fill: color,
      fontSize,
    };

    const [[x0, y0]] = points;

    return select(new TextShape())
      .style('x', x0)
      .style('y', y0)
      .call(applyStyle, shapeTheme)
      .style('transform', `${transform}rotate(${+rotate}deg)`)
      .call(applyStyle, textStyle)
      .call(applyStyle, style)
      .node();
  };
};

Text.props = {
  defaultEnterAnimation: 'fadeIn',
};

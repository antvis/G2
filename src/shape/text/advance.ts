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

function getConnectorPoint(shape: GText | Rect): [number, number] {
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

// A path from element to label.
// Adapted drawLabelLine from https://github.com/antvis/G2/blob/master/src/geometry/label/layout/pie/spider.ts
function inferConnectorPath(
  shape: DisplayObject,
  end: Vector2,
  control: Vector2[],
  coordCenter: Vector2,
  left = true,
  top = true,
) {
  const path = (points) => line()(points);

  if (!end[0] && !end[1]) return path([getConnectorPoint(shape), end]);
  if (!control.length) return path([[0, 0], end]);

  const [inflection, start] = control;
  const p1 = [...start];
  const p2 = [...inflection];

  // Label has been adjusted, so add offset to the label.
  if (start[0] !== inflection[0]) {
    const offset = left ? -4 : 4;
    p1[1] = start[1];

    // For the label in the first quadrant.
    if (top && !left) {
      p1[0] = Math.max(inflection[0], start[0] - offset);
      if (start[1] < inflection[1]) {
        p2[1] = p1[1];
      } else {
        p2[1] = inflection[1];
        p2[0] = Math.max(p2[0], p1[0] - offset);
      }
    }

    // For the label in the second quadrant.
    if (!top && !left) {
      p1[0] = Math.max(inflection[0], start[0] - offset);
      if (start[1] > inflection[1]) {
        p2[1] = p1[1];
      } else {
        p2[1] = inflection[1];
        p2[0] = Math.max(p2[0], p1[0] - offset);
      }
    }

    // For the label in the third quadrant.
    if (!top && left) {
      p1[0] = Math.min(inflection[0], start[0] - offset);
      if (start[1] > inflection[1]) {
        p2[1] = p1[1];
      } else {
        p2[1] = inflection[1];
        p2[0] = Math.min(p2[0], p1[0] - offset);
      }
    }

    // For the label in the fourth quadrant.
    if (top && left) {
      p1[0] = Math.min(inflection[0], start[0] - offset);
      if (start[1] < inflection[1]) {
        p2[1] = p1[1];
      } else {
        p2[1] = inflection[1];
        p2[0] = Math.min(p2[0], p1[0] - offset);
      }
    }
  }

  return path([start, p1, p2, inflection, end]);
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
  const { points: controlPoints = [], ...connectorStyle } = subObject(
    rest,
    'connector',
  );

  let textShape;
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

  const left = +x0 < coordCenter[0];
  const top = +y0 < coordCenter[1];
  const end: [number, number] = [+x0 - +x, +y0 - +y];
  const connectorPath = inferConnectorPath(
    rect,
    end,
    controlPoints,
    coordCenter,
    left,
    top,
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

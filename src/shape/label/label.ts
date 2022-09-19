import { Coordinate, Vector } from '@antv/coord';
import { DisplayObject, Text } from '@antv/g';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle, getArcObject } from '../../shape/utils';
import {
  isHelix,
  isPolar,
  isTranspose,
  isCircular,
} from '../../utils/coordinate';

type LabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside';

export type LabelOptions = Record<string, any>;

/**
 * Avoid getting error bounds caused by element animations.
 * @todo Remove this temporary handle method, if runtime supports
 * correct process: drawElement, do label layout and then do
 * transitions together.
 */
function getLocalBounds(element: DisplayObject) {
  const cloneElement = element.cloneNode();
  const animations = element.getAnimations();
  cloneElement.style.visibility = 'hidden';
  animations.forEach((animation) => {
    const keyframes = animation.effect.getKeyframes();
    cloneElement.attr(keyframes[keyframes.length - 1]);
  });
  element.parentNode.appendChild(cloneElement);
  const bounds = cloneElement.getLocalBounds();
  cloneElement.destroy();
  return bounds;
}

function inferPosition(position: LabelPosition, coordinate: Coordinate) {
  if (position !== undefined) return position;
  if (isTranspose(coordinate)) return 'right';
  if (isPolar(coordinate) || isHelix(coordinate)) return 'inside';
  return 'top';
}

function maybePercentage(x: number | string, size: number) {
  if (x === undefined) return null;
  if (typeof x === 'number') return x;
  const px = +x.replace('%', '');
  return Number.isNaN(px) ? null : (px / 100) * size;
}

function inferNonCircularStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const element: DisplayObject = value.element;
  const { halfExtents } = getLocalBounds(element);
  const w = halfExtents[0] * 2;
  const h = halfExtents[1] * 2;
  const xy = (options) => {
    const { x, y } = value;
    const px = maybePercentage(x, w);
    const py = maybePercentage(y, h);
    return {
      ...options,
      ...(px !== null && { x }),
      ...(py !== null && { y }),
    };
  };
  if (position === 'left')
    return xy({ x: 0, y: h / 2, textAnchor: 'start', textBaseline: 'middle' });
  if (position === 'right')
    return xy({ x: w, y: h / 2, textAnchor: 'end', textBaseline: 'middle' });
  if (position === 'bottom')
    return xy({ x: w / 2, y: h, textAnchor: 'center', textBaseline: 'bottom' });
  if (position === 'inside')
    return xy({
      x: w / 2,
      y: h / 2,
      textAnchor: 'center',
      textBaseline: 'middle',
    });
  if (position === 'top')
    return xy({ x: w / 2, y: 0, textAnchor: 'center', textBaseline: 'bottom' });
  return xy({});
}

function inferCircularStyle(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const element: DisplayObject = value.element;
  const { min } = getLocalBounds(element);
  const [x0, y0] = min;

  // Infer the label position in polar coordinate.
  const { y, y1 } = value;
  const arcObject = getArcObject(coordinate, points, [y, y1]);

  const { startAngle, endAngle, innerRadius, outerRadius } = arcObject;
  const midAngle = (startAngle + endAngle) / 2;

  const center = coordinate.getCenter() as Vector2;

  // @todo Support config by label.offset
  const offset = position === 'inside' ? 0 : 12;
  const radius =
    (position === 'inside' ? (innerRadius + outerRadius) / 2 : outerRadius) +
    offset;

  return {
    x: center[0] + Math.sin(midAngle) * radius - x0,
    y: center[1] - Math.cos(midAngle) * radius - y0,
    textAlign: 'center',
    textBaseline: 'middle',
  };
}

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options) => {
  return (points, value, coordinate, theme) => {
    const { position, text, ...overrideStyle } = value;
    const { labelFill: fill } = theme;
    const definedPosition = inferPosition(position, coordinate);
    const inferDefaultStyle = isCircular(coordinate)
      ? inferCircularStyle
      : inferNonCircularStyle;
    const defaultStyle = inferDefaultStyle(
      definedPosition,
      points,
      value,
      coordinate,
    );
    return select(new Text())
      .call(applyStyle, defaultStyle)
      .style('text', `${text}`)
      .style('fontSize', 12)
      .style('fill', fill)
      .call(applyStyle, overrideStyle)
      .node();
  };
};

Label.props = {};

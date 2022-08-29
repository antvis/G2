import { Coordinate } from '@antv/coord';
import { DisplayObject, Text } from '@antv/g';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { isHelix, isPolar, isTranspose } from '../../utils/coordinate';
import { angle, sub, dist } from '../../utils/vector';

type LabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside';

export type LabelOptions = Record<string, any>;

function reorder(points: Vector2[]): Vector2[] {
  const [p0, p1, p2, p3] = points;
  return [p1, p2, p3, p0];
}

/**
 * Avoid getting error bounds caused by element animations.
 * @todo Remove this temporary handle method, if runtime supports correct process: drawElement, do label layout and then do transitions together.
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

function inferPosition(
  points: Vector2[],
  value,
  coordinate: Coordinate,
  position: LabelPosition,
) {
  const element: DisplayObject = value.element;
  const { min, halfExtents } = getLocalBounds(element);
  const [x0, y0] = min;
  // Infer the label position in non-polar coordinate.
  if (!isPolar(coordinate) && !isHelix(coordinate)) {
    const w = halfExtents[0] * 2;
    const h = halfExtents[1] * 2;

    if (position === 'left') return { x: 0, y: h / 2 };
    if (position === 'right') return { x: w, y: h / 2 };
    if (position === 'bottom') return { x: w / 2, y: h };
    if (position === 'inside') return { x: w / 2, y: h / 2 };

    return { x: w / 2, y: 0 };
  }

  // Infer the label position in polar coordinate.
  const [p0, p1, , p3] = isTranspose(coordinate) ? reorder(points) : points;
  const { y, y1 } = value;
  const center = coordinate.getCenter() as Vector2;
  const a1 = angle(sub(p0, center));
  const a2 = angle(sub(p1, center));
  // There are two situations that a2 === a1:
  // 1. a1 - a2 = 0
  // 2. |a1 - a2| = Math.PI * 2
  // Distinguish them by y and y1:
  const a3 = a2 === a1 && y !== y1 ? a2 + Math.PI * 2 : a2;
  const startAngle = a1;
  const endAngle = a3 - a1 >= 0 ? a3 : Math.PI * 2 + a3;
  const midAngle = (startAngle + endAngle) / 2 + Math.PI / 2;
  // InnerRadius is equal to dist(p3, center), and outerRadius is equal to dist(p0, center).
  const radius = (dist(p3, center) + dist(p0, center)) / 2;

  return {
    x: center[0] + Math.cos(midAngle) * radius - x0,
    y: center[1] + Math.sin(midAngle) * radius - y0,
  };
}

function inferDefaultStyle(position: LabelPosition): {
  dy?: string;
  textBaseline?: string;
} {
  if (position === 'left' || position === 'right' || position === 'inside') {
    return { textBaseline: 'middle' };
  }

  return { dy: '-2px' };
}

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options) => {
  const { label: style = {} } = options;
  return (points, value, coordinate, theme) => {
    const { position, ...restStyle } = style;
    const { labelFill: fill } = theme;

    const { x, y } = inferPosition(points, value, coordinate, position);
    const { label } = value;
    const defaultStyle = inferDefaultStyle(position);
    return select(new Text())
      .style('x', x)
      .style('y', y)
      .style('text', `${label}`)
      .style('fontSize', 12)
      .style('textAlign', 'center')
      .style('fill', fill)
      .call(applyStyle, defaultStyle)
      .call(applyStyle, restStyle)
      .node();
  };
};

Label.props = {};

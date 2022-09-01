import { Coordinate } from '@antv/coord';
import { DisplayObject, Text } from '@antv/g';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle, getArcObject } from '../../shape/utils';
import { isHelix, isPolar } from '../../utils/coordinate';

type LabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside';

export type LabelOptions = Record<string, any>;

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
  };
}

function inferDefaultStyle(position: LabelPosition): {
  dy?: string;
  textBaseline?: string;
} {
  if (
    position === 'left' ||
    position === 'right' ||
    position === 'inside' ||
    position === 'outside'
  ) {
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

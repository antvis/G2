import { TextStyleProps, DisplayObject } from '@antv/g';
import { Marker } from '@antv/component';
import { ShapeComponent as SC, WithPrefix } from '../../runtime';
import { createElement } from '../../utils/createElement';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { applyStyle } from '../../shape/utils';

export type BadgeOptions = BadgeShapeStyleProps & Record<string, any>;

type MarkerStyleProps<P extends string> = WithPrefix<Record<string, any>, P>;
type BadgeShapeStyleProps = Partial<TextStyleProps> &
  MarkerStyleProps<'marker'>;

/**
 * Get the path to draw a built-in badge, which is like a balloon.
 */
function getPath(r: number) {
  const offset = r / Math.sqrt(2);
  const dy = r * Math.sqrt(2);
  const [p0x, p0y] = [-offset, offset - dy];
  const [p1x, p1y] = [0, 0];
  const [p2x, p2y] = [offset, offset - dy];
  return [
    ['M', p0x, p0y],
    ['A', r, r, 0, 1, 1, p2x, p2y],
    ['L', p1x, p1y],
    ['Z'],
  ];
}

function inferTextPosition(shape: DisplayObject) {
  const { min, max } = shape.getLocalBounds();
  return [(min[0] + max[0]) * 0.5, (min[1] + max[1]) * 0.5];
}

const BadgeShape = createElement((g) => {
  const { class: className, x: x0, y: y0, transform, ...rest } = g.attributes;

  const markerStyle = subObject(rest, 'marker');
  const { size = 24 } = markerStyle;

  const symbol = () => getPath(size / 2);
  const bgShape = select(g)
    .maybeAppend('marker', () => new Marker({}))
    .call((selection) =>
      (selection.node() as Marker).update({ symbol, ...markerStyle }),
    )
    .node() as DisplayObject;

  const [x, y] = inferTextPosition(bgShape);
  select(g)
    .maybeAppend('text', 'text')
    .style('x', x)
    .style('y', y)
    .call(applyStyle, rest);
});

export const Badge: SC<BadgeOptions> = (options, context) => {
  const { ...style } = options;
  return (points, value, defaults) => {
    const { color: defaultColor, ...rest } = defaults;
    const { color = defaultColor, text = '' } = value;
    const textStyle = {
      text: String(text),
      stroke: color,
      fill: color,
    };
    const [[x0, y0]] = points;
    return select(new BadgeShape())
      .call(applyStyle, rest)
      .style('transform', `translate(${x0},${y0})`)
      .call(applyStyle, textStyle)
      .call(applyStyle, style)
      .node();
  };
};

Badge.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

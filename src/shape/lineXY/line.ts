import { Path } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { arc, line } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { dist } from '../../utils/vector';
import { Primitive, ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle, getShapeTheme } from '../utils';

export type LineOptions = Record<string, any>;

function getPath(points: Vector2[], coordinate: Coordinate) {
  if (!isPolar(coordinate))
    return line()
      .x((d) => d[0])
      .y((d) => d[1])(points);

  const center = coordinate.getCenter();
  return arc()({
    startAngle: 0,
    endAngle: Math.PI * 2,
    outerRadius: dist(points[0], center),
    innerRadius: dist(points[1], center),
  });
}

function getTransform(coordinate: Coordinate, transform?: Primitive) {
  if (!isPolar(coordinate)) return transform;

  const [cx, cy] = coordinate.getCenter();
  return `translate(${cx}, ${cy}) ${transform || ''}`;
}

export const Line: SC<LineOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { defaultColor, lineWidth, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor, size = lineWidth } = value;

    const path = getPath(points, coordinate);
    const transform = getTransform(coordinate, value.transform);

    return select(new Path({}))
      .call(applyStyle, shapeTheme)
      .style('d', path)
      .style('stroke', color)
      .style('lineWidth', size)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Line.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};

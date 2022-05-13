import { Path } from '@antv/g';
import { arc, line } from 'd3-shape';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { dist } from '../../utils/vector';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../utils';

export type LineOptions = Record<string, any>;

export const AnnotationLine: SC<LineOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor, defaultSize } = theme;
    const { color = defaultColor, size = defaultSize } = value;

    let pathString;
    let { transform } = value;
    if (!isPolar(coordinate)) {
      pathString = line()
        .x((d) => d[0])
        .y((d) => d[1])(points);
    } else {
      const center = coordinate.getCenter();
      pathString = arc()({
        startAngle: 0,
        endAngle: Math.PI * 2,
        outerRadius: dist(points[0], center),
        innerRadius: dist(points[1], center),
      });
      transform = `translate(${center[0]}, ${center[1]}) ${transform || ''}`;
    }

    return select(new Path({}))
      .style('d', pathString)
      .style('stroke', color)
      .style('lineWidth', size)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

AnnotationLine.props = {
  defaultEnterAnimation: 'fadeIn',
};

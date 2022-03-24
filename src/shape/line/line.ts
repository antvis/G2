import { line } from 'd3-shape';
import { Path } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Container } from '../../utils/container';
import { applyStyle, attr } from '../utils';

export type ShapeLineOptions = void;

export const ShapeLine: SC<ShapeLineOptions> = () => {
  return (points, style, coordinate) => {
    const { color } = style;
    const P = isPolar(coordinate) ? [...points, points[0]] : points;
    // const P = points;
    const path = line()
      .x((d) => d[0])
      .y((d) => d[1]);
    return Container.of<Path>(new Path({}))
      .map(attr, 'd', path(P))
      .map(attr, 'stroke', color)
      .map(applyStyle, style)
      .value();
  };
};

ShapeLine.props = {
  defaultEnterAnimation: 'fadeIn',
};

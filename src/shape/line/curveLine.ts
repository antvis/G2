import { line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Path } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { ShapeComponent as SC } from '../../runtime';
import { Container } from '../../utils/container';
import { applyStyle, attr } from '../utils';

export type CurveLineOptions = {
  curve?: CurveFactory | CurveFactoryLineOnly;
};

export const CurveLine: SC<CurveLineOptions> = (options) => {
  const { curve } = options;
  return (points, style, coordinate) => {
    const { color, size } = style;
    const P = isPolar(coordinate) ? [...points, points[0]] : points;
    const path = line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curve);
    return Container.of<Path>(new Path({}))
      .map(attr, 'd', path(P))
      .map(attr, 'stroke', color)
      .map(attr, 'lineWidth', size)
      .map(applyStyle, style)
      .value();
  };
};

CurveLine.props = {
  defaultEnterAnimation: 'fadeIn',
};

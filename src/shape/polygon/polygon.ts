import { Path as GPath } from '@antv/g';
import { applyStyle, polygon } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type PolygonOptions = Record<string, any>;

export const Polygon: SC<PolygonOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    return select(new GPath())
      .style('d', polygon(points))
      .style('stroke', color)
      .style('fill', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Polygon.props = {
  defaultEnterAnimation: 'fadeIn',
};

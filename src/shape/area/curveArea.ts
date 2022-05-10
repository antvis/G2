import { area, CurveFactory } from 'd3-shape';
import { Path } from '@antv/g';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../utils';

export type CurveAreaOptions = {
  curve?: CurveFactory;
  [key: string]: any;
};

export const CurveArea: SC<CurveAreaOptions> = (options) => {
  const { curve, ...style } = options;
  return (P, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    // seperate into y0, y1
    const Y1 = P.slice(0, P.length / 2);
    const Y0 = P.slice(P.length / 2);

    const path = area()
      .x((d) => d[0])
      .y1((d) => d[1])
      .y0((_, idx) => Y0[idx][1])
      .curve(curve);

    return select(new Path({}))
      .style('d', path(Y1))
      .style('fill', color)
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

CurveArea.props = {
  defaultEnterAnimation: 'fadeIn',
};

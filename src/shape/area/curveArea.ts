import { area, areaRadial, CurveFactory } from 'd3-shape';
import { Path } from '@antv/g';
import { select } from '../../utils/selection';
import { isPolar } from '../../utils/coordinate';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { angle, sub, dist } from '../../utils/vector';
import { applyStyle } from '../utils';

export type CurveAreaOptions = {
  curve?: CurveFactory;
  [key: string]: any;
};

export const CurveArea: SC<CurveAreaOptions> = (options) => {
  const { curve, ...style } = options;
  return (P, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor } = value;
    let { transform } = value;

    // seperate into y0, y1
    const Y1 = P.slice(0, P.length / 2);
    const Y0 = P.slice(P.length / 2);

    let pathString;

    if (!isPolar(coordinate)) {
      pathString = area()
        .x((_, idx) => Y1[idx][0])
        .y1((_, idx) => Y1[idx][1])
        .y0((_, idx) => Y0[idx][1])
        .curve(curve)(Y1);
    } else {
      const center = coordinate.getCenter() as Vector2;

      const appendY1 = [...Y1, Y1[0]];
      const appendY0 = [...Y0, Y0[0]];
      pathString = areaRadial()
        .angle((_, idx) => angle(sub(appendY1[idx], center)))
        .outerRadius((_, idx) => dist(appendY1[idx], center))
        .innerRadius((_, idx) => dist(appendY0[idx], center))
        .curve(curve)(appendY1);

      transform = `translate(${center[0]}, ${center[1]}) ${transform || ''}`;
    }

    return select(new Path({}))
      .style('d', pathString)
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

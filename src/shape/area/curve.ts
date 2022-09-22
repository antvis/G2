import { area, areaRadial, CurveFactory } from 'd3-shape';
import { Path } from '@antv/g';
import { select } from '../../utils/selection';
import { isPolar } from '../../utils/coordinate';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { angle, sub, dist } from '../../utils/vector';
import { applyStyle, computeGradient, getShapeTheme } from '../utils';

export type CurveOptions = {
  curve?: CurveFactory;
  gradient?: boolean;
  [key: string]: any;
};

function pathTransform(P, value, curve, coordinate): [string, string] {
  const Y1 = P.slice(0, P.length / 2);
  const Y0 = P.slice(P.length / 2);
  if (!isPolar(coordinate)) {
    const path = area()
      .x((_, idx) => Y1[idx][0])
      .y1((_, idx) => Y1[idx][1])
      .y0((_, idx) => Y0[idx][1])
      .curve(curve)(Y1);
    return [path, ''];
  } else {
    const center = coordinate.getCenter() as Vector2;
    const { transform: suffix } = value;
    const path = areaRadial()
      .angle((_, idx) => angle(sub(Y1[idx], center)))
      .outerRadius((_, idx) => dist(Y1[idx], center))
      .innerRadius((_, idx) => dist(Y0[idx], center))
      .curve(curve)(Y0);
    const transform = `translate(${center[0]}, ${center[1]}) ${suffix || ''}`;
    return [path, transform];
  }
}

export const Curve: SC<CurveOptions> = (options) => {
  const { curve, gradient = false, ...style } = options;
  return (P, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { fill, stroke, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color: colorValue, seriesColor: sc, seriesX: sx } = value;
    const [path, transform] = pathTransform(P, value, curve, coordinate);
    const color = (colorValue: string) =>
      gradient && sc ? computeGradient(sc, sx) : colorValue;
    return select(new Path({}))
      .call(applyStyle, shapeTheme)
      .style('d', path)
      .style('fill', color(colorValue || fill))
      .style('stroke', color(colorValue || stroke))
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Curve.props = {
  defaultEnterAnimation: 'fadeIn',
};

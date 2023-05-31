import { intersectionArea } from './circleintersection';

/**
 * 根据圆心(x, y) 半径 r 返回圆的绘制 path
 * @param x 圆心点 x
 * @param y 圆心点 y
 * @param r 圆的半径
 * @returns 圆的 path
 */
function circlePath(x, y, r) {
  const ret = [];
  // ret.push('\nM', x, y);
  // ret.push('\nm', -r, 0);
  // ret.push('\na', r, r, 0, 1, 0, r * 2, 0);
  // ret.push('\na', r, r, 0, 1, 0, -r * 2, 0);
  const x0 = x - r;
  const y0 = y;
  ret.push('M', x0, y0);
  ret.push('A', r, r, 0, 1, 0, x0 + 2 * r, y0);
  ret.push('A', r, r, 0, 1, 0, x0, y0);

  return ret.join(' ');
}

/** returns a svg path of the intersection area of a bunch of circles */
export function intersectionAreaPath(circles) {
  const stats: any = {};
  intersectionArea(circles, stats);
  const arcs = stats.arcs;

  if (arcs.length === 0) {
    return 'M 0 0';
  } else if (arcs.length == 1) {
    const circle = arcs[0].circle;
    return circlePath(circle.x, circle.y, circle.radius);
  } else {
    // draw path around arcs
    const ret = ['\nM', arcs[0].p2.x, arcs[0].p2.y];
    for (let i = 0; i < arcs.length; ++i) {
      const arc = arcs[i],
        r = arc.circle.radius,
        wide = arc.width > r;
      ret.push('\nA', r, r, 0, wide ? 1 : 0, 1, arc.p1.x, arc.p1.y);
    }
    return ret.join(' ');
  }
}

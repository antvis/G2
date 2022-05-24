import { group } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { StackYTransform } from '../../spec';
import { merge, column, field } from '../utils/helper';

export type StackYOptions = Omit<StackYTransform, 'type'>;

/**
 * Group marks into groups and stack y channel.
 *  @todo Sort marks in each groups.
 */
export const StackY: TC<StackYOptions> = (options = {}) => {
  const { series: seriesOption } = options;
  return merge((context) => {
    const { data, I, columnOf, encode } = context;
    const { x, y, y1, series } = encode;
    const X = columnOf(data, x);
    const Y = columnOf(data, y);
    const Y1 = columnOf(data, y1);
    const S = columnOf(data, series);

    // If series channel is specified, it maybe apply both stackY and dodgeX.
    // In that case marks should be grouped based on both x1 and series channel,
    // otherwise just x1.
    const key =
      S && seriesOption
        ? (i: number) => `${X[i]}-${S[i]}`
        : (i: number) => `${X[i]}`;
    const groups = Array.from(group(I, key).values());

    // Stack y channel in each groups.
    const newY = new Array(I.length);
    const newY1 = new Array(I.length);
    for (const G of groups) {
      let py = +Y1[G[0]];
      for (let i = 0; i < G.length; i += 1) {
        const index = G[i];
        const y = +Y[index] - +Y1[index];
        newY1[index] = py;
        newY[index] = newY1[index] + y;
        py = newY[index];
      }
    }

    return {
      encode: {
        x: column(X),
        y: column(field(newY, Y)),
        y1: column(field(newY1, Y1)),
        series: column(S),
      },
    };
  });
};

StackY.props = {
  category: 'statistic',
};

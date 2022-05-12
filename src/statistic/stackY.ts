import { group } from 'd3-array';
import { StatisticComponent as SC } from '../runtime';
import { StackYStatistic } from '../spec';
import { firstOf as x1, firstOf as y1 } from '../utils/array';

export type StackYOptions = Omit<StackYStatistic, 'type'>;

/**
 * Group marks into groups and stack y channel.
 *  @todo Sort marks in each groups.
 */
export const StackY: SC<StackYOptions> = (options = {}) => {
  const { series } = options;
  return ({ index, value }) => {
    const { x: X, y: Y, series: S } = value;
    if (X === undefined || Y === undefined) return { index, value };

    // If series channel is specified, it maybe apply both stackY and dodgeX.
    // In that case marks should be grouped based on both x1 and series channel,
    // otherwise just x1.
    const X1 = X.map(x1);
    const key =
      S && series
        ? (i: number) => `${X1[i]}-${S[i]}`
        : (i: number) => `${X1[i]}`;
    const groups = Array.from(group(index, key).values());

    // Stack y channel in each groups.
    const newY = new Array(index.length);
    for (const I of groups) {
      for (let py = 0, i = 0; i < I.length; i += 1) {
        const index = I[i];
        const y = py + y1(Y[index]);
        newY[index] = [y, py];
        py = y;
      }
    }
    return { index, value: { ...value, y: newY } };
  };
};

StackY.props = {};

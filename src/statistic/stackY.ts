import { group } from 'd3-array';
import { StatisticComponent } from '../runtime';
import { x1, y1 } from './utils';

export type StackYOptions = void;

/**
 * Group marks into groups and modify y channel by stacking.
 *  @todo Sort marks in each groups.
 */
export const StackY: StatisticComponent<StackYOptions> = () => {
  return ({ index, value }) => {
    const { x: X, y: Y, series: S } = value;
    if (X === undefined || Y === undefined) return { index, value };

    // If series channel is specified, it maybe apply both stackY and dodgeY.
    // In that case marks should be grouped based on both x1 and series channel,
    // otherwise just x1.
    const X1 = X.map(x1);
    const key = S
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

import { group } from 'd3-array';
import { StatisticComponent as SC } from '../runtime';
import { DodgeXStatistic } from '../spec';
import { firstOf as x1 } from '../utils/array';

export type DodgeYOptions = Omit<DodgeXStatistic, 'type'>;

/**
 * Produce series channel to achieve dodge.
 * @todo Sort marks in each groups.
 */
export const DodgeX: SC<DodgeYOptions> = () => {
  return ({ index, value }) => {
    const { series: S, color: C, x: X } = value;
    // If series channel is specified, then do nothing.
    if (S) return { index, value };

    // If color channel is specified, assume color channel grouping data into series.
    if (C) return { index, value: { ...value, series: C } };

    // If x1 channel is specified, group marks based on x1.
    if (X === undefined) return { index, value };
    const X1 = X.map(x1);
    const groups = Array.from(group(index, (i) => X1[i]).values());

    // Note!!!
    // In this case, it's impossible to get information about series.
    // Here using index of each mark in each group as series field to avoid overlapping,
    // which may make no sense if data is disordered in each group.
    const series = new Array(index.length);
    for (const I of groups) {
      for (let i = 0; i < I.length; i++) {
        const index = I[i];
        series[index] = i;
      }
    }

    return {
      index,
      value: {
        ...value,
        series,
      },
    };
  };
};

DodgeX.props = {};

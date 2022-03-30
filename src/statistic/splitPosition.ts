import { StatisticComponent as SC } from '../runtime';
import { SplitPositionStatistic } from '../spec';

export type SplitPositionOptions = Omit<SplitPositionStatistic, 'type'>;

export const SplitPosition: SC<SplitPositionOptions> = () => {
  return ({ index, value }) => {
    const { position: P } = value;
    if (P === undefined) return { index, value };
    return {
      index,
      value: {
        ...value,
        ...Object.fromEntries(P.map((V, i) => [`position[${i}]`, V])),
      },
    };
  };
};

SplitPosition.props = {};

import { StatisticComponent as SC } from '../runtime';
import { KeyStatistic } from '../spec';

export type KeyOptions = Omit<KeyStatistic, 'type'>;

export const Key: SC<KeyOptions> = () => {
  return ({ index, value }) => {
    const key = index.map((i) =>
      Object.values(value)
        .flatMap((d) => d[i])
        .join('-'),
    );
    return {
      index,
      value: {
        ...value,
        key,
      },
    };
  };
};

Key.props = {};

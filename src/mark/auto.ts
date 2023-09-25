import { Advisor } from '@antv/ava';
import { deepMix } from '@antv/util';

export const Auto = (options) => {
  const chartAdvisor = new Advisor();
  const {
    data,
    dataProps,
    fields,
    options: o,
    colorOptions,
    ...rest
  } = options;
  const results = chartAdvisor.advise({
    data,
    dataProps,
    fields,
    options: o,
    colorOptions,
  });
  return deepMix({}, rest, results?.[0].spec);
};

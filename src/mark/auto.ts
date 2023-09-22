import { Advisor } from '@antv/ava';
import { AutoMark } from '../spec';

export const Auto = (options: AutoMark) => {
  const chartAdvisor = new Advisor();
  const results = chartAdvisor.advise(options);
  return results?.[0].spec;
};

import { StatisticComponent } from '../runtime';

export type Statistic = StackYStatistic | DodgeXStatistic | CustomStatistic;

export type StatisticTypes = 'dodgeX' | 'stackY' | StatisticComponent;

export type DodgeXStatistic = {
  type?: 'dodgeX';
};

export type StackYStatistic = {
  type?: 'stackY';
};

export type CustomStatistic = {
  type?: StatisticComponent;
  [key: string]: any;
};

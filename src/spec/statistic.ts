import { StatisticComponent } from '../runtime';

export type Statistic =
  | StackYStatistic
  | DodgeXStatistic
  | StackDurationStatistic
  | CustomStatistic;

export type StatisticTypes =
  | 'dodgeX'
  | 'stackY'
  | 'stackEnter'
  | StatisticComponent;

export type DodgeXStatistic = {
  type?: 'dodgeX';
};

export type StackYStatistic = {
  type?: 'stackY';
};

export type StackDurationStatistic = {
  type?: 'stackEnter';
  by?: string[];
};

export type CustomStatistic = {
  type?: StatisticComponent;
  [key: string]: any;
};

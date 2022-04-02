import { StatisticComponent } from '../runtime';

export type Statistic =
  | StackYStatistic
  | DodgeXStatistic
  | StackDurationStatistic
  | SplitPositionStatistic
  | CustomStatistic
  | KeyStatistic;

export type StatisticTypes =
  | 'dodgeX'
  | 'stackY'
  | 'stackEnter'
  | 'splitPosition'
  | 'key'
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

export type SplitPositionStatistic = {
  type?: 'splitPosition';
};

export type KeyStatistic = {
  type?: 'key';
};

export type CustomStatistic = {
  type?: StatisticComponent;
  [key: string]: any;
};

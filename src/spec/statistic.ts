import { StatisticComponent } from '../runtime';
import { StackYOptions, DodgeYOptions } from '../statistic';

export type Statistic = DodgeYOptions | StackYStatistic;

export type StatisticTypes = 'dodgeX' | 'stackY';

export type BaseStatistic<T extends StatisticTypes, O> = {
  type?: T | StatisticComponent;
} & O;

export type DodgeYStatistic = BaseStatistic<'dodgeX', DodgeYOptions>;

export type StackYStatistic = BaseStatistic<'stackY', StackYOptions>;

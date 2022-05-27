import { TransformComponent } from '../runtime';

export type StatisticTransform =
  | StackYTransform
  | DodgeXTransform
  | NormalizeYTransform
  | StackEnterTransform;

export type StatisticTransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'normalizeY'
  | 'stackEnter'
  | TransformComponent;

export type DodgeXTransform = {
  type?: 'dodgeX';
};

export type StackYTransform = {
  type?: 'stackY';
  series?: boolean;
};

export type NormalizeYTransform = {
  type?: 'normalizeY';
  series?: boolean;
  groupBy?: string | string[];
  basis?:
    | 'deviation'
    | 'first'
    | 'last'
    | 'max'
    | 'mean'
    | 'median'
    | 'min'
    | 'sum'
    | 'extent';
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  by?: string[];
};

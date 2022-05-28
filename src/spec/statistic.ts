import { Primitive, TransformComponent } from '../runtime';

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
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?:
    | 'value'
    | 'sum'
    | 'series'
    | 'maxIndex'
    | string[]
    | ((data: Record<string, Primitive>) => Primitive);
  y?: 'y' | 'y1';
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

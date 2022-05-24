import { TransformComponent } from '../runtime';

export type StatisticTransform =
  | StackYTransform
  | DodgeXTransform
  | StackEnterTransform;

export type StatisticTransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'stackEnter'
  | TransformComponent;

export type DodgeXTransform = {
  type?: 'dodgeX';
};

export type StackYTransform = {
  type?: 'stackY';
  series?: boolean;
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  by?: string[];
};

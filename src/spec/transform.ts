import { TransformComponent, Primitive } from '../runtime';
import { ChannelTypes } from './geometry';

export type Transform =
  | StackYTransform
  | DodgeXTransform
  | NormalizeYTransform
  | StackEnterTransform
  | JitterTransform
  | JitterYTransform
  | SymmetryYTransform
  | SelectTransform
  | SelectXTransform
  | SelectYTransform
  | GroupXTransform
  | SortXTransform
  | FlexXTransform;

export type TransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'normalizeY'
  | 'stackEnter'
  | 'jitter'
  | 'jitterY'
  | 'symmetryY'
  | 'select'
  | 'selectY'
  | 'selectX'
  | 'groupX'
  | 'sortX'
  | 'flexX'
  | TransformComponent;

export type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);

export type DodgeXTransform = {
  type?: 'dodgeX';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: TransformOrder;
  padding?: number;
};

export type StackYTransform = {
  type?: 'stackY';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: TransformOrder;
  y?: 'y' | 'y1';
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
    | 'sum';
};

export type JitterTransform = {
  type?: 'jitter';
  paddingX?: number;
  paddingY?: number;
};

export type JitterYTransform = {
  type?: 'jitterY';
  padding?: number;
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  by?: string[];
};

export type SymmetryYTransform = {
  type?: 'symmetryY';
  groupBy?: string | string[];
};

export type Selector =
  | 'min'
  | 'max'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: number[]) => number[]);

export type SelectTransform = {
  type?: 'select';
  groupBy?: string | string[];
} & { [key in ChannelTypes]?: Selector };

export type SelectXTransform = {
  type?: 'selectX';
  groupBy?: string | string[];
  selector?: Selector;
};

export type SelectYTransform = {
  type?: 'selectY';
  groupBy?: string | string[];
  selector?: Selector;
};

export type SortXTransform = {
  type?: 'sortX';
  reverse?: boolean;
  channel?: string;
  slice?: number | [number, number];
  reducer?:
    | 'max'
    | 'min'
    | 'sum'
    | 'first'
    | 'last'
    | ((I: number[], V: Primitive[]) => Primitive);
};

export type FlexXTransform = {
  type?: 'flexX';
  field?: string | ((d: any) => Primitive[]);
  channel?: string;
  reducer?: 'sum' | ((I: number[], V: Primitive[]) => Primitive);
};

export type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);

export type GroupXTransform = {
  type?: 'groupX';
} & { [key in ChannelTypes]?: Reducer };

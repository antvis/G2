import { TransformComponent, Primitive } from '../runtime';
import { ChannelTypes } from './mark';

export type Transform =
  | StackYTransform
  | DodgeXTransform
  | NormalizeYTransform
  | StackEnterTransform
  | JitterTransform
  | JitterXTransform
  | JitterYTransform
  | SymmetryYTransform
  | DiffYTransform
  | SelectTransform
  | SelectXTransform
  | SelectYTransform
  | GroupXTransform
  | GroupYTransform
  | GroupColorTransform
  | SortXTransform
  | SortYTransform
  | SortColorTransform
  | GroupTransform
  | PackTransform
  | BinXTransform
  | BinTransform
  | SampleTransform
  | FlexXTransform
  | FilterTransform;

export type TransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'normalizeY'
  | 'stackEnter'
  | 'jitter'
  | 'jitterX'
  | 'jitterY'
  | 'symmetryY'
  | 'diffY'
  | 'select'
  | 'selectY'
  | 'selectX'
  | 'groupX'
  | 'groupY'
  | 'group'
  | 'groupColor'
  | 'sortX'
  | 'sortColor'
  | 'sortY'
  | 'flexX'
  | 'pack'
  | 'sample'
  | 'filter'
  | 'kde'
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
  y1?: 'y' | 'y1';
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
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  random?: () => number;
};

export type JitterXTransform = {
  type?: 'jitterX';
  padding?: number;
  random?: () => number;
};

export type JitterYTransform = {
  type?: 'jitterY';
  padding?: number;
  random?: () => number;
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  groupBy?: string[] | string;
  orderBy?: string;
  reverse?: boolean;
  duration?: number;
  reducer?: (I: number[], V: any[]) => any;
};

export type SymmetryYTransform = {
  type?: 'symmetryY';
  groupBy?: string | string[];
};

export type DiffYTransform = {
  type?: 'diffY';
  groupBy?: string | string[];
  series?: boolean;
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
  channel?: ChannelTypes;
  selector?: Selector;
};

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

export type SortColorTransform = {
  type?: 'sortColor';
  reverse?: boolean;
  by?: string;
  slice?: number | [number, number];
  reducer?:
    | 'max'
    | 'min'
    | 'sum'
    | 'first'
    | 'last'
    | 'mean'
    | 'median'
    | ((I: number[], V: Primitive[]) => Primitive);
};

export type SortXTransform = {
  type?: 'sortX';
  reverse?: boolean;
  by?: string;
  slice?: number | [number, number];
  ordinal?: boolean;
  reducer?:
    | 'max'
    | 'min'
    | 'sum'
    | 'first'
    | 'last'
    | 'mean'
    | 'median'
    | ((I: number[], V: Primitive[]) => Primitive);
};

export type SortYTransform = {
  type?: 'sortY';
  reverse?: boolean;
  by?: string;
  slice?: number | [number, number];
  reducer?:
    | 'max'
    | 'min'
    | 'sum'
    | 'first'
    | 'last'
    | 'mean'
    | 'median'
    | ((I: number[], V: Primitive[]) => Primitive);
};

export type FlexXTransform = {
  type?: 'flexX';
  field?: string | ((d: any) => Primitive[]);
  channel?: string;
  reducer?: 'sum' | ((I: number[], V: Primitive[]) => Primitive);
};

export type PackTransform = {
  type?: 'pack';
  padding?: number;
  direction?: 'row' | 'col';
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

export type GroupYTransform = {
  type?: 'groupY';
} & { [key in ChannelTypes]?: Reducer };

export type GroupColorTransform = {
  type?: 'groupColor';
} & { [key in ChannelTypes]?: Reducer };

export type GroupTransform = {
  type?: 'group';
} & { [key in ChannelTypes]?: Reducer };

export type BinXTransform = {
  type?: 'binX';
  thresholds?: number;
} & { [key in ChannelTypes]?: Reducer };

export type BinTransform = {
  type?: 'bin';
  thresholdsX?: number;
  thresholdsY?: number;
} & { [key in ChannelTypes]?: Reducer };

export type SampleFunction = (
  I: number[],
  X: number[],
  Y: number[],
  thresholds: number,
) => number[];

export type SampleTransform = {
  type?: 'sample';
  /**
   * Sample strategy. Default is 'median'.
   */
  strategy?:
    | 'lttb'
    | 'median'
    | 'max'
    | 'min'
    | 'first'
    | 'last'
    | SampleFunction;
  /**
   * The thresholds of sample, when data size great then thresholds, sample will take effect.
   * Default is 2000.
   */
  thresholds?: number;
  /**
   * Group data by fields, for series data.
   */
  groupBy?: string | string[];
};

export type FilterTransform = {
  type?: 'filter';
} & {
  [key in ChannelTypes]?: any[] | ((v: Primitive) => boolean);
};

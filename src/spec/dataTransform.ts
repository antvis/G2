import { DataComponent } from '../runtime';

export type DataTransform =
  | SortByTransform
  | SortTransform
  | PickTransform
  | RenameTransform
  | FoldTransform
  | JoinTransform
  | FilterDataTransform
  | MapTransform
  | SliceTransform
  | CustomTransform;

export type DataTransformTypes =
  | 'sortBy'
  | 'sort'
  | 'pick'
  | 'rename'
  | 'fold'
  | 'join'
  | 'filter'
  | 'map'
  | 'slice'
  | 'custom'
  | DataComponent;

export type SortByTransform = {
  type?: 'sortBy';
  /** type: [field, order]; order: true => ascend, false => descend */
  fields?: (string | [string, boolean?])[];
};

export type PickTransform = {
  type?: 'pick';
  fields?: string[];
};

export type RenameTransform = {
  type?: 'rename';
  [key: string]: string;
};

export type FilterDataTransform = {
  type?: 'filter';
  /**
   * The filter condition, same with [Array.prototype.filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
   */
  callback?: (v: any, idx: number, arr: any[]) => boolean;
};

export type SliceTransform = {
  type?: 'slice';
  /**
   * The start index for slice. Default is 0.
   */
  start?: number;
  /**
   * The end index for slice. Default is arr.length - 1
   */
  end?: number;
};

export type SortTransform = {
  type?: 'sort';
  /**
   * The sort comparator, same with [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
   */
  callback?: (a: any, b: any) => number;
};

export type FoldTransform = {
  type?: 'fold';
  /**
   * Set fields will be folded.
   */
  fields?: string[];
  /**
   * Fold key field, default is `key`.
   */
  key?: string;
  /**
   * Fold value field, default is `value`.
   */
  value?: string;
};

export type JoinTransform = {
  type?: 'join';
  /**
   * The dataset to be joined.
   */
  join: Record<string, any>[];
  /**
   * Join keys of 2 dataset, [k1, k2] means join on ds1.k1 === ds2.k2.
   */
  on: [string | ((d: any) => string), string | ((d: any) => string)];
  /**
   * Select fields from joined dataset.
   */
  select: string[];
  /**
   * Rename the select fields, default: keep the original name.
   */
  as?: string[];
  /**
   * When not matched, use `unknown` instead.
   */
  unknown?: any;
};

export type MapTransform = {
  type?: 'map';
  callback?: (d: any) => any;
};

export type CustomDataTransform = {
  type?: 'custom';
  callback?: (d: any) => any;
};

export type CustomTransform = {
  type?: DataComponent;
  [key: string]: any;
};

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
  | KDEDataTransform
  | VennDataTransform
  | LogDataTransform
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
  | 'kde'
  | 'venn'
  | 'log'
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

export type KDEDataTransform = {
  type?: 'kde';
  /**
   * Kernel Density Estimation field.
   */
  field: string;
  /**
   * Group data by fields.
   */
  groupBy: string[];
  /**
   * Generate new fieds, default: ['y', 'size']
   */
  as?: ['y', 'size'];
  /**
   * Defaults to smallest value in the array minus some threshold.
   */
  min?: number;
  /**
   * Defaults to largest value in the array plus some threshold.
   */
  max?: number;
  /**
   * Number of points to represent the pdf. Defaults to 10.
   */
  size?: number;
  /**
   * Determine how many points to the left and right does an element affect,
   * similar to bandwidth in kernel density estimation. Defaults to 2.
   */
  width?: number;
};

export type VennDataTransform = {
  type?: 'venn';
  /**
   * Canvas padding for 4 direction.
   * Default is `0`.
   */
  padding?: number;
  /**
   * Set the sets field.
   * Default is `sets`.
   */
  sets?: string;
  /**
   * Set the size field for each set.
   * Default is `size`.
   */
  size?: string;
  /**
   * Set the generated fields, includes: [key, x, y, path]
   */
  as?: [string, string];
};

// eslint-disable-next-line
export type LogDataTransform = {};

export type CustomTransform = {
  type?: DataComponent;
  [key: string]: any;
};

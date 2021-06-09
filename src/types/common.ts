export type PlainObject = Record<string, any>;

export type Datum = PlainObject;

export type Data = Datum[];

export type Func = (...args: any[]) => any;

export type Constructable<R = any> = {
  new (...args: any[]): R;
};

export type Callback = (...args: any[]) => any;

export type Position = [number, number];

/**
 * 一个点的定义
 */
export type Point = {
  x: number;
  y: number;
};

/** 带范围的点结构 */
export type RangePoint = {
  readonly x?: number | number[];
  readonly y?: number | number[];
};

/**
 * BBox 的 plain object 描述
 */
export type BBoxObject = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * 指向一个区域范围
 */
export type Region = {
  readonly start: Point;
  readonly end: Point;
};

/**
 * 边距的定义
 */
export type Padding = number | number[];

/**
 * view 的 auto padding 定义
 */
export type AutoPadding = Padding | 'auto';

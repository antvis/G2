export type PlainObject = Record<string, any>;

export type Datum = PlainObject;

export type Data = Datum[];

export type Func = (...args: any[]) => any;

export type Constructable = {
  new (...args: any[]): any;
};

/**
 * 一个点的定义
 */
export type Point = {
  x: number;
  y: number;
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

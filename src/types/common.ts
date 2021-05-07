export type PlainObject = Record<string, any>;

export type Datum = PlainObject;

export type Data = Datum[];

export type Func = (...args: any[]) => any;

export type Constructable = {
  new(...args: any[]): any;
}

export type Point = {
  x: number;
  y: number;
};

export type BBoxObject = {
  x: number;
  y: number;
  width: number;
  height: number;
};

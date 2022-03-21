export type G2Theme = {
  defaultColor?: string;
  defaultCategory10?: string;
  defaultCategory20?: string;
};

export type MaybeArray<T> = T | T[];

export type Primitive = number | string | boolean | Date;

export type TabularData = Record<string, Primitive>[];

export type EncodeFunction = (
  data: Record<string, MaybeArray<Primitive>>[],
) => MaybeArray<Primitive>[];

export type Encoding =
  | { type: string; [key: string]: any }
  | Primitive
  | ((...args: any[]) => any);

export type Encodings = Record<string | symbol, MaybeArray<Encoding>>;

export type Value = {
  x?: number[][];
  y?: number[][];
  position?: number[][];
  [key: string]: MaybeArray<Primitive>[];
};
export type IndexedValue = {
  index: number[];
  value: Value;
};

export type ChannelValue = MaybeArray<Primitive>[];
export type Channel = {
  name: string;
  scale?: string;
  required?: boolean;
  value?: ChannelValue;
  type?: string;
  field?: string;
};
export type FlattenChannel = Omit<Channel, 'value'> & { value?: Primitive[] };

export type Vector2 = [number, number];

export type BBox = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type GuideComponentPosition =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'center';

export type Padding = {
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
};

export type SectionArea = [
  number,
  number,
  number,
  number,
  number,
  (a: Primitive, b: Primitive) => number,
];
export type Section = {
  top: SectionArea;
  right: SectionArea;
  bottom: SectionArea;
  left: SectionArea;
  center: SectionArea;
};

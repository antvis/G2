import { Canvas } from '@antv/g';
import { G2Component, G2ComponentNamespaces } from './component';

export type G2ViewTree = {
  width?: number;
  height?: number;
} & Node;

export type Node = {
  type?: string;
  children?: Node[];
  [key: string]: any;
};

export type G2Library = Record<
  `${G2ComponentNamespaces}.${string}`,
  G2Component
>;

export type G2Context = {
  library?: G2Library;
  canvas?: Canvas;
};

export type MaybeArray<T> = T | T[];

export type Primitive = number | string | boolean | Date;

export type TabularData = Record<string, Primitive>[];

export type EncodeFunction = (
  data: Record<string, MaybeArray<Primitive>>[],
) => MaybeArray<Primitive>[];

export type Encoding =
  | EncodeFunction
  | Primitive
  | { type: string; [key: string]: any };

export type Encodings = Record<string, MaybeArray<Encoding>>;

export type Value = {
  x?: number[][];
  y?: number[][];
  position?: number[][];
  [key: string]: (number[] | Primitive)[];
};
export type IndexedValue = {
  index: number[];
  value: Value;
};

export type ChannelValue = (number[] | Primitive)[];
export type Channel = {
  name: string;
  scale?: string;
  required?: boolean;
  value?: ChannelValue;
};

export type Point = [number, number];

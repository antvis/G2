import { Coordinate } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { G2GuideComponentOptions, G2Mark, G2ViewTree } from './options';
import { Scale } from './component';
import { MarkProps } from './mark';
import { ColumnValue } from './encode';

export type G2Theme = {
  defaultColor?: string;
  defaultCategory10?: string;
  defaultCategory20?: string;
  defaultSize?: number;
  elementActiveStroke?: string;
  enter?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
  exit?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
  update?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
  title?: {
    fill?: string;
    fontSize?: number;
    fontWeight?: string;
  };
  subtitle?: {
    fill?: string;
    fontSize?: number;
    fontWeight?: string;
    spacing?: number;
  };
};

export type G2Title = {
  text?: string;
  subtitle?: string | null;
  style?: Record<string, any>;
  subtitleStyle?: Record<string, any>;
};

export type G2ViewDescriptor = {
  scale: Record<string, Scale>;
  coordinate: Coordinate;
  theme: G2Theme;
  markState: Map<G2Mark, G2MarkState>;
  components: G2GuideComponentOptions[];
  layout: Layout;
  key: string;
  frame: boolean;
};

export type G2ViewInstance = {
  view: G2ViewDescriptor;
  container: DisplayObject;
  options: G2ViewTree;
  update: (options: G2ViewTree) => Promise<void>;
};

export type G2MarkState = {
  index?: number[];
  data?: Record<string, any>[];
} & MarkProps;

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
  name?: string;
  scale?: string;
  scaleName?: string;
  required?: boolean;
  value?: Primitive[];
  type?: string;
  independent?: boolean;
  field?: string | string[];
  visual?: boolean;
};

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
  | 'centerHorizontal'
  | 'arc'
  | 'arcY';

export type Layout = {
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  x?: number;
  y?: number;
};

// @todo Using emus.
export type SectionArea = [
  x: number,
  y: number,
  width: number,
  height: number,
  direction: 0 | 1 | -1, // horizontal: 1, vertical: 0, center: -1
  reverse: boolean,
  comparator: (a: Primitive, b: Primitive) => number,
];

export type Section = Record<GuideComponentPosition, SectionArea>;

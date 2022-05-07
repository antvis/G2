import { Coordinate } from '@antv/coord';
import { G2GuideComponentOptions, G2Mark } from './options';
import { Scale, MarkProps } from './component';

type TextStyle = {
  fill?: string;
  fillOpacity?: number;
  fontWeight?: number | string;
  fontSize?: number;
};
type LineStyle = {
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
};
type MarkerStyle = {
  symbol?: string;
  size?: number;
  fill?: string;
  fillOpacity?: number;
  cursor?: string;
};

export type G2Theme = {
  defaultColor?: string;
  defaultCategory10?: string;
  defaultCategory20?: string;
  defaultSize?: number;
  fontFamily?: string;
  elementActiveStroke?: string;
  enter?: {
    duration?: number;
    delay?: number;
    fill?: 'both';
  };
  // Components
  axis?: {
    /** options: start, end, center */
    titleAnchor?: string;
    titlePadding?: number;
    titleRotate?: number;
    labelOffset?: number;
    tickLineLength?: number;
    subTickLineCount?: number;
    subTickLineLength?: number;
    // Style
    title?: TextStyle;
    label?: TextStyle;
    line?: LineStyle;
    tickLine?: LineStyle;
    subTickLine?: LineStyle;
  };
  axisTop?: any;
  axisBottom?: any;
  axisLeft?: any;
  axisCenterHorizontal?: any;
  axisRight?: any;

  legend?: {
    title?: TextStyle;
    label?: TextStyle;
    itemName?: TextStyle;
    itemValue?: TextStyle;
    itemMarker?: MarkerStyle;
    pager?: {
      marker?: MarkerStyle;
      text?: TextStyle;
    };
    // StateStyle
    active?: any;
    inactive?: any;
    disabled?: any;
  };
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
  name: string;
  scale?: string;
  required?: boolean;
  value?: ChannelValue;
  type?: string;
  field?: string | string[];
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
  | 'centerHorizontal';

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

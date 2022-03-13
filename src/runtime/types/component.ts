import { Canvas, DisplayObject } from '@antv/g';
import { Transformation, Coordinate } from '@antv/coord';
import {
  Encodings,
  IndexedValue,
  EncodeFunction,
  Point,
  ChannelValue,
  Channel,
  Primitive,
} from './common';

export type G2ComponentNamespaces = 'renderer';

export type G2Component =
  | RendererComponent
  | EncodeComponent
  | InferComponent
  | StatisticComponent
  | ScaleComponent
  | CoordinateComponent
  | PaletteComponent
  | GeometryComponent;

export type G2BaseComponent<
  R,
  O = Record<string, unknown> | void,
  P = Record<string, unknown>,
> = {
  (options?: O): R;
  props?: P;
};

export type Renderer = Canvas;
export type RendererComponent<O = Record<string, unknown>> = G2BaseComponent<
  Renderer,
  O
>;

export type Encode = EncodeFunction;
export type EncodeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Encode,
  O
>;

export type Infer = (encodings: Encodings) => Encodings;
export type InferComponent<O = void> = G2BaseComponent<Infer, O>;

export type Statistic = (value: IndexedValue) => IndexedValue;
export type StatisticComponent<O = void> = G2BaseComponent<Statistic, O>;

export type Scale = {
  map: (x: any) => any;
  invert: (x: any) => any;
};
export type ScaleComponent<O = Record<string, unknown>> = G2BaseComponent<
  Scale,
  O
>;

export type CoordinateTransform = Transformation[];
export type CoordinateComponent<O = Record<string, unknown>> = G2BaseComponent<
  CoordinateTransform,
  O
>;

export type Palette = string[];
export type PaletteComponent<O = Record<string, unknown>> = G2BaseComponent<
  Palette,
  O
>;

export type Geometry = (
  index: number[],
  scale: Record<string, Scale>,
  channel: {
    x?: number[][];
    y?: number[][];
    shape?: Shape[];
    color?: string[];
    [key: string]: ChannelValue | Shape[];
  },
  style: Record<string, string>,
  coordinate: Coordinate,
  theme: Theme,
) => DisplayObject[];
export type GeometryProps = {
  defaultShape: string;
  channels: Channel[];
  infer: { type: string; [key: string]: any }[];
};
export type GeometryComponent<O = Record<string, unknown>> = G2BaseComponent<
  Geometry,
  O,
  GeometryProps
>;

export type Shape = (
  points: Point[],
  style: Record<string, Primitive>,
  coordinate: Coordinate,
) => DisplayObject;
export type ShapeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Shape,
  O
>;

export type Theme = {
  defaultColor?: string;
  defaultCategory10?: string;
  defaultCategory20?: string;
};
export type ThemeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Theme,
  O
>;

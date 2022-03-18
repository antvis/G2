import { Canvas, DisplayObject } from '@antv/g';
import { Transformation, Coordinate } from '@antv/coord';
import {
  IndexedValue,
  EncodeFunction,
  Point,
  ChannelValue,
  Channel,
  Primitive,
  G2Theme,
  TabularData,
  BBox,
  GuideComponentPosition,
} from './common';

export type G2ComponentNamespaces =
  | 'renderer'
  | 'coordinate'
  | 'encode'
  | 'mark'
  | 'infer'
  | 'palette'
  | 'renderer'
  | 'scale'
  | 'shape'
  | 'statistic'
  | 'theme'
  | 'transform'
  | 'component';

export type G2Component =
  | RendererComponent
  | EncodeComponent
  | InferComponent
  | StatisticComponent
  | ScaleComponent
  | CoordinateComponent
  | PaletteComponent
  | MarkComponent
  | ShapeComponent
  | ThemeComponent
  | GuideComponentComponent;

export type G2ComponentValue =
  | Renderer
  | Transform
  | Encode
  | Infer
  | Statistic
  | Scale
  | CoordinateTransform
  | Palette
  | Mark
  | Shape
  | Theme
  | GuideComponent;

export type G2BaseComponent<
  R = any,
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

export type Transform = (data?: any | TabularData) => any | TabularData;
export type TransformComponent<O = Record<string, undefined>> = G2BaseComponent<
  Transform,
  O
>;

export type Encode = EncodeFunction;
export type EncodeOptions = { value: any };
export type EncodeComponent<O extends EncodeOptions = EncodeOptions> =
  G2BaseComponent<Encode, O>;

export type InferValue = { type?: string; [key: string | symbol]: any };
export type Infer = (encodings: InferValue) => InferValue;
export type InferComponent<O = void> = G2BaseComponent<Infer, O>;

export type Statistic = (value: IndexedValue) => IndexedValue;
export type StatisticComponent<O = void> = G2BaseComponent<Statistic, O>;

export type Scale = {
  map: (x: any) => any;
  invert: (x: any) => any;
  getTicks?: () => any[];
  getBandWidth?: () => number;
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

export type MarkChannel = {
  x?: number[][];
  y?: number[][];
  shape?: Shape[];
  color?: string[];
  [key: string]: ChannelValue | Shape[];
};

export type Mark = (
  index: number[],
  scale: Record<string, Scale>,
  channel: MarkChannel,
  style: Record<string, Primitive>,
  coordinate: Coordinate,
  theme: Theme,
) => DisplayObject[];
export type MarkProps = {
  defaultShape: string;
  channels: Channel[];
  infer: { type: string; [key: string]: any }[];
  shapes: string[];
  index?: number[];
};
export type MarkComponent<O = Record<string, unknown>> = G2BaseComponent<
  Mark,
  O,
  MarkProps
>;

export type Shape = (
  points: Point[],
  style: {
    color?: string;
    [key: string]: Primitive;
  },
  coordinate: Coordinate,
) => DisplayObject;
export type ShapeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Shape,
  O
>;

export type Theme = G2Theme;
export type ThemeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Theme,
  O
>;

export type GuideComponent = (
  scale: Scale,
  bbox: BBox,
  style: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
) => DisplayObject;
export type GuideComponentProps = {
  defaultPosition: GuideComponentPosition;
  defaultSize: number;
  defaultOrder: number;
};
export type GuideComponentComponent<O = Record<string, unknown>> =
  G2BaseComponent<GuideComponent, O, GuideComponentProps>;

import { Canvas, DisplayObject, Animation as GAnimation } from '@antv/g';
import { Transformation, Coordinate } from '@antv/coord';
import { Selection } from '../../utils/selection';
import {
  IndexedValue,
  Primitive,
  G2Theme,
  MaybeArray,
  Vector2,
  GuideComponentPosition,
  G2ViewDescriptor,
  Layout,
} from './common';
import { G2View, G2ViewTree } from './options';
import { EncodeComponent, Encode } from './encode';
import { MarkComponent, Mark } from './mark';
import { TransformComponent, Transform } from './transform';

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
  | 'component'
  | 'animation'
  | 'action'
  | 'interaction'
  | 'interactor'
  | 'composition'
  | 'adjust';

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
  | GuideComponentComponent
  | AnimationComponent
  | ActionComponent
  | InteractionComponent
  | InteractorComponent
  | CompositionComponent
  | AdjustComponent
  | TransformComponent;

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
  | GuideComponent
  | Animation
  | Action
  | Interaction
  | Interactor
  | Composition
  | Adjust;

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

// export type Transform = (data?: any | TabularData) => any | TabularData;
// export type TransformComponent<O = Record<string, unknown>> = G2BaseComponent<
//   Transform,
//   O
// >;

// export type Encode = EncodeFunction;
// export type EncodeOptions = { value?: any };
// export type EncodeComponent<O extends EncodeOptions = EncodeOptions> =
//   G2BaseComponent<Encode, O>;

export type InferredEncode = {
  type?: string;
  [key: string | symbol]: any;
};
export type InferredStatistic = {
  type?: string | ((...args: any[]) => any);
  [key: string | symbol]: any;
};
export type InferValue = {
  encode?: InferredEncode;
  transform?: (
    indexedValue: IndexedValue,
    statistic: InferredStatistic[],
  ) => InferredStatistic[];
};
export type Infer = (encodings: InferValue) => InferValue;
export type InferComponent<O = void> = G2BaseComponent<Infer, O>;

export type Statistic = (value: IndexedValue) => IndexedValue;
export type StatisticComponent<O = void> = G2BaseComponent<Statistic, O>;

export type Scale = {
  map: (x: any) => any;
  invert: (x: any) => any;
  getTicks?: () => any[];
  getBandWidth?: (d?: any) => number;
  getFormatter?: () => (x: any) => string;
  getOptions?: () => Record<string, any>;
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

// export type MarkChannel = {
//   x?: number[][];
//   y?: number[][];
//   shape?: Shape[];
//   color?: string[];
//   [key: string]: ChannelValue | Shape[];
// };

// export type Mark = (
//   index: number[],
//   scale: Record<string, Scale>,
//   channel: MarkChannel,
//   coordinate: Coordinate,
// ) => [number[], Vector2[][]];
// export type MarkProps = {
//   defaultShape: string;
//   channels: Channel[];
//   infer: { type: string; [key: string]: any }[];
//   shapes: string[];
// };
// export type MarkComponent<O = Record<string, unknown>> = G2BaseComponent<
//   Mark,
//   O,
//   MarkProps
// >;

export type Shape = (
  points: Vector2[],
  value: {
    color?: string;
    [key: string]: Primitive;
  },
  coordinate: Coordinate,
  theme: G2Theme,
) => DisplayObject;
export type ShapeProps = {
  defaultEnterAnimation: string;
};
export type ShapeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Shape,
  O,
  ShapeProps
>;

export type Theme = G2Theme;
export type ThemeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Theme,
  O
>;

export type GuideComponent = (
  scales: Scale[],
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

export type Animation = (
  shape: DisplayObject,
  style: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
) => GAnimation;
export type AnimationComponent<O = Record<string, unknown>> = G2BaseComponent<
  Animation,
  O
>;

export type Step = {
  trigger: string;
  action: MaybeArray<
    string | { type: string | ActionComponent; [key: string]: any }
  >;
  throttle?: { wait?: number; leading?: boolean; trailing: boolean };
};
export type Interaction = {
  interactors?: { type: string | InteractorComponent; [key: string]: any }[];
  start?: Step[];
  end?: Step[];
};
export type InteractionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Interaction,
  O
>;

export type G2Event = Omit<Event, 'target'> & {
  target: DisplayObject;
  currentTarget: DisplayObject;
  offsetY: number;
  offsetX: number;
};
export type ActionContext = {
  event: G2Event;
  update: (updater: (options: G2View) => G2View) => void;
  shared: Record<string, any>;
  selection: Selection;
} & G2ViewDescriptor;
export type Action = (options: ActionContext) => ActionContext;
export type ActionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Action,
  O
>;

export type InteractorAction = { action?: string; events: string[] };
export type Interactor = {
  actions?: InteractorAction[];
};
export type InteractorComponent<O = Record<string, unknown>> = G2BaseComponent<
  Interactor,
  O
>;

export type Composition = (children: G2ViewTree) => G2ViewTree[];
export type CompositionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Composition,
  O
>;

export type Adjust = (
  points: Vector2[][],
  domain: number,
  layout: Layout,
) => string[];
export type AdjustComponent<O = Record<string, unknown>> = G2BaseComponent<
  Adjust,
  O
>;

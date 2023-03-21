import { Coordinate, Transformation } from '@antv/coord';
import EventEmitter from '@antv/event-emitter';
import { DisplayObject, IAnimation as GAnimation } from '@antv/g';
import {
  G2Theme,
  G2ViewInstance,
  GuideComponentOrientation,
  GuideComponentPosition,
  IndexedValue,
  Layout,
  Vector2,
  G2MarkState,
} from './common';
import { DataComponent } from './data';
import { Encode, EncodeComponent } from './encode';
import { Mark, MarkComponent } from './mark';
import { G2ViewTree, G2Library, G2Mark } from './options';
import { Transform, TransformComponent } from './transform';

export type G2ComponentNamespaces =
  | 'coordinate'
  | 'encode'
  | 'mark'
  | 'infer'
  | 'palette'
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
  | 'data'
  | 'labelTransform';

export type G2Component =
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
  | InteractionComponent
  | CompositionComponent
  | AdjustComponent
  | TransformComponent
  | DataComponent
  | LabelTransformComponent;

export type G2ComponentValue =
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
  | Interaction
  | Composition
  | Adjust
  | LabelTransform;

export type G2BaseComponent<
  R = any,
  O = Record<string, unknown> | void,
  P = Record<string, unknown>,
> = {
  (options?: O): R;
  props?: P;
};

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
  getOptions: () => Record<string, any>;
  update(options: Record<string, any>): void;
};
export type ScaleComponent<O = Record<string, unknown>> = G2BaseComponent<
  Scale,
  O
>;

export type CoordinateTransform = Transformation[];
export type CoordinateProps = {
  transform?: boolean;
};
export type CoordinateComponent<O = Record<string, unknown>> = G2BaseComponent<
  CoordinateTransform,
  O,
  CoordinateProps
>;

export type Palette = string[];
export type PaletteComponent<O = Record<string, unknown>> = G2BaseComponent<
  Palette,
  O
>;

export type Shape = (
  points: Vector2[],
  value: {
    color?: string;
    index?: number;
    [key: string]: any;
  },
  coordinate: Coordinate,
  theme: G2Theme,
  point2d?: Vector2[][],
) => DisplayObject;
export type ShapeProps = {
  defaultMarker?: string;
  defaultEnterAnimation?: string;
  defaultUpdateAnimation?: string;
  defaultExitAnimation?: string;
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

export type GuideComponentContext = {
  coordinate: Coordinate;
  library: G2Library;
  markState: Map<G2Mark, G2MarkState>;
  scales: Scale[];
  theme: G2Theme;
  value: Record<string, any>;
};

export type GuideComponent = (context: GuideComponentContext) => DisplayObject;

export type GuideComponentProps = {
  defaultPosition?: GuideComponentPosition;
  defaultOrientation?: GuideComponentOrientation;
  defaultSize: number;
  defaultOrder: number;
  [key: string]: any;
};

export type GuideComponentComponent<O = Record<string, unknown>> =
  G2BaseComponent<GuideComponent, O, GuideComponentProps>;

export type Animation = (
  from: DisplayObject[],
  to: DisplayObject[],
  value: Record<string, any>,
  coordinate: Coordinate,
  defaults: G2Theme['enter' | 'exit' | 'update'],
) => GAnimation | GAnimation[];
export type AnimationComponent<O = Record<string, unknown>> = G2BaseComponent<
  Animation,
  O
>;

export type Interaction = (
  target: G2ViewInstance,
  viewInstances: G2ViewInstance[],
  emitter?: EventEmitter,
) => void;
export type InteractionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Interaction,
  O
>;

export type Composition = (
  children: G2ViewTree,
) =>
  | G2ViewTree[]
  | (() => Generator<G2ViewTree, void, void>)
  | Promise<G2ViewTree[]>;
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

export type LabelTransform = (
  labels: DisplayObject[],
  coordinate: Coordinate,
) => DisplayObject[];
export type LabelTransformComponent<O = Record<string, unknown>> =
  G2BaseComponent<LabelTransform, O>;

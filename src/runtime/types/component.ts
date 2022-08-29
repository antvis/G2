import { Canvas, DisplayObject, Animation as GAnimation } from '@antv/g';
import { Transformation, Coordinate } from '@antv/coord';
import {
  IndexedValue,
  G2Theme,
  Vector2,
  GuideComponentPosition,
  Layout,
  G2ViewInstance,
} from './common';
import { G2ViewTree } from './options';
import { EncodeComponent, Encode } from './encode';
import { MarkComponent, Mark } from './mark';
import { TransformComponent, Transform } from './transform';
import { Data, DataComponent } from './data';

export type G2ComponentNamespaces =
  | 'renderer'
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
  | 'adjust'
  | 'data'
  | 'labelLayout';

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
  | InteractionComponent
  | CompositionComponent
  | AdjustComponent
  | TransformComponent
  | DataComponent
  | LabelLayoutComponent;

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
  | Interaction
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

export type GuideComponent = (
  scale: Scale,
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
) => void;
export type InteractionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Interaction,
  O
>;

export type Composition = (
  children: G2ViewTree,
) => G2ViewTree[] | (() => Generator<G2ViewTree, void, void>);
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

export type LabelLayout = (labels: DisplayObject[]) => DisplayObject[];
export type LabelLayoutComponent<O = Record<string, unknown>> = G2BaseComponent<
  LabelLayout,
  O
>;

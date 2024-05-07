import { Coordinate, Transformation } from '@antv/coord';
import EventEmitter from '@antv/event-emitter';
import {
  DisplayObject,
  IAnimation as GAnimation,
  IDocument,
  Canvas,
} from '@antv/g';
import {
  G2Theme,
  G2ViewInstance,
  GuideComponentOrientation,
  GuideComponentPosition,
  IndexedValue,
  Vector2,
  G2MarkState,
  GuideComponentPlane,
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
  | 'palette'
  | 'scale'
  | 'shape'
  | 'theme'
  | 'transform'
  | 'component'
  | 'animation'
  | 'action'
  | 'interaction'
  | 'composition'
  | 'data'
  | 'labelTransform';

export type G2Component =
  | EncodeComponent
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
  | TransformComponent
  | DataComponent
  | LabelTransformComponent;

export type G2ComponentValue =
  | Transform
  | Encode
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
  | LabelTransform;

export type G2BaseComponent<
  R = any,
  O = Record<string, unknown>,
  P = Record<string, unknown>,
  C = Record<string, unknown>,
> = {
  (options?: O, context?: C): R;
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

export type Scale = {
  map: (x: any) => any;
  invert: (x: any) => any;
  getTicks?: () => any[];
  getBandWidth?: (d?: any) => number;
  getFormatter?: () => (x: any) => string;
  getOptions: () => Record<string, any>;
  update(options: Record<string, any>): void;
  clone: () => Scale;
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
  defaults?: Record<string, any>,
  point2d?: Vector2[][],
) => DisplayObject;
export type ShapeProps = {
  defaultMarker?: string;
  defaultEnterAnimation?: string;
  defaultUpdateAnimation?: string;
  defaultExitAnimation?: string;
};
export type ShapeContext = {
  document: IDocument;
  coordinate: Coordinate;
  [key: string]: any; // TODO
};
export type ShapeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Shape,
  O,
  ShapeProps,
  ShapeContext
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
  scale: Record<string, Scale>;
  theme: G2Theme;
  value: Record<string, any>;
};

export type GuideComponent = (context: GuideComponentContext) => DisplayObject;

export type GuideComponentProps = {
  defaultPosition?: GuideComponentPosition;
  defaultPlane?: GuideComponentPlane;
  defaultOrientation?: GuideComponentOrientation;
  defaultSize?: number;
  defaultOrder?: number;
  defaultPadding?: [number, number];
  defaultCrossPadding?: [number, number];
  [key: string]: any;
};

export type GuideComponentComponent<O = Record<string, unknown>> =
  G2BaseComponent<GuideComponent, O, GuideComponentProps>;

export type Animation = (
  from: DisplayObject[],
  to: DisplayObject[],
  defaults: Record<string, any>,
) => GAnimation | GAnimation[];

export type AnimationContext = {
  coordinate: Coordinate;
  [key: string]: any; // TODO
};

export type AnimationProps = Record<string, unknown>;

export type AnimationComponent<O = Record<string, unknown>> = G2BaseComponent<
  Animation,
  O,
  AnimationProps,
  AnimationContext
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

export type LabelTransform = (
  labels: DisplayObject[],
  context: {
    coordinate: Coordinate;
    canvas: Canvas;
  },
) => DisplayObject[];
export type LabelTransformComponent<O = Record<string, unknown>> =
  G2BaseComponent<LabelTransform, O>;

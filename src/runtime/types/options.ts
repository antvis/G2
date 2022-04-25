import { Canvas } from '@antv/g';
import { GuideComponentPosition, Primitive } from './common';

import {
  G2BaseComponent,
  TransformComponent,
  StatisticComponent,
  EncodeComponent,
  ThemeComponent,
  G2ComponentNamespaces,
  CoordinateComponent,
  ScaleComponent,
  InferComponent,
  ShapeComponent,
  PaletteComponent,
  GuideComponentComponent,
  AnimationComponent,
  ActionComponent,
  InteractionComponent,
  InteractorComponent,
  MarkComponent,
  CompositionComponent,
  AdjustComponent,
} from './component';

export type G2ViewTree = {
  width?: number;
  height?: number;
} & Node;

export type Node = {
  type?: string | ((...args: any[]) => any);
  children?: Node[];
  key?: string;
  [key: string]: any;
};

export type G2Library = Record<
  `${G2ComponentNamespaces}.${string}`,
  G2BaseComponent
>;

export type G2Context = {
  library?: G2Library;
  canvas?: Canvas;
};

export type G2View = {
  key?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  theme?: G2ThemeOptions;
  coordinate?: G2CoordinateOptions[];
  component?: G2GuideComponentOptions[];
  interaction?: G2InteractionOptions[];
  marks?: G2Mark[];
  adjust?: { type?: string; [key: string]: any };
};

export type G2Mark = {
  key?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  data?: any;
  transform?: G2TransformOptions[];
  statistic?: G2StatisticOptions[];
  scale?: Record<string, G2ScaleOptions>;
  encode?: Record<string, any | G2EncodeOptions>;
  type?: string | ((...args: any[]) => any);
  animate?: Record<string, Primitive>;
  style?: Record<string, Primitive>;
};

export type G2BaseComponentOptions<
  C = G2BaseComponent,
  O = { [key: string | symbol]: any },
> = {
  type?: string | C;
} & O;

export type G2ComponentOptions =
  | G2TransformOptions
  | G2StatisticOptions
  | G2EncodeOptions
  | G2ThemeOptions
  | G2MarkOptions
  | G2CoordinateOptions
  | G2ScaleOptions
  | G2InferOptions
  | G2ShapeOptions
  | G2PaletteOptions
  | G2GuideComponentOptions
  | G2AnimationOptions
  | G2ActionOptions
  | G2InteractionOptions
  | G2InteractorOptions
  | G2CompositionOptions
  | G2AdjustOptions;

export type G2TransformOptions = G2BaseComponentOptions<TransformComponent>;
export type G2StatisticOptions = G2BaseComponentOptions<StatisticComponent>;
export type G2EncodeOptions = G2BaseComponentOptions<EncodeComponent>;
export type G2ThemeOptions = G2BaseComponentOptions<ThemeComponent>;
export type G2MarkOptions = G2BaseComponentOptions<MarkComponent>;
export type G2CoordinateOptions = G2BaseComponentOptions<CoordinateComponent>;
export type G2ScaleOptions = G2BaseComponentOptions<
  ScaleComponent,
  {
    name?: string;
    domain?: any[];
    range?: any[];
    guide?: G2GuideComponentOptions;
    field?: string | string[];
    zero?: boolean;
    [key: string | symbol]: any;
  }
>;
export type G2InferOptions = G2BaseComponentOptions<InferComponent>;
export type G2ShapeOptions = G2BaseComponentOptions<ShapeComponent>;
export type G2PaletteOptions = G2BaseComponentOptions<PaletteComponent>;
export type G2GuideComponentOptions = G2BaseComponentOptions<
  GuideComponentComponent,
  {
    scale?: G2ScaleOptions;
    position?: GuideComponentPosition;
    size?: number;
    order?: number;
    zIndex?: number;
    [key: string | symbol]: any;
  }
>;
export type G2AnimationOptions = G2BaseComponentOptions<AnimationComponent>;
export type G2ActionOptions = G2BaseComponentOptions<ActionComponent>;
export type G2InteractionOptions = G2BaseComponentOptions<InteractionComponent>;
export type G2InteractorOptions = G2BaseComponentOptions<InteractorComponent>;
export type G2CompositionOptions = G2BaseComponentOptions<CompositionComponent>;
export type G2AdjustOptions = G2BaseComponentOptions<AdjustComponent>;

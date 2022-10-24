import { Canvas } from '@antv/g';
import { G2Title, GuideComponentPosition, Layout, Primitive } from './common';
import {
  G2BaseComponent,
  StatisticComponent,
  ThemeComponent,
  G2ComponentNamespaces,
  CoordinateComponent,
  ScaleComponent,
  InferComponent,
  ShapeComponent,
  PaletteComponent,
  GuideComponentComponent,
  AnimationComponent,
  InteractionComponent,
  CompositionComponent,
  AdjustComponent,
  Scale,
  LabelTransformComponent,
} from './component';

import { TransformComponent } from './transform';
import { EncodeComponent } from './encode';
import { MarkComponent } from './mark';
import { DataComponent } from './data';

export type G2ViewTree = {
  width?: number;
  height?: number;
} & Node;

export type Node = {
  type?: string | ((...args: any[]) => any);
  children?: Node[] | ((...args: any[]) => any);
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
  bindAutoFit?: boolean;
};

export type G2View = {
  key?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  inset?: number;
  insetLeft?: number;
  insetTop?: number;
  insetRight?: number;
  insetBottom?: number;
  theme?: G2ThemeOptions;
  title?: G2TitleOptions;
  coordinate?: G2CoordinateOptions[];
  component?: G2GuideComponentOptions[];
  interaction?: G2InteractionOptions[];
  marks?: G2Mark[];
  frame?: boolean;
  adjust?: { type?: string; [key: string]: any };
  labelTransform?: G2LabelTransformOptions[];
};

export type G2Mark = {
  key?: string;
  class?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  data?: any;
  transform?: G2TransformOptions[];
  scale?: Record<string, G2ScaleOptions>;
  encode?: Record<string, any | G2EncodeOptions>;
  type?: string | MarkComponent;
  animate?: Record<string, Primitive>;
  facet?: boolean;
  axis?: boolean | Record<string, any>;
  legend?: boolean | Record<string, any>;
  filter?: (i: number) => boolean;
  children?: G2MarkChildrenCallback;
  dataDomain?: number;
  modifier?: any;
  frame?: boolean;
  style?: Record<string, Primitive>;
  labels?: Record<string, any>[];
};

export type G2MarkChildrenCallback = (
  visualData: Record<string, any>[],
  scale: Record<string, Scale>,
  layout: Layout,
) => Node[];

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
  | G2InteractionOptions
  | G2CompositionOptions
  | G2AdjustOptions
  | G2LabelTransformOptions;

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
export type G2InteractionOptions = G2BaseComponentOptions<InteractionComponent>;
export type G2CompositionOptions = G2BaseComponentOptions<CompositionComponent>;
export type G2AdjustOptions = G2BaseComponentOptions<AdjustComponent>;
export type G2LabelTransformOptions =
  G2BaseComponentOptions<LabelTransformComponent>;
export type G2TitleOptions = G2Title & {
  position?: GuideComponentPosition;
  size?: number;
  zIndex?: number;
};
export type G2DataOptions = G2BaseComponent<DataComponent>;

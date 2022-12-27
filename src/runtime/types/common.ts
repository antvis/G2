import { Coordinate } from '@antv/coord';
import { DisplayObject, TextStyleProps } from '@antv/g';
import { G2GuideComponentOptions, G2Mark, G2ViewTree } from './options';
import { LabelTransform, Scale } from './component';
import { MarkProps } from './mark';
import { G2Theme } from './theme';

export type { G2Theme };

export type G2Title = {
  /**
   * Height of title, default is 30.
   */
  height?: number;
  /**
   * Text of title.
   */
  title?: string;
  /**
   * G.Text style for title.
   */
  style?: Omit<TextStyleProps, 'x' | 'y' | 'text'>;
  /**
   * Text of subtitle.
   */
  subtitle?: string | null;
  /**
   * G.Text style for subtitle.
   */
  subtitleStyle?: Omit<TextStyleProps, 'x' | 'y' | 'text'>;
  /**
   * Align method for title.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * The vertical spacing between title and subtitle, default is 2.
   */
  spacing?: number;
};

export type G2ViewDescriptor = {
  scale: Record<string, Scale>;
  coordinate: Coordinate;
  theme: G2Theme;
  markState: Map<G2Mark, G2MarkState>;
  components: G2GuideComponentOptions[];
  layout: Layout;
  key: string;
  clip: boolean;
  labelTransform?: LabelTransform;
  // @todo More accurate type.
  style: Record<string, any>;
};

export type G2ViewInstance = {
  view: G2ViewDescriptor;
  container: DisplayObject;
  options: G2ViewTree;
  update: (options: G2ViewTree) => Promise<any>;
};

export type ChannelGroups = {
  name?: string;
  scaleKey?: string;
  // @todo
  scale?: Record<string, any>;
  values?: {
    name?: string;
    value?: Primitive[];
    field?: string;
  }[];
};

export type G2MarkState = {
  index?: number[];
  data?: Record<string, any>[];
  channels?: ChannelGroups[];
} & Omit<MarkProps, 'channels'>;

export type MaybeArray<T> = T | T[];

export type Primitive = number | string | boolean | Date;

export type TabularData = Record<string, Primitive>[];

export type WithPrefix<T, P extends string, F = keyof T> = F extends keyof T &
  string
  ? { [key in `${P}${Capitalize<F>}`]?: T[F] }
  : unknown;

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
  range?: any[];
  scaleKey?: string;
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
  | 'centerVertical'
  | 'centerHorizontal'
  | 'center'
  | 'arc'
  | 'arcY'
  | 'arcInner'
  | 'arcCenter';

export type Layout = {
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  insetLeft?: number;
  insetRight?: number;
  insetBottom?: number;
  insetTop?: number;
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  margin?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  marginRight?: number;
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

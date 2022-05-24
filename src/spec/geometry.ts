import { MarkComponent } from '../runtime';
import { Encode } from './encode';
import { Transform } from './transform';
import { Scale } from './scale';
import { Coordinate } from './coordinate';
import { Animation } from './animate';
import { Interaction } from './interaction';
import { Theme } from './theme';

export type Geometry =
  | IntervalGeometry
  | LineGeometry
  | PointGeometry
  | TextGeometry
  | GridGeometry
  | AreaGeometry
  | EdgeGeometry
  | ImageGeometry
  | PolygonGeometry
  | SchemaGeometry
  | AnnotationText
  | CustomComponent;

export type GeometryTypes =
  | 'interval'
  | 'line'
  | 'point'
  | 'text'
  | 'grid'
  | 'area'
  | 'edge'
  | 'image'
  | 'polygon'
  | 'schema'
  | 'annotation.text'
  | 'annotation.lineX'
  | 'annotation.lineY'
  | 'annotation.connector'
  | MarkComponent;

export type ChannelTypes =
  | 'x'
  | 'y'
  | 'color'
  | 'shape'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'enter'
  | 'size'
  | 'tooltip'
  | 'title'
  | 'key';

export type BaseGeometry<
  T extends GeometryTypes,
  C extends string = ChannelTypes,
> = {
  type?: T | string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  data?: any;
  transform?: Transform[];
  encode?: Partial<Record<C, Encode | Encode[]>>;
  scale?: Partial<Record<C, Scale>>;
  coordinate?: Coordinate[];
  style?: Record<string, any>;
  interaction?: Interaction[];
  theme?: Theme;
  adjust?: Adjust;
  facet?: boolean;
  frame?: boolean;
  animate?: {
    enter?: Animation;
  };
};

export type Adjust = { type: 'pack' };

export type IntervalGeometry = BaseGeometry<
  'interval',
  ChannelTypes | 'series'
>;

export type LineGeometry = BaseGeometry<
  'line',
  ChannelTypes | 'position' | `position${number}`
>;

export type PointGeometry = BaseGeometry<'point'>;

export type TextGeometry = BaseGeometry<
  'text',
  | ChannelTypes
  | 'text'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'rotate'
  | 'fontStyle'
  | 'textAlign'
  | 'textBaseline'
>;

export type AnnotationText = BaseGeometry<
  'annotation.text',
  | ChannelTypes
  | 'text'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'rotate'
  | 'fontStyle'
  | 'textAlign'
  | 'textBaseline'
>;

export type AnnotationLineX = BaseGeometry<'annotation.lineX', ChannelTypes>;

export type AnnotationLineY = BaseGeometry<'annotation.lineY', ChannelTypes>;

export type AnnotationConnector = BaseGeometry<
  'annotation.connector',
  ChannelTypes
>;

export type GridGeometry = BaseGeometry<'grid'>;

export type AreaGeometry = BaseGeometry<'area', ChannelTypes>;

export type EdgeGeometry = BaseGeometry<'edge', ChannelTypes>;

export type ImageGeometry = BaseGeometry<'image', ChannelTypes | 'src'>;

export type PolygonGeometry = BaseGeometry<'polygon'>;

export type SchemaGeometry = BaseGeometry<'schema'>;

export type CustomComponent = BaseGeometry<MarkComponent>;

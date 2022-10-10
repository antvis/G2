import { MarkComponent } from '../runtime';
import { Encode } from './encode';
import { Transform } from './transform';
import { Scale } from './scale';
import { Coordinate } from './coordinate';
import { Animation } from './animate';
import { Interaction } from './interaction';
import { Theme } from './theme';
import { Data } from './data';

export type Geometry =
  | IntervalGeometry
  | RectGeometry
  | LineGeometry
  | PointGeometry
  | TextGeometry
  | CellGeometry
  | AreaGeometry
  | NodeGeometry
  | EdgeGeometry
  | ImageGeometry
  | PolygonGeometry
  | BoxGeometry
  | VectorGeometry
  | LineXMark
  | LineYMark
  | RangeMark
  | RangeXMark
  | RangeYMark
  | ConnectorMark
  | CustomComponent;

export type GeometryTypes =
  | 'interval'
  | 'rect'
  | 'line'
  | 'point'
  | 'text'
  | 'cell'
  | 'area'
  | 'node'
  | 'edge'
  | 'link'
  | 'image'
  | 'polygon'
  | 'box'
  | 'vector'
  | 'lineX'
  | 'lineY'
  | 'connector'
  | 'range'
  | 'rangeX'
  | 'rangeY'
  | MarkComponent;

export type ChannelTypes =
  | 'x'
  | 'y'
  | 'x1'
  | 'y1'
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
  | 'key'
  | 'groupKey'
  | 'label';

export type BaseGeometry<
  T extends GeometryTypes,
  C extends string = ChannelTypes,
> = {
  type?: T | string;
  class?: string;
  key?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  data?: Data;
  transform?: Transform[];
  encode?: Partial<Record<C, Encode | Encode[]>>;
  scale?: Partial<Record<C, Scale>>;
  axis?: Partial<Record<'x' | 'y', Axis | boolean>> | boolean;
  legend?: Partial<Record<'size' | 'color', Legend | boolean>> | boolean;
  coordinate?: Coordinate[];
  style?: Record<string, any>;
  interaction?: Interaction[];
  theme?: Theme;
  adjust?: Adjust;
  facet?: boolean;
  frame?: boolean;
  labels?: Record<string, any>[];
  stack?: boolean;
  animate?: {
    enter?: Animation;
    exit?: Animation;
    update?: Animation;
  };
};

export type Adjust = { type: 'pack' };

export type Axis = {
  tickCount?: number;
  tickFormatter?: any;
  tickFilter?: any;
  title?: any;
  [key: string]: any;
};

export type Legend = {
  tickCount?: number;
  tickFormatter?: any;
  tickFilter?: any;
  title?: any;
  position?: string;
  [key: string]: any;
};

export type IntervalGeometry = BaseGeometry<
  'interval',
  ChannelTypes | 'series'
>;

export type RectGeometry = BaseGeometry<'rect', ChannelTypes>;

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

export type LineXMark = BaseGeometry<'lineX', ChannelTypes>;

export type LineYMark = BaseGeometry<'lineY', ChannelTypes>;

export type RangeMark = BaseGeometry<'range', ChannelTypes>;

export type RangeXMark = BaseGeometry<'rangeX', ChannelTypes>;

export type RangeYMark = BaseGeometry<'rangeY', ChannelTypes>;

export type ConnectorMark = BaseGeometry<'connector', ChannelTypes>;

export type CellGeometry = BaseGeometry<'cell'>;

export type AreaGeometry = BaseGeometry<'area', ChannelTypes>;

export type NodeGeometry = BaseGeometry<'node', ChannelTypes>;

export type EdgeGeometry = BaseGeometry<'edge', ChannelTypes>;

export type LinkGeometry = BaseGeometry<'link', ChannelTypes>;

export type ImageGeometry = BaseGeometry<'image', ChannelTypes | 'src'>;

export type PolygonGeometry = BaseGeometry<'polygon'>;

export type BoxGeometry = BaseGeometry<'box'>;

export type VectorGeometry = BaseGeometry<
  'vector',
  ChannelTypes | 'rotate' | 'size'
>;

export type CustomComponent = BaseGeometry<MarkComponent>;

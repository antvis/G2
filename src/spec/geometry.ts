import { MarkComponent } from '../runtime';
import { Encode } from './encode';
import { Transform } from './transform';
import { Scale } from './scale';
import { Coordinate } from './coordinate';
import { Statistic } from './statistic';
import { Animation } from './animate';

export type Geometry =
  | IntervalGeometry
  | LineGeometry
  | PointGeometry
  | CustomComponent;

export type GeometryTypes = 'interval' | 'line' | 'point' | MarkComponent;

export type ChannelTypes =
  | 'x'
  | 'y'
  | 'color'
  | 'shape'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'size';

export type BaseGeometry<
  T extends GeometryTypes,
  C extends string = ChannelTypes,
> = {
  type?: T;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  data?: any;
  transform?: Transform[];
  encode?: Partial<Record<C, Encode | Encode[]>>;
  scale?: Partial<Record<C, Scale>>;
  coordinate?: Coordinate[];
  statistic?: Statistic[];
  style?: Record<string, any>;
  animate?: {
    enter?: Animation;
  };
  zIndex?: number;
};

export type IntervalGeometry = BaseGeometry<
  'interval',
  ChannelTypes | 'series'
>;

export type LineGeometry = BaseGeometry<
  'line',
  ChannelTypes | 'position' | `position[${number}]` | 'size'
>;

export type PointGeometry = BaseGeometry<'point'>;

export type CustomComponent = BaseGeometry<MarkComponent>;

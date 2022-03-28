import { MarkComponent } from '../runtime';
import { Encode } from './encode';
import { Transform } from './transform';
import { Scale } from './scale';
import { Coordinate } from './coordinate';
import { Statistic } from './statistic';
import { Animation } from './animate';

export type Geometry = IntervalGeometry | LineGeometry | CustomComponent;

export type GeometryTypes = 'interval' | 'line' | MarkComponent;

export type ChannelTypes =
  | 'x'
  | 'y'
  | 'color'
  | 'shape'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay';

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

export type IntervalGeometry = BaseGeometry<'interval'>;

export type LineGeometry = BaseGeometry<
  'line',
  ChannelTypes | 'position' | `position[${number}]` | 'size'
>;

export type CustomComponent = BaseGeometry<MarkComponent>;

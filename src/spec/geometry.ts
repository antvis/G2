import { MarkComponent } from '../runtime';
import { Encode } from './encode';
import { Transform } from './transform';
import { Scale } from './scale';
import { Coordinate } from './coordinate';
import { Statistic } from './statistic';
import { Animation } from './animate';

export type Geometry = IntervalGeometry | CustomComponent;

export type GeometryTypes = 'interval' | MarkComponent;

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

export type BaseGeometry<T extends GeometryTypes> = {
  type?: T;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  data?: any;
  transform?: Transform[];
  encode?: Partial<Record<ChannelTypes, Encode | Encode[]>>;
  scale?: Partial<Record<ChannelTypes, Scale>>;
  coordinate?: Coordinate[];
  statistic?: Statistic[];
  style?: Record<string, any>;
  animate?: {
    enter?: Animation;
  };
};

export type IntervalGeometry = BaseGeometry<'interval'>;

export type CustomComponent = BaseGeometry<MarkComponent>;

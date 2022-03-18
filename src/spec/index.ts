import { TabularData } from '../runtime';
import { Encode } from './encode';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Scale } from './scale';
import { Transform } from './transform';
import { Statistic } from './statistic';

export type G2Spec = {
  width?: number;
  height?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  type?: 'interval';
  data?: TabularData;
  transform?: Transform[];
  encode?: Partial<Record<ChannelTypes, Encode | Encode[]>>;
  scale?: Partial<Record<ChannelTypes, Scale>>;
  coordinate?: Coordinate[];
  statistic?: Statistic[];
  theme?: Theme;
  style?: Record<string, any>;
};

export type ChannelTypes = 'x' | 'y' | 'color' | 'shape' | 'series';

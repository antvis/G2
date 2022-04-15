import { Geometry } from './geometry';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';

export type View = {
  type?: 'view';
  data?: any;
  key?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  coordinate?: Coordinate[];
  interaction?: Interaction[];
  theme?: Theme;
  children?: Geometry[];
};

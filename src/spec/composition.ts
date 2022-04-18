import { Geometry } from './geometry';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';

export type Node = Geometry | View | Layer | Flex;

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

export type Layer = {
  type?: 'layer';
  key?: string;
  data?: any;
  children?: Node[];
};

export type Flex = {
  type?: 'flex';
  key?: string;
  data?: any;
  direction?: 'col' | 'row';
  flex?: number[];
  padding?: number;
  children?: Node[];
};

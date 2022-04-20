import { Geometry } from './geometry';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';

export type Node =
  | MarkComposition
  | ViewComposition
  | LayerComposition
  | FlexComposition;

export type MarkComposition = Geometry;

export type ViewComposition = {
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
  children?: MarkComposition[];
};

export type LayerComposition = {
  type?: 'layer';
  key?: string;
  data?: any;
  children?: Node[];
};

export type FlexComposition = {
  type?: 'flex';
  key?: string;
  data?: any;
  direction?: 'col' | 'row';
  flex?: number[];
  padding?: number;
  children?: Node[];
};

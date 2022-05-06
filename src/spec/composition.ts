import { Geometry, Adjust } from './geometry';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';
import { Transform } from './transform';
import { Scale } from './scale';

export type Node =
  | MarkComposition
  | ViewComposition
  | LayerComposition
  | FlexComposition
  | RectComposition;

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
  adjust?: Adjust;
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

export type FacetContext = {
  columnField?: string | number;
  columnIndex?: number;
  columnValue?: string | number;
  columnValuesLength?: number;
  rowField?: string | number;
  rowIndex?: number;
  rowValue?: string | number;
  rowValuesLength?: number;
};

export type RectComposition = {
  transform?: Transform;
  data?: any;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  type?: 'rect';
  encode?: {
    x?: string;
    y?: string;
  };
  scale?: {
    x?: Scale;
    y?: Scale;
  };
  shareData?: boolean;
  shareSize?: boolean;
  children?: Node[] | ((facet: FacetContext) => Node);
};

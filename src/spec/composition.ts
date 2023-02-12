import { Geometry, Adjust } from './geometry';
import { Theme } from './theme';
import { Coordinate, CoordinateTransform } from './coordinate';
import { Interaction } from './interaction';
import { Transform } from './transform';
import { Scale } from './scale';
import { Title } from './title';
import { Data } from './data';
import { LabelTransform } from './labelTransform';
import { Encode } from './encode';
import { Literal2Object } from './utils';

export type Node =
  | MarkComposition
  | ViewComposition
  | SpaceLayerComposition
  | SpaceFlexComposition
  | RepeatMatrixComposition
  | FacetRectComposition
  | FacetCircleComposition
  | GeoViewComposition
  | TimingKeyframeComposition;

export type MarkComposition = Geometry & {
  title?: Title;
  clip?: boolean;
};

export type ViewComposition = {
  type?: 'view';
  width?: number;
  height?: number;
  data?: Data;
  key?: string;
  class?: string;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  marginRight?: number;
  inset?: number;
  insetLeft?: number;
  insetTop?: number;
  insetBottom?: number;
  insetRight?: number;
  coordinate?: Coordinate & { transform?: CoordinateTransform[] };
  interaction?: Literal2Object<Interaction>;
  transform?: Transform[];
  title?: Title;
  theme?: Theme;
  children?: MarkComposition[];
  scale?: Record<string, Scale>;
  labelTransform?: LabelTransform[];
  // @todo
  axis?: Record<string, any>;
  // @todo
  legend?: Record<string, any>;
  // @todo
  style?: Record<string, any>;
  clip?: boolean;
};

export type SpaceLayerComposition = {
  type?: 'spaceLayer';
  key?: string;
  data?: any;
  children?: Node[];
};

export type SpaceFlexComposition = {
  type?: 'spaceFlex';
  key?: string;
  data?: Data;
  direction?: 'col' | 'row';
  ratio?: number[];
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

export type FacetRectComposition = {
  type?: 'facetRect';
  transform?: Transform;
  data?: Data;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  marginRight?: number;
  key?: string;
  title?: Title;
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
  // @todo
  axis?: Record<string, any>;
  // @todo
  legend?: Record<string, any>;
};

export type RepeatMatrixComposition = {
  type?: 'repeatMatrix';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  marginRight?: number;
  transform?: Transform;
  title?: Title;
  data?: Data;
  key?: string;
  encode?: {
    x?: string[] | string;
    y?: string[] | string;
    position?: string[];
  };
  scale?: {
    x?: Scale;
    y?: Scale;
  };
  // @todo
  axis?: Record<string, any>;
  // @todo
  legend?: Record<string, any>;
  children?: Node[] | ((facet: FacetContext) => Node);
};

export type FacetCircleComposition = {
  type?: 'facetCircle';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  marginRight?: number;
  transform?: Transform;
  title?: Title;
  data?: Data;
  key?: string;
  encode?: {
    position?: string;
  };
  scale?: {
    x?: Scale;
    y?: Scale;
  };
  children?: Node[] | ((facet: FacetContext) => Node);
  // @todo
  axis?: Record<string, any>;
  // @todo
  legend?: Record<string, any>;
};

export type TimingKeyframeComposition = {
  type?: 'TimingKeyframe';
  duration?: number;
  key?: string;
  easing?: string;
  iterationCount?: 'infinite' | number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'reverse-alternate';
  children?: Node[];
};

export type GeoViewComposition = Omit<ViewComposition, 'type'> & {
  type?: 'geoView';
  // @todo
  coordinate?: Record<string, any>;
};

export type GeoPathComposition = Omit<GeoViewComposition, 'type'> & {
  type?: 'geoView';
  encode?: Record<string, Encode>;
};

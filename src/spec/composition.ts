import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';
import { Transform } from './transform';
import { Scale } from './scale';
import { Data } from './data';
import { LabelTransform } from './labelTransform';
import { Literal2Object } from './utils';
import { TitleComponent } from './component';
import { Mark } from './mark';

export type Composition =
  | ViewComposition
  | GeoViewComposition
  | GeoPathComposition
  | SpaceLayerComposition
  | SpaceFlexComposition
  | RepeatMatrixComposition
  | FacetRectComposition
  | FacetCircleComposition
  | TimingKeyframeComposition;

export type CompositionTypes =
  | 'view'
  | 'getView'
  | 'geoPath'
  | 'spaceLayer'
  | 'spaceFlex'
  | 'facetRect'
  | 'facetCircle'
  | 'repeatMatrix'
  | 'timingKeyframe';

export type ViewComposition = {
  type?: 'view';
  x?: number;
  y?: number;
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
  coordinate?: Coordinate;
  interaction?: Literal2Object<Interaction>;
  transform?: Transform[];
  title?: string | TitleComponent;
  theme?: Theme;
  children?: Mark[];
  scale?: Record<string, Scale>;
  frame?: boolean;
  labelTransform?: LabelTransform[];
  // @todo
  axis?: Record<string, any>;
  // @todo
  legend?: Record<string, any>;
  // @todo
  style?: Record<string, any>;
  clip?: boolean;
};

export type GeoViewComposition = Omit<ViewComposition, 'type'> & {
  type?: 'geoView';
  // @todo
  coordinate?: Record<string, any>;
};

export type GeoPathComposition = Omit<ViewComposition, 'type'> & {
  type?: 'geoPath';
  // @todo
  coordinate?: Record<string, any>;
  [key: string]: any; // @todo
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
  title?: string | TitleComponent;
  encode?: {
    x?: string;
    y?: string;
  };
  scale?: {
    x?: Scale;
    y?: Scale;
    color?: Scale;
  };
  shareData?: boolean;
  shareSize?: boolean;
  children?: Node[] | ((facet: FacetContext) => Node);
  // @todo
  axis?: Record<string, any> | boolean;
  // @todo
  legend?: Record<string, any> | boolean;
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
  title?: string | TitleComponent;
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
    color?: Scale;
  };
  // @todo
  axis?: Record<string, any> | boolean;
  // @todo
  legend?: Record<string, any> | boolean;
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
  title?: string | TitleComponent;
  data?: Data;
  key?: string;
  encode?: {
    position?: string;
  };
  scale?: {
    x?: Scale;
    y?: Scale;
    color?: Scale;
  };
  children?: Node[] | ((facet: FacetContext) => Node);
  // @todo
  axis?: Record<string, any> | boolean;
  // @todo
  legend?: Record<string, any> | boolean;
};

export type TimingKeyframeComposition = {
  type?: 'timingKeyframe';
  duration?: number;
  key?: string;
  easing?: string;
  iterationCount?: 'infinite' | number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'reverse-alternate';
  children?: Node[];
};

type Node = Mark | Composition;

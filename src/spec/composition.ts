import { Geometry, Adjust } from './geometry';
import { Theme } from './theme';
import { Coordinate } from './coordinate';
import { Interaction } from './interaction';
import { Transform } from './transform';
import { Scale } from './scale';
import { Title } from './title';
import { Data } from './data';
import { LabelTransform } from './labelTransform';
import { Encode } from './encode';

type EventType = (...args: any[]) => void;

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
  coordinate?: Coordinate[];
  interaction?: Interaction[];
  transform?: Transform[];
  title?: Title;
  theme?: Theme;
  children?: MarkComposition[];
  scale?: Record<string, Scale>;
  adjust?: Adjust;
  labelTransform?: LabelTransform[];
  on?: Record<string, EventType | EventType[]>;
  // @todo
  style?: Record<string, any>;
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
    x?: string[];
    y?: string[];
    position?: string[];
  };
  scale?: {
    x?: Scale;
    y?: Scale;
  };
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
  projection?: Record<string, any>;
};

export type GeoPathComposition = Omit<GeoViewComposition, 'type'> & {
  type?: 'geoView';
  encode?: Record<string, Encode>;
};

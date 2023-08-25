import { TextStyleProps, PathStyleProps } from '@antv/g';
import { G2Title, WithPrefix } from './common';

type TupleToUnion<T, U> = T extends [infer F, ...infer R]
  ? F extends string
    ? { [key in F]?: U } & TupleToUnion<R, U>
    : never
  : any;

type NestUnion<K extends string, T, U> = {
  [key in K extends string ? K : never]?: TupleToUnion<T, U>;
};

type ElementStyle = {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
  r?: number;
};

type ConnectorStyleProps = PathStyleProps & {
  length?: number;
  length2?: number;
  distance?: number;
};

type LabelStyleProps = {
  offset?: number;
  connector?: boolean;
} & Omit<TextStyleProps, 'text'> &
  WithPrefix<ConnectorStyleProps, 'connector'>;

type MarkTheme = NestUnion<'interval', ['rect', 'hollowRect'], ElementStyle> &
  NestUnion<'rect', ['rect', 'hollowRect'], ElementStyle> &
  NestUnion<'line', ['line'], ElementStyle> &
  NestUnion<'point', ['point', 'hollowPoint'], ElementStyle> &
  NestUnion<'text', ['text'], ElementStyle> &
  NestUnion<'cell', ['rect'], ElementStyle> &
  NestUnion<'area', ['area'], ElementStyle> &
  NestUnion<'link', ['link'], ElementStyle> &
  NestUnion<'image', ['image'], ElementStyle> &
  NestUnion<'polygon', ['polygon'], ElementStyle> &
  NestUnion<'box', ['box'], ElementStyle> &
  NestUnion<'vector', ['vector'], ElementStyle> &
  NestUnion<'edge', ['edge'], ElementStyle> &
  NestUnion<'node', ['node'], ElementStyle> &
  NestUnion<'lineX', ['line'], ElementStyle> &
  NestUnion<'lineY', ['line'], ElementStyle> &
  NestUnion<'range', ['range'], ElementStyle> &
  NestUnion<'rangeX', ['range'], ElementStyle> &
  NestUnion<'rangeY', ['range'], ElementStyle> &
  NestUnion<
    'connector',
    ['connector'],
    ElementStyle & {
      endMarker?: ElementStyle;
    }
  >;

// @todo
type InteractionTheme = {
  tooltip?: Record<string, unknown>;
  elementHighlight?: Record<string, unknown>;
  elementSelect?: Record<string, unknown>;
};

type ComponentTheme = {
  axis?: any;
  axisX?: any;
  axisY?: any;
  axisLinear?: any;
  axisTop?: any;
  axisBottom?: any;
  axisLeft?: any;
  axisRight?: any;
  axisRadar?: any;
  axisArc?: any;
  legend?: any;
  legendCategory?: any;
  legendContinuous?: any;
  label?: LabelStyleProps;
  innerLabel?: LabelStyleProps;
  htmlLabel?: any;
  slider?: any;
  scrollbar?: any;
  title?: any; // @todo
};

type AnimationTheme = {
  enter?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
  exit?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
  update?: {
    duration?: number;
    delay?: number;
    fill?: string;
  };
};

type AreaTheme = {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeOpacity?: number;
  lineWidth?: number;
};

export type G2Theme = {
  padding?: 'auto' | number;
  inset?: 'auto' | number;
  margin?: number;
  color?: string;
  category10?: string | string[];
  category20?: string | string[];
  size?: number;
  view?: WithPrefix<AreaTheme, 'view'> &
    WithPrefix<AreaTheme, 'plot'> &
    WithPrefix<AreaTheme, 'main'> &
    WithPrefix<AreaTheme, 'content'>;
} & MarkTheme &
  ComponentTheme &
  AnimationTheme &
  InteractionTheme;

import { TextStyleProps, PathStyleProps } from '@antv/g';
import { G2Title, WithPrefix } from './common';
import { G2Token } from './token';

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
  animate?: AnimationTheme;
  style?: Omit<TextStyleProps, 'text'> &
    WithPrefix<ConnectorStyleProps, 'connector'> & {
      innerLabel: Record<string, any>;
      offset?: number;
      connector?: boolean;
    };
};

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

type InteractionTheme = {
  interaction?: {
    tooltip: MarkTheme;
    elementHighlight: MarkTheme;
  };
};

type ComponentTheme = {
  axis?: any;
  axisLinear?: any;
  axisTop?: any;
  axisBottom?: any;
  axisLeft?: any;
  axisRight?: any;
  axisRadar?: any;
  axisArc?: any;
  legendCategory?: any;
  legendContinuous?: any;
  label?: LabelStyleProps;
  innerLabel?: LabelStyleProps;
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

type ViewTheme = WithPrefix<AreaTheme, 'view' | 'plot' | 'main' | 'content'>;

type PaletteTheme = {
  defaultColor?: string | string[];
  category10?: string | string[];
  category20?: string | string[];
};

export type G2Theme = {
  token?: G2Token;
  view?: ViewTheme;
  palette?: PaletteTheme;
  animate?: AnimationTheme;
} & MarkTheme &
  ComponentTheme &
  AnimationTheme &
  InteractionTheme;

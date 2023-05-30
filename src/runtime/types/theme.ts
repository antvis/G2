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
  style?: {
    innerLabel?: LabelStyleProps['style'];
    offset?: number;
    connector?: boolean;
  } & Omit<TextStyleProps, 'text'> &
    WithPrefix<ConnectorStyleProps, 'connector'>;
  animate?: AnimationTheme;
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
    tooltip?: Record<string, any>;
    elementHighlight?: Record<string, any>;
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
  legend?: any;
  continuousLegend?: any;
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
  InteractionTheme;

// ----- Token ------
export type FontToken = {
  fontFamily?: string;
  fontWeight?: TextStyleProps['fontWeight'];
  fontSize?: number;
  lineHeight?: number;
  fontColor?: string;

  fontSizeH1?: number;
  fontSizeH2?: number;
  fontSizeH3?: number;
  fontSizeH4?: number;
  fontSizeH5?: number;
  fontWeightNormal?: TextStyleProps['fontWeight'];
  fontWeightLighter?: TextStyleProps['fontWeight'];
  fontWeightStrong?: TextStyleProps['fontWeight'];
  fontColorLight?: string;
  fontColorDark?: string;
};

export type ColorToken = {
  transparent?: string;
  dark?: string;
  white?: string;
  red?: string;
  green?: string;
  yellow?: string;

  dark1?: string;
  dark2?: string;
  dark3?: string;
  dark4?: string;
  dark5?: string;
  dark6?: string;
  dark7?: string;
  dark8?: string;
  white1?: string;
  white2?: string;
  white3?: string;
  white4?: string;
  white5?: string;
  white6?: string;
  white7?: string;
  white8?: string;
};

export type StyleToken = {
  lineWidth?: number;
  lineDash?: string;
  radius?: number;
  r?: number;

  lineWidth0?: number;
  lineWidth1?: number;
  lineWidth2?: number;
  lineWidth3?: number;
  lineWidth4?: number;
  lineWidth5?: number;
  lineWidth6?: number;
  lineDashSolid?: number[];
  lineDashDotted?: number[];
  radius0?: number;
  radius1?: number;
  radius2?: number;
  radius3?: number;
  radius4?: number;
  radius5?: number;
  radius6?: number;
  r0?: number;
  r1?: number;
  r2?: number;
  r3?: number;
  r4?: number;
  r5?: number;
  r6?: number;
};

export type FillToken = {
  fill?: string;
  fillOpacity?: number;
};

export type PaletteToken = {
  defaultColor?: string | string[];
  category10?: string[] | string;
  category20?: string[] | string;
};

type AnimateTokenOptions = {
  duration?: number;
  fill?: string;
  delay?: number;
};
export type AnimateToken = {
  enter?: AnimateTokenOptions;
  update?: AnimateTokenOptions;
  exit?: AnimateTokenOptions;
};

export type G2Token = {
  font?: FontToken;
  color?: ColorToken;
  style?: StyleToken;
  fill?: FillToken;
  palette?: PaletteToken;
  animate?: AnimateToken;
};

import { TextStyleProps } from '@antv/g';

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
  defaultStroke?: string | string[];
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

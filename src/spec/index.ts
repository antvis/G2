import { Theme } from './theme';
import { Geometry } from './geometry';

export type G2Spec = {
  width?: number;
  height?: number;
  theme?: Theme;
} & Geometry;

export * from './transform';
export * from './encode';
export * from './statistic';
export * from './scale';
export * from './palette';
export * from './coordinate';
export * from './geometry';

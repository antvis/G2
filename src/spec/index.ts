import { Theme } from './theme';
import { Geometry } from './geometry';
import { View } from './composition';

export type Node = Geometry | View;
export type G2Spec = Node & {
  width?: number;
  height?: number;
};

export * from './transform';
export * from './encode';
export * from './statistic';
export * from './scale';
export * from './palette';
export * from './coordinate';
export * from './geometry';
export * from './animate';
export * from './interaction';
export * from './action';

import { Node } from './composition';

export type G2Spec = Node & {
  width?: number;
  height?: number;
};

export * from './transform';
export * from './encode';
export * from './data';
export * from './scale';
export * from './palette';
export * from './coordinate';
export * from './geometry';
export * from './animate';
export * from './interaction';
export * from './action';
export * from './composition';
export * from './labelTransform';

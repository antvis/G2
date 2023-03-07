import { Composition } from './composition';
import { Mark } from './mark';

export type G2Spec = (Mark | Composition) & {
  width?: number;
  height?: number;
};

export * from './animate';
export * from './component';
export * from './composition';
export * from './coordinate';
export * from './coordinateTransform';
export * from './data';
export * from './dataTransform';
export * from './encode';
export * from './interaction';
export * from './labelTransform';
export * from './mark';
export * from './scale';
export * from './palette';
export * from './theme';
export * from './transform';

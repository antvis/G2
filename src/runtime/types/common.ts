import { Canvas } from '@antv/g';
import { G2Component, G2ComponentNamespaces } from './component';

export type G2ViewTree = {
  width?: number;
  height?: number;
} & Node;

export type Node = {
  type?: string;
  children?: Node[];
  [key: string]: any;
};

export type G2Library = Record<
  `${G2ComponentNamespaces}.${string}`,
  G2Component
>;

export type G2Context = {
  library?: G2Library;
  canvas?: Canvas;
};

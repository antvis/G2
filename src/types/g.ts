export { Canvas, Group } from '@antv/g';

export type Shape = any;

export type PathCommand = any;

export type ShapeAttrs = any;

/** 自定义 Shape marker 的函数 */
export type ShapeMarkerSymbol = (x: number, y: number, r: number) => PathCommand[];

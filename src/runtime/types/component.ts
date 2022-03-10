import { Canvas } from '@antv/g';
import { Primitive } from './common';

export type G2ComponentNamespaces = 'renderer';

export type G2Component = RendererComponent;

export type G2BaseComponent<
  R,
  O = Record<string, unknown> | void,
  P = Record<string, unknown>,
> = {
  (options?: O): R;
  props?: P;
};

export type Renderer = Canvas;
export type RendererComponent<O = Record<string, unknown>> = G2BaseComponent<
  Renderer,
  O
>;

export type Encode = (data: Record<string, Primitive>[]) => Primitive[];
export type EncodeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Encode,
  O
>;

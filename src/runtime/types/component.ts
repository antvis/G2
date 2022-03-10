import { Canvas } from '@antv/g';
import { Encodings, Primitive, MaybeArray, EncodeFunction } from './common';

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

export type Encode = EncodeFunction;
export type EncodeComponent<O = Record<string, unknown>> = G2BaseComponent<
  Encode,
  O
>;

export type Infer = (encodings: Encodings) => Encodings;
export type InferComponent<O = void> = G2BaseComponent<Infer, O>;

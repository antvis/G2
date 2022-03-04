import { Canvas } from '@antv/g';

export type G2Context = {
  library?: Record<string, unknown>;
  canvas?: Canvas;
};

export type G2Component<O = Record<string, unknown>, R = any> = {
  (options: O): R;
  props: Record<string, unknown>;
};

export type Renderer = Canvas;
export type RendererComponent<O> = G2Component<O, Renderer>;

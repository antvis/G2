import { runtime } from '@antv/g';

runtime.enableCSSParsing = false;

export {
  render,
  renderToMountedElement,
  MAIN_LAYER_CLASS_NAME,
  LABEL_LAYER_CLASS_NAME,
  ELEMENT_CLASS_NAME,
  VIEW_CLASS_NAME,
  PLOT_CLASS_NAME,
  COMPONENT_CLASS_NAME,
  LABEL_CLASS_NAME,
  AREA_CLASS_NAME,
} from './runtime';

export {
  corelib,
  stdlib,
  litelib,
  graphlib,
  plotlib,
  geolib,
  threedlib,
} from './lib';

export * from './mark';

export {
  Chart,
  MarkNode,
  CompositionNode,
  register,
  Runtime,
  extend,
  type ChartOptions,
} from './api';

export { ChartEvent } from './utils/event';

export type { G2Context } from './runtime';

export * from './spec';

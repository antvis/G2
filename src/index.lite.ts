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
  MASK_CLASS_NAME,
} from './runtime';

export { corelib } from './lib';

export {
  Chart,
  type MarkNode,
  type CompositionNode,
  register,
  Runtime,
  extend,
  type ChartOptions,
} from './api';

export { ChartEvent } from './utils/event';

export type { G2Context } from './runtime';

export * from './spec';

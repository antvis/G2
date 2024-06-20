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

export {
  type MarkNode,
  type CompositionNode,
  register,
  Runtime,
  extend,
  type ChartOptions,
} from './api';

export { ChartEvent } from './utils/event';

export * from './spec';

export type {
  G2Context,
  ShapeComponent,
  MarkComponent,
  GuideComponentComponent,
  SingleMark,
  G2BaseComponent,
  Vector2,
  Vector3,
  Channel,
} from './runtime';
export { select, Selection } from './utils/selection';
export * from './transform';
export { LinearAxis } from './component/axis';
export type { AxisOptions } from './component/axis';

export { Light, Dark, Academy, Classic, ClassicDark } from './theme';

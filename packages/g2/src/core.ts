import * as Util from '@antv/util';
import * as G from '@antv/g';
import * as Interface from './interface';
export { Util };
export { G };
export { Interface };
export { default as Plot } from './plot/plot';
export { default as View } from './plot/view';
export { registerElement, getElement, Element } from './element';
export { registerShape, registerShapeFactory, getShapeFactory } from './element/shape/base';
export { registerFacet, Facet } from './facet';
export { registerInteraction, getInteraction, Interaction } from './interaction';
export { default as Global, setTheme, version } from './global';
export { registerTheme } from './theme';

export * from './dependents';

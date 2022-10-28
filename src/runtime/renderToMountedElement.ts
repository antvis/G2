import type { DisplayObject } from '@antv/g';
import { createLibrary } from '../stdlib';
import { select } from '../utils/selection';
import { emitEvent, CHART_LIFE_CIRCLE } from '../utils/event';
import { G2Context, G2ViewTree } from './types/options';
import { plot } from './plot';
import { bindAutoFit, inferKeys } from './render';

export function renderToMountedElement<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  callback?: () => void,
): DisplayObject {
  // Initialize the context if it is not provided.
  const { width = 640, height = 480, autoFit = false, on } = options;
  const keyed = inferKeys(options);
  const { library = createLibrary(), group } = context;

  const selection = select(group);
  if (!selection) {
    return;
  }

  context.group = group;
  context.library = library;

  if (autoFit && !context.bindAutoFit) {
    // Bind the autoFit event once.
    bindAutoFit(options, context);
    context.bindAutoFit = true;
  }

  emitEvent(on, CHART_LIFE_CIRCLE.BEFORE_RENDER);
  // Plot the chart and mutate context.
  // Make sure that plot chart after container is ready for every time.
  plot<T>({ ...keyed, width, height }, selection, library)
    .then(callback)
    .then(() => emitEvent(on, CHART_LIFE_CIRCLE.AFTER_RENDER));

  // Return the Group wraps the canvas or svg element.
  return group;
}

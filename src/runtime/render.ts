import { createLibrary } from '../stdlib';
import { Canvas } from '../renderer';
import { G2Context, G2ViewTree } from './types/options';
import { plot } from './plot';

export function render<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
): HTMLElement {
  // Initialize the context if it is not provided.
  const { width = 640, height = 480 } = options;
  const {
    canvas = Canvas({
      width,
      height,
      container: document.createElement('div'),
    }),
    library = createLibrary(),
    viewTree = {},
  } = context;
  context.canvas = canvas;
  context.library = library;
  context.viewTree = viewTree;

  // Plot the chart and mutate the inner states of canvas.
  plot<T>({ ...options, width, height }, context);

  // Return the container HTML element wraps the canvas or svg element.
  return normalizeContainer(canvas.getConfig().container);
}

function normalizeContainer(container: HTMLElement | string): HTMLElement {
  return typeof container === 'string'
    ? document.getElementById(container)
    : container;
}

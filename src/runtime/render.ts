import { createLibrary } from '../stdlib';
import { Canvas } from '../renderer';
import { select } from '../utils/selection';
import { G2Context, G2ViewTree } from './types/options';
import { plot } from './plot';

export function render<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  callback?: () => void,
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
  } = context;
  context.canvas = canvas;
  context.library = library;

  // Plot the chart and mutate context.
  // Using requestAnimationFrame to make sure that plot chart after mounting container.
  const selection = select(canvas.document.documentElement);
  requestAnimationFrame(() =>
    plot<T>({ ...options, width, height }, selection, library).then(callback),
  );

  // Return the container HTML element wraps the canvas or svg element.
  return normalizeContainer(canvas.getConfig().container);
}

function normalizeContainer(container: HTMLElement | string): HTMLElement {
  return typeof container === 'string'
    ? document.getElementById(container)
    : container;
}

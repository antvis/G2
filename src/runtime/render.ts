import { G2Spec } from '../spec';
import { createLibrary } from '../stdlib';
import { Canvas } from '../renderer';
import { G2Context } from './types';
import { plot } from './plot';

export function render(options: G2Spec, context: G2Context = {}): HTMLElement {
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

  // Plot the chart and mutate the inner states of canvas.
  plot(options, { canvas, library });

  // Return the container HTML element wraps the canvas or svg element.
  return coerceHTMLElement(canvas.getConfig().container);
}

function coerceHTMLElement(container: HTMLElement | string): HTMLElement {
  return typeof container === 'string' ? document.getElementById(container) : container;
}

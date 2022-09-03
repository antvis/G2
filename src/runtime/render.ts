import { CanvasEvent } from '@antv/g';
import { deepMix } from '@antv/util';
import { createLibrary } from '../stdlib';
import { Canvas } from '../renderer';
import { select } from '../utils/selection';
import { G2Context, G2ViewTree } from './types/options';
import { plot } from './plot';

/**
 * Infer key for each node of view tree.
 * Each key should be unique in the entire view tree.
 * The key is for incremental render when view tree is changed.
 * @todo Fix custom key equals to inferred key.
 */
function inferKeys<T extends G2ViewTree = G2ViewTree>(options: T): T {
  const root = deepMix({}, options);
  const nodeParent = new Map<T, T>([[root, null]]);
  const nodeIndex = new Map<T, number>([[null, -1]]);
  const discovered = [root];
  while (discovered.length) {
    const node = discovered.shift();
    // If key of node is not specified, using parentKey and the index for it
    // in parent.children as its key.
    // e.g. The key of node named 'a' will be 'a', and the key of node named
    // 'b' will be 'parent-1' in the following view tree specification.
    // { key: 'parent', children: [{ name: 'a', key: 'a' }, { name: 'b' }] }
    if (node.key === undefined) {
      const parent = nodeParent.get(node);
      const index = nodeIndex.get(node);
      const key = parent === null ? `${0}` : `${parent.key}-${index}`;
      node.key = key;
    }
    const { children = [] } = node;
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        nodeParent.set(child, node);
        nodeIndex.set(child, i);
        discovered.push(child);
      }
    }
  }
  return root;
}

export function render<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  callback?: () => void,
): HTMLElement {
  // Initialize the context if it is not provided.
  const { width = 640, height = 480 } = options;
  const keyed = inferKeys(options);
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
  // Make sure that plot chart after container is ready for every time.
  const selection = select(canvas.document.documentElement);
  canvas.ready
    .then(() => plot<T>({ ...keyed, width, height }, selection, library))
    .then(callback);

  // Return the container HTML element wraps the canvas or svg element.
  return normalizeContainer(canvas.getConfig().container);
}

function normalizeContainer(container: HTMLElement | string): HTMLElement {
  return typeof container === 'string'
    ? document.getElementById(container)
    : container;
}

import { Canvas as GCanvas, DisplayObject, Group } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { deepMix } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { createLibrary } from '../stdlib';
import { select } from '../utils/selection';
import { ChartEvent } from '../utils/event';
import { error } from '../utils/helper';
import { G2Context, G2ViewTree } from './types/options';
import { plot } from './plot';
import { VIEW_CLASS_NAME } from './constant';

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

function Canvas(width: number, height: number): GCanvas {
  const renderer = new CanvasRenderer();
  // DragAndDropPlugin is for interaction.
  renderer.registerPlugin(new DragAndDropPlugin());
  return new GCanvas({
    width,
    height,
    container: document.createElement('div'),
    renderer: renderer,
  });
}

export function render<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  resolve?: () => void,
  reject?: (e: Error) => void,
): HTMLElement {
  // Initialize the context if it is not provided.
  const { width = 640, height = 480, theme } = options;
  if (!theme) {
    error(
      'ChartOptions.theme is required, such as `const chart = new Chart({ theme: "classic"})`.',
    );
  }
  const keyed = inferKeys(options);
  const {
    canvas = Canvas(width, height),
    library = createLibrary(),
    emitter = new EventEmitter(),
  } = context;
  context.canvas = canvas;
  context.library = library;
  context.emitter = emitter;
  canvas.resize(width, height);

  emitter.emit(ChartEvent.BEFORE_RENDER);

  // Plot the chart and mutate context.
  // Make sure that plot chart after container is ready for every time.
  const selection = select(canvas.document.documentElement);
  canvas.ready
    .then(() =>
      plot<T>({ ...keyed, width, height }, selection, library, context),
    )
    .then(() => {
      // Wait for the next tick.
      canvas.requestAnimationFrame(() => {
        emitter.emit(ChartEvent.AFTER_RENDER);
        resolve?.();
      });
    })
    .catch((e) => {
      reject?.(e);
    });

  // Return the container HTML element wraps the canvas or svg element.
  return normalizeContainer(canvas.getConfig().container);
}

export function renderToMountedElement<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  resolve?: () => void,
  reject?: (e: Error) => void,
): DisplayObject {
  // Initialize the context if it is not provided.
  const { width = 640, height = 480, on } = options;
  const keyed = inferKeys(options);
  const {
    library = createLibrary(),
    group = new Group(),
    emitter = new EventEmitter(),
  } = context;

  if (!group?.parentElement) {
    throw new Error(
      `renderToMountedElement can't render chart to unmounted group.`,
    );
  }

  const selection = select(group);
  context.group = group;
  context.library = library;
  context.emitter = emitter;

  emitter.emit(ChartEvent.BEFORE_RENDER);
  // Plot the chart and mutate context.
  // Make sure that plot chart after container is ready for every time.
  plot<T>({ ...keyed, width, height }, selection, library, context)
    .then(() => {
      setTimeout(() => {
        // Wait for the next tick.
        emitter.emit(ChartEvent.AFTER_RENDER);
        resolve?.();
      }, 20);
    })
    .catch((e) => {
      reject?.(e);
    });

  // Return the Group wraps the canvas or svg element.
  return group;
}

export function destroy<T extends G2ViewTree = G2ViewTree>(
  options: T,
  context: G2Context = {},
  isDestroyCanvas = false,
) {
  const { canvas, emitter } = context;
  if (canvas) {
    destroyAllInteractions(canvas);
    isDestroyCanvas ? canvas.destroy() : canvas.destroyChildren();
  }
  emitter.off();
}

/**
 * Destroy all interactions mounted on the canvas.
 */
function destroyAllInteractions(canvas: GCanvas) {
  const viewGroups = canvas.getRoot().querySelectorAll(`.${VIEW_CLASS_NAME}`);
  viewGroups?.forEach((group) => {
    const { nameInteraction = new Map() }: Record<string, any> = group;
    if (nameInteraction?.size > 0) {
      Array.from(nameInteraction?.values()).forEach((value: any) => {
        value?.destroy();
      });
    }
  });
}

function normalizeContainer(container: HTMLElement | string): HTMLElement {
  return typeof container === 'string'
    ? document.getElementById(container)
    : container;
}

import { isNumber } from '@antv/util';
import { G2ViewTree } from '../runtime';
import { getContainerSize } from '../utils/size';
import { deepAssign } from '../utils/helper';
import { Node } from './node';

// Keys can specified by new Chart({...}).
// Keys can bubble form mark-level options to view-level options.
export const VIEW_KEYS = [
  'width',
  'height',
  'depth',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingBottom',
  'paddingTop',
  'inset',
  'insetLeft',
  'insetRight',
  'insetTop',
  'insetBottom',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'autoFit',
  'theme',
  'title',
  'interaction',
];

export const REMOVE_FLAG = '__remove__';

export const CALLBACK_NODE = '__callback__';

/** Minimum chart width */
export const MIN_CHART_WIDTH = 1;
/** Minimum chart height */
export const MIN_CHART_HEIGHT = 1;

export function normalizeContainer(
  container: string | HTMLElement,
): HTMLElement {
  if (container === undefined) {
    const container = document.createElement('div');
    container[REMOVE_FLAG] = true;
    return container;
  }
  if (typeof container === 'string') {
    const node = document.getElementById(container);
    return node;
  }
  return container;
}

export function removeContainer(container: HTMLElement) {
  const parent = container.parentNode;
  if (parent) {
    parent.removeChild(container);
  }
}

export function normalizeRoot(node: Node) {
  if (node.type !== null) return node;
  const root = node.children[node.children.length - 1];
  for (const key of VIEW_KEYS) root.attr(key, node.attr(key));
  return root;
}

export function valueOf(node: Node): Record<string, any> {
  return {
    ...node.value,
    type: node.type,
  };
}

export function sizeOf(options, container) {
  const { width, height, autoFit, depth = 0 } = options;
  let effectiveWidth = 640;
  let effectiveHeight = 480;

  if (autoFit) {
    const { width: containerWidth, height: containerHeight } =
      getContainerSize(container);
    effectiveWidth = containerWidth || effectiveWidth;
    effectiveHeight = containerHeight || effectiveHeight;
  }

  effectiveWidth = width || effectiveWidth;
  effectiveHeight = height || effectiveHeight;

  return {
    width: Math.max(
      isNumber(effectiveWidth) ? effectiveWidth : MIN_CHART_WIDTH,
      MIN_CHART_WIDTH,
    ),
    height: Math.max(
      isNumber(effectiveHeight) ? effectiveHeight : MIN_CHART_HEIGHT,
      MIN_CHART_HEIGHT,
    ),
    depth,
  };
}

export function optionsOf(node: Node): Record<string, any> {
  const root = normalizeRoot(node);
  const discovered: Node[] = [root];
  const nodeValue = new Map<Node, Record<string, any>>();
  nodeValue.set(root, valueOf(root));
  while (discovered.length) {
    const node = discovered.pop();
    const value = nodeValue.get(node);
    const { children = [] } = node;
    for (const child of children) {
      if (child.type === CALLBACK_NODE) {
        value.children = child.value;
      } else {
        const childValue = valueOf(child);
        const { children = [] } = value;
        children.push(childValue);
        discovered.push(child);
        nodeValue.set(child, childValue);
        value.children = children;
      }
    }
  }
  return nodeValue.get(root);
}

function isMark(
  type: string | ((...args: any[]) => any),
  mark: Record<string, new () => Node>,
): boolean {
  if (typeof type === 'function') return true;
  return new Set(Object.keys(mark)).has(type);
}

function isComposition(
  type: string | ((...args: any[]) => any),
  composition: Record<string, new () => Node>,
): boolean {
  return (
    typeof type !== 'function' && new Set(Object.keys(composition)).has(type)
  );
}

function normalizeRootOptions(
  node: Node,
  options: G2ViewTree,
  previousType: string,
  marks: Record<string, new () => Node>,
  composition: Record<string, new () => Node>,
) {
  const { type: oldType } = node;
  const { type = previousType || oldType } = options;
  if (isComposition(type, composition)) {
    for (const key of VIEW_KEYS) {
      if (node.attr(key) !== undefined && options[key] === undefined) {
        options[key] = node.attr(key);
      }
    }
    return options;
  }
  if (isMark(type, marks)) {
    const view = { type: 'view' };
    const mark = { ...options };
    for (const key of VIEW_KEYS) {
      if (mark[key] !== undefined) {
        view[key] = mark[key];
        delete mark[key];
      }
    }
    return { ...view, children: [mark] };
  }
  return options;
}

function typeCtor(
  type: string | ((...args: any[]) => any),
  mark: Record<string, new () => Node>,
  composition: Record<string, new () => Node>,
): new () => Node {
  if (typeof type === 'function') return mark.mark;
  const node = { ...mark, ...composition };
  const ctor = node[type];
  if (!ctor) throw new Error(`Unknown mark: ${type}.`);
  return ctor;
}

// Create node from options.
function createNode(
  options: G2ViewTree,
  mark: Record<string, new () => Node>,
  composition: Record<string, new () => Node>,
): Node {
  if (typeof options === 'function') {
    const node = new Node();
    node.value = options;
    node.type = CALLBACK_NODE;
    return node;
  }
  const { type, children, ...value } = options;
  const Ctor = typeCtor(type, mark, composition);
  const node = new Ctor();
  node.value = value;
  // @ts-ignore
  node.type = type;
  return node;
}

// Update node by options.
function updateNode(node: Node, newOptions: G2ViewTree) {
  const { type, children, ...value } = newOptions;
  if (node.type === type || type === undefined) {
    // Update node.
    deepAssign(node.value, value);
  } else if (typeof type === 'string') {
    // Transform node.
    node.type = type;
    node.value = value;
  }
}

// Create a nested node tree from newOptions, and append it to the parent.
function appendNode(
  parent: Node,
  newOptions: G2ViewTree,
  mark: Record<string, new () => Node>,
  composition: Record<string, new () => Node>,
) {
  if (!parent) return;
  const discovered = [[parent, newOptions]];
  while (discovered.length) {
    const [parent, nodeOptions] = discovered.shift();
    const node = createNode(nodeOptions, mark, composition);
    if (Array.isArray(parent.children)) parent.push(node);
    const { children } = nodeOptions;
    if (Array.isArray(children)) {
      for (const child of children) {
        discovered.push([node, child]);
      }
    } else if (typeof children === 'function') {
      discovered.push([node, children]);
    }
  }
}

// Update node tree from options.
export function updateRoot(
  node: Node,
  options: G2ViewTree,
  definedType: string,
  mark: Record<string, new () => Node>,
  composition: Record<string, new () => Node>,
) {
  const rootOptions = normalizeRootOptions(
    node,
    options,
    definedType,
    mark,
    composition,
  );
  const discovered: [Node, Node, G2ViewTree][] = [[null, node, rootOptions]];
  while (discovered.length) {
    const [parent, oldNode, newNode] = discovered.shift();
    // If there is no oldNode, create a node tree directly.
    if (!oldNode) {
      appendNode(parent, newNode, mark, composition);
    } else if (!newNode) {
      oldNode.remove();
    } else {
      updateNode(oldNode, newNode);
      const { children: newChildren } = newNode;
      const { children: oldChildren } = oldNode;
      if (Array.isArray(newChildren) && Array.isArray(oldChildren)) {
        // Only update node specified in newChildren,
        // the extra oldChildren will remain still.
        const n = Math.max(newChildren.length, oldChildren.length);
        for (let i = 0; i < n; i++) {
          const newChild = newChildren[i];
          const oldChild = oldChildren[i];
          discovered.push([oldNode, oldChild, newChild]);
        }
      } else if (typeof newChildren === 'function') {
        discovered.push([oldNode, null, newChildren]);
      }
    }
  }
}

export function createEmptyPromise<T>(): [
  Promise<T>,
  (reason?: any) => void,
  (value: T | PromiseLike<T>) => void,
] {
  let reject: (reason?: any) => void;
  let resolve: (value: T | PromiseLike<T>) => void;
  const cloned = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return [cloned, resolve, reject];
}

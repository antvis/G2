import { deepMix } from '@antv/util';
import { G2ViewTree } from '../runtime';
import { getContainerSize } from '../utils/size';
import { Node } from './node';
import { mark } from './mark';
import { composition } from './composition';

// Keys can specified by new Chart({...}).
// Keys can bubble form mark-level options to view-level options.
export const VIEW_KEYS = [
  'width',
  'height',
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
];

export function normalizeContainer(
  container: string | HTMLElement,
): HTMLElement {
  if (container === undefined) return document.createElement('div');
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
  const { autoFit } = options;
  if (autoFit) return getContainerSize(container);
  const { width = 640, height = 480 } = options;
  return { width, height };
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
      const childValue = valueOf(child);
      const { children = [] } = value;
      children.push(childValue);
      discovered.push(child);
      nodeValue.set(child, childValue);
      value.children = children;
    }
  }
  return nodeValue.get(root);
}

function isMark(type: string): boolean {
  return new Set(Object.keys(mark)).has(type);
}

function normalizeRootOptions(
  node: Node,
  options: G2ViewTree,
  previousType: string,
) {
  const { type: oldType } = node;
  const { type = previousType || oldType } = options;
  if (type === 'view') return options;
  if (typeof type !== 'string') return options;
  if (!isMark(type)) return options;
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

function typeCtor(type: string): new () => Node {
  const node = { ...mark, ...composition };
  const ctor = node[type];
  if (!ctor) throw new Error(`Unknown mark: ${type}.`);
  return ctor;
}

// Create node from options.
function createNode(options: G2ViewTree): Node {
  const { type, children, ...value } = options;
  if (typeof type !== 'string') return;
  const Ctor = typeCtor(type);
  const node = new Ctor();
  node.value = value;
  return node;
}

// Update node by options.
function updateNode(node: Node, newOptions: G2ViewTree) {
  const { type, children, ...value } = newOptions;
  if (node.type === type || type === undefined) {
    // Update node.
    node.value = deepMix(node.value, value);
  } else if (typeof type === 'string') {
    // Transform node.
    node.type = type;
    node.value = value;
  }
}

// Create a nested node tree from newOptions, and append it to the parent.
function appendNode(parent: Node, newOptions: G2ViewTree) {
  if (!parent) return;
  const discovered = [[parent, newOptions]];
  while (discovered.length) {
    const [parent, nodeOptions] = discovered.shift();
    const node = createNode(nodeOptions);
    if (Array.isArray(parent.children)) parent.push(node);
    const { children } = nodeOptions;
    if (Array.isArray(children)) {
      for (const child of children) {
        discovered.push([node, child]);
      }
    }
  }
}

// Update node tree from options.
export function updateRoot(
  node: Node,
  options: G2ViewTree,
  definedType: string,
) {
  const rootOptions = normalizeRootOptions(node, options, definedType);
  const discovered: [Node, Node, G2ViewTree][] = [[null, node, rootOptions]];
  while (discovered.length) {
    const [parent, oldNode, newNode] = discovered.shift();
    // If there is no oldNode, create a node tree directly.
    if (!oldNode) {
      appendNode(parent, newNode);
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

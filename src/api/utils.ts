import { getContainerSize } from '../utils/size';
import { Node } from './node';

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
  root.attr('width', node.attr('width'));
  root.attr('height', node.attr('height'));
  root.attr('paddingLeft', node.attr('paddingLeft'));
  root.attr('paddingTop', node.attr('paddingTop'));
  root.attr('paddingBottom', node.attr('paddingBottom'));
  root.attr('paddingRight', node.attr('paddingRight'));
  root.attr('insetLeft', node.attr('insetLeft'));
  root.attr('insetRight', node.attr('insetRight'));
  root.attr('insetBottom', node.attr('insetBottom'));
  root.attr('insetTop', node.attr('insetTop'));
  root.attr('marginLeft', node.attr('marginLeft'));
  root.attr('marginBottom', node.attr('marginBottom'));
  root.attr('marginTop', node.attr('marginTop'));
  root.attr('marginRight', node.attr('marginRight'));
  root.attr('autoFit', node.attr('autoFit'));
  root.attr('padding', node.attr('padding'));
  root.attr('margin', node.attr('margin'));
  root.attr('inset', node.attr('inset'));
  root.attr('theme', node.attr('theme'));
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
    for (const child of node.children) {
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

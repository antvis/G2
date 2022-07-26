import { clone } from '@antv/util';
import { render } from '../runtime';
import { ViewComposition } from '../spec';
import { Node } from './node';
import { defineProps } from './props';
import { Interval } from './interval';

function normalizeContainer(container: string | HTMLElement): HTMLElement {
  if (container === undefined) return document.createElement('div');
  if (typeof container === 'string') {
    const node = document.getElementById(container);
    return node;
  }
  return container;
}

function valueOf(node: Node): Record<string, any> {
  const value = clone(node.value);
  return {
    ...value,
    type: node.type,
  };
}

export function optionsOf(root: Node): Record<string, any> {
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

export type ChartOptions = ViewComposition & {
  container?: string | HTMLElement;
};

export interface Chart {
  render(): void;
  interval(): Interval;
  node(): HTMLElement;
}

@defineProps([{ name: 'interval', type: 'node', ctor: Interval }])
export class Chart extends Node<ChartOptions> {
  private container: HTMLElement;

  constructor(options: ChartOptions = {}) {
    const { container, ...rest } = options;
    super(rest, 'view');
    this.container = normalizeContainer(container);
  }

  render() {
    const node = render(optionsOf(this));
    this.container.append(node);
  }

  node() {
    return this.container;
  }
}

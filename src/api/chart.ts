import { clone } from '@antv/util';
import { render } from '../runtime';
import { ViewComposition } from '../spec';
import { Node } from './node';
import {
  defineProps,
  NodePropertyDescriptor,
  nodeProps,
  containerProps,
} from './props';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from './types';
import { mark, Mark } from './mark';
import { composition, Composition } from './composition';

function normalizeContainer(container: string | HTMLElement): HTMLElement {
  if (container === undefined) return document.createElement('div');
  if (typeof container === 'string') {
    const node = document.getElementById(container);
    return node;
  }
  return container;
}

function normalizeRoot(node: Node) {
  if (node.type !== null) return node;
  const root = node.children[node.children.length - 1];
  root.attr('width', node.attr('width'));
  root.attr('height', node.attr('height'));
  root.attr('paddingLeft', node.attr('paddingLeft'));
  root.attr('paddingTop', node.attr('paddingTop'));
  root.attr('paddingBottom', node.attr('paddingBottom'));
  root.attr('paddingRight', node.attr('paddingRight'));
  return root;
}

function valueOf(node: Node): Record<string, any> {
  const value = clone(node.value);
  return {
    ...value,
    type: node.type,
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
  width?: number;
  height?: number;
};

type ChartProps = Concrete<ViewComposition>;

export interface Chart extends Composition, Mark {
  render(): void;
  node(): HTMLElement;
  data: ValueAttribute<ChartProps['data'], Chart>;
  coordinate: ArrayAttribute<ChartProps['coordinate'], Chart>;
  interaction: ArrayAttribute<ChartProps['interaction'], Chart>;
  key: ValueAttribute<ChartProps['key'], Chart>;
  transform: ArrayAttribute<ChartProps['transform'], Chart>;
  theme: ObjectAttribute<ChartProps['theme'], Chart>;
}

export const props: NodePropertyDescriptor[] = [
  { name: 'data', type: 'value' },
  { name: 'coordinate', type: 'array' },
  { name: 'interaction', type: 'array' },
  { name: 'theme', type: 'object' },
  { name: 'title', type: 'object' },
  { name: 'key', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'theme', type: 'object' },
  ...nodeProps(mark),
  ...containerProps(composition),
];

@defineProps(props)
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
    return this;
  }

  options() {
    return optionsOf(this);
  }

  node() {
    return this.container;
  }
}

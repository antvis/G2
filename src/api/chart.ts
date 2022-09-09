import { clone } from '@antv/util';
import { RendererPlugin, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { G2Context, render } from '../runtime';
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
import { library } from './library';

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

function Canvas(
  container: HTMLElement,
  width: number,
  height: number,
  renderer = new CanvasRenderer(),
  plugins = [],
) {
  // DragAndDropPlugin is for interaction.
  if (!plugins.some((d) => d instanceof DragAndDropPlugin)) {
    plugins.push(new DragAndDropPlugin());
  }
  plugins.forEach((d) => renderer.registerPlugin(d));
  return new GCanvas({
    container,
    width,
    height,
    renderer,
  });
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
  renderer?: CanvasRenderer;
  plugins?: RendererPlugin[];
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
  private _container: HTMLElement;

  private _context: G2Context;

  constructor(options: ChartOptions = {}) {
    const { container, ...rest } = options;
    super(rest, 'view');
    this._container = normalizeContainer(container);
    this._context = { library };
  }

  render(): Chart {
    const options = optionsOf(this);

    // Create canvas and library if it do not exist.
    const { width = 640, height = 480, renderer, plugins } = options;
    const {
      canvas = Canvas(
        document.createElement('div'),
        width,
        height,
        renderer,
        plugins,
      ),
    } = this._context;

    this._context.canvas = canvas;

    const node = render(options, this._context);
    if (node.parentNode !== this._container) {
      this._container.append(node);
    }
    return this;
  }

  options() {
    return optionsOf(this);
  }

  node(): HTMLElement {
    return this._container;
  }

  context(): G2Context {
    return this._context;
  }
}

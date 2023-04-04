import { RendererPlugin, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { debounce, deepMix, omit } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { G2Context, render, destroy } from '../runtime';
import { ViewComposition } from '../spec';
import { getChartSize } from '../utils/size';
import { ChartEvent } from '../utils/event';
import { G2ViewTree } from '../runtime/types/options';
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
import { composition, Composition, View } from './composition';
import { library } from './library';

export const SPEC_EXTERNAL_KEYS = ['container', 'renderer'];
export const G2_CHART_KEY = 'G2_CHART_KEY';

function normalizeContainer(container: string | HTMLElement): HTMLElement {
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

function normalizeRoot(node: Node) {
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

function valueOf(node: Node): Record<string, any> {
  return {
    ...node.value,
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
  // It is OK to register more than one time, G will handle this.
  plugins.push(new DragAndDropPlugin());
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
  canvas?: GCanvas;
  width?: number;
  height?: number;
  autoFit?: boolean;
  renderer?: CanvasRenderer;
  plugins?: RendererPlugin[];
  theme: string;
};

type ChartProps = Concrete<ViewComposition>;

export interface Chart extends Composition, Mark {
  data: ValueAttribute<ChartProps['data'], Chart>;
  width: ValueAttribute<ChartProps['width'], Chart>;
  height: ValueAttribute<ChartProps['height'], Chart>;
  coordinate: ValueAttribute<ChartProps['coordinate'], Chart>;
  interaction: ObjectAttribute<ChartProps['interaction'], Chart>;
  key: ValueAttribute<ChartProps['key'], Chart>;
  transform: ArrayAttribute<ChartProps['transform'], Chart>;
  theme: ObjectAttribute<ChartProps['theme'], Chart>;
  title: ValueAttribute<ChartProps['title'], Chart>;
  scale: ObjectAttribute<ChartOptions['scale'], Chart>;
  axis: ObjectAttribute<ChartOptions['axis'], Chart>;
  legend: ObjectAttribute<ChartOptions['legend'], Chart>;
  style: ObjectAttribute<ChartOptions['style'], Chart>;
  labelTransform: ArrayAttribute<ChartOptions['labelTransform'], Chart>;
}

export const props: NodePropertyDescriptor[] = [
  { name: 'data', type: 'value' },
  { name: 'width', type: 'value' },
  { name: 'height', type: 'value' },
  { name: 'coordinate', type: 'value' },
  { name: 'interaction', type: 'object' },
  { name: 'theme', type: 'object' },
  { name: 'title', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'scale', type: 'object' },
  { name: 'axis', type: 'object' },
  { name: 'legend', type: 'object' },
  { name: 'style', type: 'object' },
  { name: 'labelTransform', type: 'array' },
  ...nodeProps(mark),
  ...containerProps(composition),
];

@defineProps(props)
export class Chart extends View<ChartOptions> {
  private _container: HTMLElement;
  private _context: G2Context;
  private _emitter: EventEmitter;
  private _options: G2ViewTree;

  constructor(options: ChartOptions) {
    const { container, canvas, key = G2_CHART_KEY, ...rest } = options || {};
    super(rest, 'view');
    this.attr('key', key);
    this._container = normalizeContainer(container);
    this._emitter = new EventEmitter();
    this._context = { library, emitter: this._emitter, canvas };
    this.bindAutoFit();
  }

  render(): Promise<Chart> {
    if (!this._context.canvas) {
      // Init width and height.
      const {
        width = 640,
        height = 480,
        renderer,
        plugins,
        autoFit,
      } = this.options();
      const { width: adjustedWidth, height: adjustedHeight } = getChartSize(
        this._container,
        autoFit,
        width,
        height,
      );
      this.width(adjustedWidth);
      this.height(adjustedHeight);

      // Create canvas if it does not exist.
      this._context.canvas = Canvas(
        this._container,
        width,
        height,
        renderer,
        plugins,
      );
    }

    return new Promise((resolve, reject) => {
      try {
        render(this.options(), this._context, () => resolve(this), reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * @overload
   * @returns {G2ViewTree}
   */
  options(): G2ViewTree;
  /**
   * @overload
   * @param {G2ViewTree} options
   * @returns {Chart}
   */
  options(options: G2ViewTree): Chart;
  /**
   * @overload
   * @param {G2ViewTree} [options]
   * @returns {Chart|G2ViewTree}
   */
  options(options?: G2ViewTree): Chart | G2ViewTree {
    if (arguments.length === 0) {
      return this._options || optionsOf(this);
    }
    this._options = deepMix(
      this._options || optionsOf(this),
      omit(options, SPEC_EXTERNAL_KEYS),
    );
    return this;
  }

  getContainer(): HTMLElement {
    return this._container;
  }

  getContext(): G2Context {
    return this._context;
  }

  on(event: string, callback: (...args: any[]) => any, once?: boolean): this {
    this._emitter.on(event, callback, once);
    return this;
  }

  once(event: string, callback: (...args: any[]) => any): this {
    this._emitter.once(event, callback);
    return this;
  }

  emit(event: string, ...args: any[]): this {
    this._emitter.emit(event, ...args);
    return this;
  }

  off(event?: string, callback?: (...args: any[]) => any) {
    this._emitter.off(event, callback);
    return this;
  }

  clear() {
    const options = this.options();
    this.emit(ChartEvent.BEFORE_CLEAR);
    this._options = {};
    destroy(options, this._context, false);
    this.emit(ChartEvent.AFTER_CLEAR);
  }

  destroy() {
    const options = this.options();
    this.emit(ChartEvent.BEFORE_DESTROY);
    this.unbindAutoFit();
    this._options = {};
    destroy(options, this._context, true);
    removeContainer(this._container);
    this.emit(ChartEvent.AFTER_DESTROY);
  }

  forceFit() {
    const { width, height, autoFit } = this.options();
    const { width: adjustedWidth, height: adjustedHeight } = getChartSize(
      this._container,
      autoFit,
      width,
      height,
    );
    if (adjustedHeight && adjustedWidth) {
      this.changeSize(adjustedWidth, adjustedHeight);
    }
  }

  changeSize(adjustedWidth: number, adjustedHeight: number): Promise<Chart> {
    const { width, height, on } = this.options();
    if (width === adjustedWidth && height === adjustedHeight) {
      return Promise.resolve(this);
    }
    this.emit(ChartEvent.BEFORE_CHANGE_SIZE);
    this.width(adjustedWidth);
    this.height(adjustedHeight);
    const finished = this.render();
    finished.then(() => {
      this.emit(ChartEvent.AFTER_CHANGE_SIZE);
    });
    return finished;
  }

  private onResize = debounce(() => {
    this.forceFit();
  }, 300);

  private bindAutoFit() {
    const options = this.options();
    const { autoFit } = options;
    if (autoFit) {
      window.addEventListener('resize', this.onResize);
    }
  }

  private unbindAutoFit() {
    const options = this.options();
    const { autoFit } = options;
    if (autoFit) {
      window.removeEventListener('resize', this.onResize);
    }
  }
}

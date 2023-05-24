import { IRenderer, RendererPlugin, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { debounce } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { G2Context, render, destroy } from '../runtime';
import { ViewComposition } from '../spec';
import { ChartEvent } from '../utils/event';
import { G2ViewTree } from '../runtime/types/options';
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
import {
  normalizeContainer,
  removeContainer,
  sizeOf,
  optionsOf,
  updateRoot,
  createEmptyPromise,
} from './utils';

export const G2_CHART_KEY = 'G2_CHART_KEY';

export type ChartOptions = ViewComposition & {
  container?: string | HTMLElement;
  canvas?: GCanvas;
  width?: number;
  height?: number;
  autoFit?: boolean;
  renderer?: IRenderer;
  plugins?: RendererPlugin[];
  theme?: string;
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
  private _width: number;
  private _height: number;
  private _renderer: IRenderer;
  private _plugins: RendererPlugin[];
  // Identifies whether bindAutoFit.
  private _hasBindAutoFit = false;
  private _rendering = false;
  private _trailing = false;
  private _trailingResolve = null;
  private _trailingReject = null;

  constructor(options: ChartOptions) {
    const { container, canvas, renderer, plugins, ...rest } = options || {};
    super(rest, 'view');
    this._renderer = renderer || new CanvasRenderer();
    this._plugins = plugins || [];
    this._container = normalizeContainer(container);
    this._emitter = new EventEmitter();
    this._context = { library, emitter: this._emitter, canvas };
  }

  render(): Promise<Chart> {
    if (this._rendering) return this._addToTrailing();
    if (!this._context.canvas) this._createCanvas();
    this._bindAutoFit();
    this._rendering = true;
    const finished = new Promise<Chart>((resolve, reject) =>
      render(
        this._computedOptions(),
        this._context,
        this._createResolve(resolve),
        this._createReject(reject),
      ),
    );
    const [finished1, resolve, reject] = createEmptyPromise<Chart>();
    finished
      .then(resolve)
      .catch(reject)
      .then(() => this._renderTrailing());
    return finished1;
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
    if (arguments.length === 0) return optionsOf(this);
    updateRoot(this, options);
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
    this._reset();
    destroy(options, this._context, false);
    this.emit(ChartEvent.AFTER_CLEAR);
  }

  destroy() {
    const options = this.options();
    this.emit(ChartEvent.BEFORE_DESTROY);
    this._unbindAutoFit();
    this._reset();
    destroy(options, this._context, true);
    removeContainer(this._container);
    this.emit(ChartEvent.AFTER_DESTROY);
  }

  forceFit() {
    // Don't fit if size do not change.
    this.options['autoFit'] = true;
    const { width, height } = sizeOf(this.options(), this._container);
    if (width === this._width && height === this._height) {
      return Promise.resolve(this);
    }

    // Don't call changeSize to prevent update width and height of options.
    this.emit(ChartEvent.BEFORE_CHANGE_SIZE);
    const finished = this.render();
    finished.then(() => {
      this.emit(ChartEvent.AFTER_CHANGE_SIZE);
    });
    return finished;
  }

  changeSize(width: number, height: number): Promise<Chart> {
    if (width === this._width && height === this._height) {
      return Promise.resolve(this);
    }
    this.emit(ChartEvent.BEFORE_CHANGE_SIZE);
    this.width(width);
    this.height(height);
    const finished = this.render();
    finished.then(() => {
      this.emit(ChartEvent.AFTER_CHANGE_SIZE);
    });
    return finished;
  }

  private _reset() {
    this.type = 'view';
    this.value = {};
    this.children = [];
  }

  private _renderTrailing() {
    if (!this._trailing) return;
    this._trailing = false;
    this.render()
      .then(() => {
        const trailingResolve = this._trailingResolve.bind(this);
        this._trailingResolve = null;
        trailingResolve(this);
      })
      .catch((error) => {
        const trailingReject = this._trailingReject.bind(this);
        this._trailingReject = null;
        trailingReject(error);
      });
  }

  private _createResolve(resolve: (chart: Chart) => void) {
    return () => {
      this._rendering = false;
      resolve(this);
    };
  }

  private _createReject(reject: (error: Error) => void) {
    return (error: Error) => {
      this._rendering = false;
      reject(error);
    };
  }

  // Update actual size and key.
  private _computedOptions() {
    const options = this.options();
    const { key = G2_CHART_KEY } = options;
    const { width, height } = sizeOf(options, this._container);
    this._width = width;
    this._height = height;
    this._key = key;
    return { key: this._key, ...options, width, height };
  }

  // Create canvas if it does not exist.
  // DragAndDropPlugin is for interaction.
  // It is OK to register more than one time, G will handle this.
  private _createCanvas() {
    const { width, height } = sizeOf(this.options(), this._container);
    this._plugins.push(new DragAndDropPlugin());
    this._plugins.forEach((d) => this._renderer.registerPlugin(d));
    this._context.canvas = new GCanvas({
      container: this._container,
      width,
      height,
      renderer: this._renderer,
    });
  }

  private _addToTrailing(): Promise<Chart> {
    // Resolve previous promise, and give up this task.
    this._trailingResolve?.(this);

    // Create new task.
    this._trailing = true;
    const promise = new Promise<Chart>((resolve, reject) => {
      this._trailingResolve = resolve;
      this._trailingReject = reject;
    });

    return promise;
  }

  private _onResize = debounce(() => {
    this.forceFit();
  }, 300);

  private _bindAutoFit() {
    const options = this.options();
    const { autoFit } = options;

    if (this._hasBindAutoFit) {
      // If it was bind before, unbind it now.
      if (!autoFit) this._unbindAutoFit();
      return;
    }

    if (autoFit) {
      this._hasBindAutoFit = true;
      window.addEventListener('resize', this._onResize);
    }
  }

  private _unbindAutoFit() {
    if (this._hasBindAutoFit) {
      this._hasBindAutoFit = false;
      window.removeEventListener('resize', this._onResize);
    }
  }
}

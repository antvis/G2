import { IRenderer, RendererPlugin, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { debounce, deepMix, pick } from '@antv/util';
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
  private _options: G2ViewTree;
  private _width: number;
  private _height: number;
  private _renderer: IRenderer;
  private _plugins: RendererPlugin[];
  // Identifies whether bindAutoFit.
  private _hasBindAutoFit = false;

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
    this._bindAutoFit();

    if (!this._context.canvas) {
      // Init width and height.
      const { width, height } = sizeOf(this.options(), this._container);
      // Create canvas if it does not exist.
      // DragAndDropPlugin is for interaction.
      // It is OK to register more than one time, G will handle this.
      this._plugins.push(new DragAndDropPlugin());
      this._plugins.forEach((d) => this._renderer.registerPlugin(d));
      this._context.canvas = new GCanvas({
        container: this._container,
        width,
        height,
        renderer: this._renderer,
      });
    }

    return new Promise((resolve, reject) => {
      try {
        const options = this.options();
        const { key = G2_CHART_KEY } = options;
        const { width, height } = sizeOf(options, this._container);

        // Update actual size and key.
        this._width = width;
        this._height = height;
        this._key = key;

        render(
          { key: this._key, ...options, width, height },
          this._context,
          () => resolve(this),
          reject,
        );
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
    this._options = deepMix(this._options || optionsOf(this), options);
    return this;
  }

  // @todo Remove it when implement updateRoot.
  changeData(data: any): Promise<Chart> {
    // Update options data.
    this.options({ data });
    return super.changeData(data);
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
    const CLEAR_RETAIN_OPTIONS = [
      'autoFit',
      'container',
      'theme',
      'width',
      'height',
    ];
    const options = this.options();
    this.emit(ChartEvent.BEFORE_CLEAR);
    this.options(pick(options, CLEAR_RETAIN_OPTIONS));
    destroy(this._context, false);
    this.emit(ChartEvent.AFTER_CLEAR);
  }

  destroy() {
    this.emit(ChartEvent.BEFORE_DESTROY);
    this._unbindAutoFit();
    this._options = {};
    destroy(this._context, true);
    removeContainer(this._container);
    this.emit(ChartEvent.AFTER_DESTROY);
  }

  forceFit() {
    // Don't call changeSize to prevent update width and height of options.
    // @ts-ignore
    this.options.autoFit = true;
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

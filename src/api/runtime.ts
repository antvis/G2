import { IRenderer, RendererPlugin, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { debounce } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { G2Context, render, destroy } from '../runtime';
import { G2Spec, ViewComposition } from '../spec';
import { ChartEvent } from '../utils/event';
import type { G2Library } from '../runtime/types/options';
import {
  normalizeContainer,
  removeContainer,
  sizeOf,
  optionsOf,
  updateRoot,
  createEmptyPromise,
  REMOVE_FLAG,
} from './utils';
import { CompositionNode } from './composition';
import { Node } from './node';
import { defineProps, nodeProps } from './define';
import { MarkNode } from './mark';
import { library } from './library';

export const G2_CHART_KEY = 'G2_CHART_KEY';

export type RuntimeOptions = ViewComposition & {
  container?: string | HTMLElement;
  canvas?: GCanvas;
  autoFit?: boolean;
  renderer?: IRenderer;
  plugins?: RendererPlugin[];
  theme?: string;
  lib?: G2Library;
  createCanvas?: () => HTMLCanvasElement;
};

export class Runtime<Spec extends G2Spec = G2Spec> extends CompositionNode {
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
  private _previousDefinedType = null;
  private _marks: Record<string, new () => Node>;
  private _compositions: Record<string, new () => Node>;

  constructor(options: RuntimeOptions) {
    const { container, canvas, renderer, plugins, lib, createCanvas, ...rest } =
      options;
    super(rest, 'view');
    this._renderer = renderer || new CanvasRenderer();
    this._plugins = plugins || [];
    this._container = normalizeContainer(container);
    this._emitter = new EventEmitter();
    this._context = {
      library: { ...lib, ...library },
      emitter: this._emitter,
      canvas,
      createCanvas,
    };
    this._create();
  }

  render(): Promise<Runtime<Spec>> {
    if (this._rendering) return this._addToTrailing();
    if (!this._context.canvas) this._createCanvas();
    this._context.canvas.getConfig().supportsCSSTransform = true;
    this._bindAutoFit();
    this._rendering = true;
    const finished = new Promise<Runtime<Spec>>((resolve, reject) =>
      render(
        this._computedOptions(),
        this._context,
        this._createResolve(resolve),
        this._createReject(reject),
      ),
    );
    const [finished1, resolve, reject] = createEmptyPromise<Runtime<Spec>>();
    finished
      .then(resolve)
      .catch(reject)
      .then(() => this._renderTrailing());
    return finished1;
  }

  /**
   * @overload
   * @returns {Spec}
   */
  options(): Spec;
  /**
   * @overload
   * @param {G2ViewTree} options
   * @returns {Runtime}
   */
  options(options: Spec): Runtime<Spec>;
  /**
   * @overload
   * @param {G2ViewTree} [options]
   * @returns {Runtime|Spec}
   */
  options(options?: Spec): Runtime<Spec> | Spec {
    if (arguments.length === 0) return optionsOf(this) as Spec;
    const { type } = options;
    if (type) this._previousDefinedType = type;
    updateRoot(
      this,
      options,
      this._previousDefinedType,
      this._marks,
      this._compositions,
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
    if (this._container[REMOVE_FLAG]) removeContainer(this._container);
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

  changeSize(width: number, height: number): Promise<Runtime<Spec>> {
    if (width === this._width && height === this._height) {
      return Promise.resolve(this);
    }
    this.emit(ChartEvent.BEFORE_CHANGE_SIZE);
    this.attr('width', width);
    this.attr('height', height);
    const finished = this.render();
    finished.then(() => {
      this.emit(ChartEvent.AFTER_CHANGE_SIZE);
    });
    return finished;
  }

  private _create() {
    const { library } = this._context;

    // @todo After refactor component as mark, remove this.
    const isMark = (key) =>
      key.startsWith('mark.') ||
      key === 'component.axisX' ||
      key === 'component.axisY' ||
      key === 'component.legends';

    const marks = [
      'mark.mark', // chart.mark(composite)
      ...Object.keys(library).filter(isMark),
    ];

    // Create mark generators.
    this._marks = {};
    for (const key of marks) {
      const name = key.split('.').pop();
      class Mark extends MarkNode {
        constructor() {
          super({}, name);
        }
      }
      this._marks[name] = Mark;
      this[name] = function (composite) {
        const node = this.append(Mark);
        if (name === 'mark') node.type = composite;
        return node;
      };
    }

    // Create composition generators.
    const compositions = [
      'composition.view', // chat.view()
      ...Object.keys(library).filter(
        (key) => key.startsWith('composition.') && key !== 'composition.mark',
      ),
    ];
    this._compositions = Object.fromEntries(
      compositions.map((key) => {
        const name = key.split('.').pop();
        @defineProps(nodeProps(this._marks))
        class Composition extends CompositionNode {
          constructor() {
            super({}, name);
          }
        }
        return [name, Composition];
      }),
    );

    for (const Ctor of Object.values(this._compositions)) {
      defineProps(nodeProps(this._compositions))(Ctor);
    }

    for (const key of compositions) {
      const name = key.split('.').pop();
      this[name] = function () {
        const Composition = this._compositions[name];
        this.type = null;
        return this.append(Composition);
      };
    }
  }

  private _reset() {
    const KEYS = ['theme', 'type', 'width', 'height', 'autoFit'];
    this.type = 'view';
    this.value = Object.fromEntries(
      Object.entries(this.value).filter(
        ([key]) =>
          key.startsWith('margin') ||
          key.startsWith('padding') ||
          key.startsWith('inset') ||
          KEYS.includes(key),
      ),
    );
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

  private _createResolve(resolve: (chart: Runtime<Spec>) => void) {
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
    const { width, height, depth } = sizeOf(options, this._container);
    this._width = width;
    this._height = height;
    this._key = key;
    return { key: this._key, ...options, width, height, depth };
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

  private _addToTrailing(): Promise<Runtime<Spec>> {
    // Resolve previous promise, and give up this task.
    this._trailingResolve?.(this);

    // Create new task.
    this._trailing = true;
    const promise = new Promise<Runtime<Spec>>((resolve, reject) => {
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

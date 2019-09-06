import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import { Padding } from '../interface';
import View from './view';

type Renderer = 'svg' | 'canvas';

// chart 构造方法的入参
export interface ChartProps {
  readonly container: string | HTMLElement;
  readonly width: number;
  readonly height: number;
  readonly autoFit?: boolean;
  readonly renderer?: Renderer;
  readonly pixelRatio?: number;
  readonly padding?: number | number[];
}

/**
 * Chart 类，是使用 G2 进行绘图的入口
 */
export default class Chart extends View {
  public ele: HTMLElement;
  public canvas: Canvas;

  // 大小
  public width: number;
  public height: number;

  public autoFit: boolean;
  public padding: Padding;

  constructor(props: ChartProps) {
    const { container, width, height, autoFit, renderer, pixelRatio, padding = 0 } = props;

    const ele: HTMLElement = _.isString(container) ? document.querySelector(container) : container;

    const canvas = new Canvas({
      container: ele,
      width,
      height,
      renderer,
      pixelRatio,
    });

    // 调用 view 的创建
    super({
      parent: null,
      // 创建三层 group
      backgroundGroup: canvas.addGroup(),
      middleGroup: canvas.addGroup(),
      foregroundGroup: canvas.addGroup(),
      padding,
    });

    this.ele = ele;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.autoFit = autoFit;

    // 自适应大小
    this._autoFit();
  }

  public changeSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    // 重新渲染
    this.render();
  }

  public render() {}

  private _autoFit() {
    if (this.autoFit) {
      // todo 监听容器大小，自动 changeSize
      // ResizeObserver
    }
  }
}

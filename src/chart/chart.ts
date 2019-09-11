import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import { ChartCfg } from './interface';
import View from './view';

/**
 * Chart 类，是使用 G2 进行绘图的入口
 */
export default class Chart extends View {
  public ele: HTMLElement;

  // 大小
  public width: number;
  public height: number;

  public autoFit: boolean;

  constructor(props: ChartCfg) {
    const { container, width, height, autoFit = true, renderer, pixelRatio, padding = 0 } = props;

    const ele: HTMLElement = _.isString(container) ? document.querySelector(container) : container;

    // todo @hustcc
    // autoFit 为 true 的时候，应该设置 width height 为容器的大小，否则会有两次渲染和闪烁的过程。
    const canvas = new Canvas({
      containerDOM: ele,
      width,
      height,
      renderer,
      pixelRatio,
    });

    // 调用 view 的创建
    super({
      parent: null,
      canvas,
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

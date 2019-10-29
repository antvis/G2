import * as _ from '@antv/util';
import ResizeObserver from 'resize-observer-polyfill';
import { GROUP_Z_INDEX } from '../constant';
import { Canvas } from '../dependents';
import { getChartSize } from '../util/dom';
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
  private resizeObserver: ResizeObserver;

  // @ts-ignore
  constructor(props: ChartCfg) {
    const { container, width, height, autoFit = true, renderer, pixelRatio, padding = 0 } = props;

    const ele: HTMLElement = _.isString(container) ? document.querySelector(container) : container;

    // if autoFit, use the container size, to avoid the graph render twice.
    const size = getChartSize(ele, autoFit, width, height);

    const canvas = new Canvas({
      container: ele,
      renderer,
      pixelRatio,
      ...size,
    });

    // 调用 view 的创建
    super({
      parent: null,
      canvas,
      // create 3 group layers for views.
      backgroundGroup: canvas.addGroup({ zIndex: GROUP_Z_INDEX.BG }),
      middleGroup: canvas.addGroup({ zIndex: GROUP_Z_INDEX.MID }),
      foregroundGroup: canvas.addGroup({ zIndex: GROUP_Z_INDEX.FORE }),
      padding,
    });

    this.ele = ele;
    this.canvas = canvas;
    this.width = size.width;
    this.height = size.height;
    this.autoFit = autoFit;

    // 自适应大小
    this.bindAutoFit();
  }

  /**
   * change the graph size, and render it with new size.
   * @param width
   * @param height
   */
  public changeSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.changeSize(width, height);

    // 重新渲染
    this.render();
  }

  /**
   * destroy the chart.
   * unbind event, and destroy G.Canvas
   */
  public destroy() {
    super.destroy();

    this.unbindAutoFit();
    this.canvas.destroy();
  }

  private bindAutoFit() {
    if (this.autoFit) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.ele);
    }
  }

  private unbindAutoFit() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.ele);
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  /**
   * when container size changed, change chart size props, and re-render.
   */
  private onResize = _.debounce(() => {
    const { width, height } = this.ele.getBoundingClientRect();
    this.changeSize(width, height);
  }, 60);
}

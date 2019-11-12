import * as _ from '@antv/util';
import { GROUP_Z_INDEX } from '../constant';
import { Canvas } from '../dependents';
import { createDom, getChartSize } from '../util/dom';
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

  private wrapperElement: HTMLElement;

  // @ts-ignore
  constructor(props: ChartCfg) {
    const { container, width, height, autoFit = true, renderer, pixelRatio, padding = 0 } = props;

    const ele: HTMLElement = _.isString(container) ? document.getElementById(container) : container;

    // if autoFit, use the container size, to avoid the graph render twice.
    const size = getChartSize(ele, autoFit, width, height);

    const wrapperElement = createDom('<div style="position:relative;"></div>');
    ele.appendChild(wrapperElement);

    const canvas = new Canvas({
      container: wrapperElement,
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
    this.wrapperElement = wrapperElement;

    // 自适应大小
    this.bindAutoFit();
  }

  /**
   * change the graph size, and render it with new size.
   * @param width chart width
   * @param height chart height
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

    // TODO: @atnv/dom-util 中加 removeDom() 方法
    const wrapperElement = this.wrapperElement;
    wrapperElement.parentNode.removeChild(wrapperElement);
    this.wrapperElement = null;
  }

  private bindAutoFit() {
    if (this.autoFit) {
      window.addEventListener('resize', this.onResize);
    }
  }

  private unbindAutoFit() {
    if (this.autoFit) {
      window.removeEventListener('resize', this.onResize);
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

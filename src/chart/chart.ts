import { debounce, isString, each } from '@antv/util';
import { GROUP_Z_INDEX } from '../constant';
import { getEngine } from '../engine';
import { createDom, getChartSize, removeDom } from '../util/dom';
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
  /** 是否开启局部刷新 */
  public localRefresh: boolean;

  public autoFit: boolean;
  public renderer: 'canvas' | 'svg';

  private wrapperElement: HTMLElement;
  // @ts-ignore
  constructor(props: ChartCfg) {
    const {
      container,
      width,
      height,
      autoFit = false,
      padding,
      renderer = 'canvas',
      pixelRatio,
      localRefresh = true,
      visible = true,
      defaultInteractions = ['tooltip'],
      options,
    } = props;

    const ele: HTMLElement = isString(container) ? document.getElementById(container) : container;

    // if autoFit, use the container size, to avoid the graph render twice.
    const size = getChartSize(ele, autoFit, width, height);

    const wrapperElement = createDom('<div style="position:relative;"></div>');
    ele.appendChild(wrapperElement);

    const G = getEngine(renderer);

    const canvas = new G.Canvas({
      container: wrapperElement,
      pixelRatio,
      localRefresh,
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
      visible,
      options,
    });

    this.ele = ele;
    this.canvas = canvas;
    this.width = size.width;
    this.height = size.height;
    this.autoFit = autoFit;
    this.localRefresh = localRefresh;
    this.renderer = renderer;
    this.wrapperElement = wrapperElement;

    // 自适应大小
    this.bindAutoFit();
    this.initDefaultInteractions(defaultInteractions);
  }

  private initDefaultInteractions(interactions) {
    each(interactions, interaction => {
      this.interaction(interaction)
    });
  }

  /**
   * change the graph size, and render it with new size.
   * @param width chart width
   * @param height chart height
   * @returns void
   */
  public changeSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.changeSize(width, height);

    // 重新渲染
    this.render(true);
  }

  /**
   * destroy the chart.
   * unbind event, and destroy G.Canvas
   * @returns void
   */
  public destroy() {
    super.destroy();

    this.unbindAutoFit();
    this.canvas.destroy();

    removeDom(this.wrapperElement);
    this.wrapperElement = null;
  }

  public changeVisible(visible: boolean) {
    this.wrapperElement.style.display = visible ? '' : 'none';
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
  private onResize = debounce(() => {
    const { width, height } = getChartSize(this.ele, this.autoFit, this.width, this.height);
    this.changeSize(width, height);
  }, 300);
}

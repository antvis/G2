import { debounce, each, isString } from '@antv/util';
import { ChartCfg } from '../interface';
import { GROUP_Z_INDEX, VIEW_LIFE_CIRCLE } from '../constant';
import { getEngine } from '../engine';
import { createDom, getChartSize, removeDom, modifyCSS } from '../util/dom';
import View from './view';
import { AriaOption } from '../interface';

/**
 * Chart 类，是使用 G2 进行绘图的入口。
 */
export default class Chart extends View {
  /** Chart 的 DOM 容器 */
  public ele: HTMLElement;

  /** 图表宽度 */
  public width: number;
  /** 图表高度 */
  public height: number;
  /** 是否开启局部刷新 */
  public localRefresh: boolean;
  /** 是否自适应 DOM 容器宽高，默认为 false，需要用户手动指定宽高 */
  public autoFit: boolean;
  /** 图表渲染引擎 */
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
      appendPadding,
      renderer = 'canvas',
      pixelRatio,
      localRefresh = true,
      visible = true,
      supportCSSTransform = false,
      defaultInteractions = ['tooltip', 'legend-filter', 'legend-active', 'continuous-filter', 'ellipsis-text', 'axis-description'],
      options,
      limitInPlot,
      theme,
      syncViewPadding,
    } = props;

    const ele: HTMLElement = isString(container) ? document.getElementById(container) : container;

    // 生成内部正式绘制的 div 元素
    const wrapperElement = createDom('<div style="position:relative;"></div>');
    ele.appendChild(wrapperElement);

    // if autoFit, use the container size, to avoid the graph render twice.
    const size = getChartSize(ele, autoFit, width, height);

    const G = getEngine(renderer);

    const canvas = new G.Canvas({
      container: wrapperElement,
      pixelRatio,
      localRefresh,
      supportCSSTransform,
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
      appendPadding,
      visible,
      options,
      limitInPlot,
      theme,
      syncViewPadding,
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
    this.updateCanvasStyle();
    this.bindAutoFit();
    this.initDefaultInteractions(defaultInteractions);
  }

  private initDefaultInteractions(interactions) {
    each(interactions, (interaction) => {
      this.interaction(interaction);
    });
  }

  /**
   * 设置 WAI-ARIA 无障碍标签。如何根据图形语法自动生成 arial 内容？
   * @param ariaOption
   */
  public aria(ariaOption: AriaOption) {
    const ATTR = 'aria-label';
    if (ariaOption === false) {
      this.ele.removeAttribute(ATTR);
    } else {
      this.ele.setAttribute(ATTR, ariaOption.label);
    }
  }

  /**
   * 改变图表大小，同时重新渲染。
   * @param width 图表宽度
   * @param height 图表高度
   * @returns
   */
  public changeSize(width: number, height: number) {
    // 如果宽高一致，那么 changeSize 不执行任何操作
    if (this.width === width && this.height === height) {
      return this;
    }

    this.emit(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_SIZE);

    this.width = width;
    this.height = height;
    this.canvas.changeSize(width, height);

    // 重新渲染
    this.render(true);

    this.emit(VIEW_LIFE_CIRCLE.AFTER_CHANGE_SIZE);

    return this;
  }

  /**
   * 清空图表，同时清除掉 aria 配置
   */
  public clear() {
    super.clear();

    this.aria(false);
  }

  /**
   * 销毁图表，同时解绑事件，销毁创建的 G.Canvas 实例。
   * @returns void
   */
  public destroy() {
    super.destroy();

    this.unbindAutoFit();
    this.canvas.destroy();

    removeDom(this.wrapperElement);
    this.wrapperElement = null;
  }

  /**
   * 显示或隐藏图表
   * @param visible 是否可见，true 表示显示，false 表示隐藏
   * @returns
   */
  public changeVisible(visible: boolean) {
    super.changeVisible(visible); // 需要更新 visible 变量
    this.wrapperElement.style.display = visible ? '' : 'none';

    return this;
  }

  /**
   * 自动根据容器大小 resize 画布
   */
  public forceFit() {
    // skip if already destroyed
    if (!this.destroyed) {
      // 注意第二参数用 true，意思是即时 autoFit = false，forceFit() 调用之后一样是适配容器
      const { width, height } = getChartSize(this.ele, true, this.width, this.height);
      this.changeSize(width, height);
    }
  }

  private updateCanvasStyle() {
    modifyCSS(this.canvas.get('el'), {
      display: 'inline-block',
      verticalAlign: 'middle',
    });
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
    this.forceFit();
  }, 300);
}

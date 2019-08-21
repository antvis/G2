import * as domUtil from '@antv/dom-util';
import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import Global from '../global';
import { DataPointType } from '../interface';
import View from './view';

export default class Plot extends View {
  constructor(cfg: DataPointType) {
    super({
      containerDOM: null,
      containerId: null,
      width: Global.width,
      height: Global.height,
      pixelRatio: Global.pixelRatio,
      renderer: Global.renderer,
      forceFit: false,
      ...cfg,
    });
  }

  public init() {
    this.set('id', _.uniqueId('chart'));

    this._initCanvas();
    this._initEvents();
    super.init();
  }

  /**
   * 修改画布的大小，用于外部做自适应
   * @param width
   * @param height
   * @param autoRender
   */
  public changeSize(width: number, height: number, autoRender: boolean = true) {
    const canvas = this.get('canvas');
    canvas.changeSize(width, height);

    // 设置宽高之后，重新计算 region 大小（viewRange、panelRange）
    this.set('width', width);
    this.set('height', height);
    this.initRegion();

    if (autoRender) {
      // 重新绘制
      this.render();

      this.emit('afterchangesize');
    }

    return this;
  }

  public render(stopDrawing?: boolean) {
    super.render(stopDrawing);
    this.get('canvas').draw();
    return this;
  }
  public destroy() {
    window.removeEventListener('resize', _.getWrapBehavior(this, '_initForceFitEvent') as () => void);

    super.destroy();
  }

  private _initCanvas() {
    const canvas = new Canvas({
      containerDOM: this.get('containerDOM'),
      containerId: this.get('containerId'),
      width: this.get('width'),
      height: this.get('height'),
      renderer: this.get('renderer'),
      pixelRatio: this.get('pixelRatio'),
    });
    this.set('canvas', canvas);
    this.set('container', canvas);
    if (this.get('forceFit')) {
      const container = this._getContainerDOM();
      const width = domUtil.getWidth(container, this.get('width'));
      this.set('width', width);
    }
  }
  private _initEvents() {
    if (this.get('forceFit')) {
      window.addEventListener('resize', _.wrapBehavior(this, '_initForceFitEvent') as () => void);
    }
  }
  private _initForceFitEvent() {
    const timer = setTimeout(_.wrapBehavior(this, 'forceFit'), 200);
    clearTimeout(this.get('resizeTimer'));
    this.set('resizeTimer', timer);
  }
  /**
   * 自适应宽度
   * @chainable
   * @return {Chart} 图表对象
   */
  private forceFit() {
    if (this.destroyed) {
      return;
    }
    const container = this._getContainerDOM();
    const oldWidth = this.get('width');
    const width = domUtil.getWidth(container, oldWidth);
    if (width !== 0 && width !== oldWidth) {
      const height = this.get('height');
      this.changeSize(width, height);
    }
    return this;
  }
  private _getContainerDOM() {
    let container = this.get('containerDOM');
    if (!_.isElement(container)) {
      container = document.getElementById(this.get('containerId'));
    }
    return container;
  }
}

/**
 * @fileOverview G2 图表的入口文件
 * @author dxq613@gmail.com
 */

const Util = require('../util');
const View = require('./view');
const G = require('@ali/g');
const Canvas = G.Canvas;
const DomUtil = G.DomUtil;
const Component = require('../component/index');

class Chart extends View {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const viewCfg = super.getDefaultCfg();
    return Util.mix({
      id: null,
      forceFit: false,
      container: null,
      wrapperEl: null,
      canvas: null,
      width: 500,
      height: 500,
      padding: 50,
      backPlot: null,
      frontPlot: null,
      plotBackground: null,
      views: []
    }, viewCfg);
  }

  constructor(cfg) {
    super(cfg);
    this._initCanvas();
    this._initPlot();
  }

  _initCanvas() {
    let container = this.get('container');
    let width = this.get('width');
    const height = this.get('height');
    if (Util.isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }
    const wrapperEl = DomUtil.createDom('<div style="position:relative;"></div>');
    container.appendChild(wrapperEl);
    this.set('wrapperEl', wrapperEl);
    if (this.get('forceFit')) {
      width = Util.getWidth(container);
    }
    const canvas = new Canvas({
      containerDOM: wrapperEl,
      width,
      height
    });
    this.set('canvas', canvas);
  }

  _initPlot() {
    this._initPlotBack(); // 最底层的是背景相关的 group
    const canvas = this.get('canvas');
    const backPlot = canvas.addGroup(); // 图表最后面的容器
    const plotContainer = canvas.addGroup(); // 图表所在的容器
    const frontPlot = canvas.addGroup(); // 图表前面的容器

    this.set('backPlot', backPlot);
    this.set('plotContainer', plotContainer);
    this.set('viewContainer', plotContainer);
    this.set('frontPlot', frontPlot);
  }

  _initPlotBack() {
    const canvas = this.get('canvas');
    const plotBack = canvas.addGroup(Component.Plot, {
      padding: this.get('padding'),
      plotBackground: this.get('plotBackground'),
      background: this.get('background')
    });
    this.set('plotBack', plotBack);
    this.set('plotRange', plotBack.get('plotRange'));
  }

  forceFit() {

  }

  view(cfg) {
    const viewContainer = this.get('viewContainer');
    cfg.parent = this;
    cfg.viewContainer = viewContainer.addGroup();
    const view = new View(cfg);
    return view;
  }
  /**
   * @override
   * 当前chart 的范围
   */
  getViewRegion() {
    const plotRange = this.get('plotRange');
    return {
      start: plotRange.bl,
      end: plotRange.tr
    };
  }

  clear() {
    const views = this.get('views');
    while (views.length > 0) {
      const view = views.shift();
      view.destroy();
    }
    super.clear();
    const canvas = this.get('canvas');
    canvas.draw();
  }

  render() {
    const views = this.get('views');
    if (views.length) {
      Util.each(views, function(view) {
        view.render();
      });
    } else {
      super.render();
    }
    const canvas = this.get('canvas');
    canvas.draw();
  }

  destroy() {
    const canvas = this.get('canvas');
    const wrapperEl = this.get('wrapperEl');
    wrapperEl.parentNode.removeChild(wrapperEl);
    super.destroy();
    canvas.destroy();
  }
}

module.exports = Chart;

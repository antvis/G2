const Util = require('../../util');
const { Group } = require('@ali/g');
const PlotRange = require('./range');

class PlotBack extends Group {

  getDefaultCfg() {
    return {
      /**
       * 类型
       * @type {String}
       */
      type: 'plotBack',
      /**
       * 画布边距
       * @type {Number | Array | Object | "auto"}
       */
      padding: null,
      /**
       * 大背景
       * @type {Object}
       */
      background: null,
      /**
       * 区域
       * @type {Object}
       */
      plotRange: null,
      /**
       * 绘图区域背景
       * @type {Object}
       */
      plotBackground: null
    };
  }

  _beforeRenderUI() {
    this._calculateRange();
  }

  _renderUI() {
    this._renderBackground();
    this._renderPlotBackground();
  }

  _renderBackground() {
    const self = this;
    const background = self.get('background');
    const canvas = self.get('canvas');
    let rect = self.get('backgroundShape');
    let cfg;
    if (background) {
      const width = self.get('width') || canvas.get('width');
      const height = self.get('height') || canvas.get('height');
      if (!rect) {
        cfg = Util.mix({
          x: 0,
          y: 0,
          width,
          height
        }, background);
        rect = this.addShape('rect', {
          attrs: cfg
        });
        this.set('backgroundShape', rect);
      } else {
        rect.attr({
          x: 0,
          y: 0,
          width,
          height
        });
      }
    } else {
      return;
    }
  }

  _renderPlotBackground() {
    const self = this;
    const plotBackground = self.get('plotBackground');
    const plotRange = self.get('plotRange');
    let plotBackShape = self.get('plotBackShape');
    let cfg;

    if (plotBackground) {
      const width = plotRange.getWidth();
      const height = plotRange.getHeight();
      const tl = plotRange.tl;
      cfg = {
        x: tl.x,
        y: tl.y,
        width,
        height
      };
      if (!plotBackShape) {
        if (plotBackground.image) {
          cfg.img = plotBackground.image;
          plotBackShape = self.addShape('image', {
            attrs: cfg
          });
        } else { // 矩形
          Util.mix(cfg, plotBackground);
          plotBackShape = self.addShape('rect', {
            attrs: cfg
          });
        }
        self.set('plotBackShape', plotBackShape);
      } else {
        plotBackShape.attr(cfg);
      }
    } else {
      return;
    }
  }

  _calculateRange() {
    const self = this;
    const padding = self.get('padding');
    const canvas = self.get('canvas');
    const width = self.get('width') || canvas.get('width');
    const height = self.get('height') || canvas.get('height');
    let top = 0; // 上方的边距
    let left = 0; // 左边 边距
    let right = 0;
    let bottom = 0;
    if (Util.isNumber(padding)) {
      top = left = right = bottom = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    } else if (Util.isObject(padding)) {
      top = padding.top || 0;
      left = padding.left || 0;
      right = padding.right || 0;
      bottom = padding.bottom || 0;
    }

    const start = {
      x: left,
      y: height - bottom
    };
    const end = {
      x: width - right,
      y: top
    };

    let plotRange = self.get('plotRange');
    if (!plotRange) {
      plotRange = new PlotRange(start, end);
      self.set('plotRange', plotRange);
    } else {
      plotRange.reset(start, end);
    }
  }

  repaint() {
    this._calculateRange();
    this._renderBackground();
    this._renderPlotBackground();
    return this;
  }
}

module.exports = PlotBack;

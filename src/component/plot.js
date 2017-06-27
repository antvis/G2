const Util = require('../util');
const { Group } = require('@ali/g');

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
       * 绘图区域范围
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
    if (background) {
      const canvas = this.get('canvas');
      const width = self.get('width') || canvas.get('width');
      const height = self.get('height') || canvas.get('height');
      const cfg = {
        x: 0,
        y: 0,
        width,
        height
      };

      let rect = self.get('backgroundShape');
      if (!rect) {
        rect = this.addShape('rect', {
          attrs: Util.mix(cfg, background)
        });
        this.set('backgroundShape', rect);
      } else {
        rect.attr(cfg);
      }
    } else {
      return;
    }
  }

  _renderPlotBackground() {
    const self = this;
    const plotBackground = self.get('plotBackground');
    if (plotBackground) {
      const plotRange = self.get('plotRange');
      const width = plotRange.br.x - plotRange.bl.x;
      const height = plotRange.br.y - plotRange.tr.y;
      const tl = plotRange.tl;
      const cfg = {
        x: tl.x,
        y: tl.y,
        width,
        height
      };
      let plotBackShape = self.get('plotBackShape');
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

    let plotRange = self.get('plotRange');
    if (Util.isNil(plotRange)) {
      plotRange = {};
    }

    const padding = self.get('padding');
    const canvas = this.get('canvas');
    const width = self.get('width') || canvas.get('width');
    const height = self.get('height') || canvas.get('height');

    let top = 0;
    let left = 0;
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
      right = padding.right || 0;
      bottom = padding.bottom || 0;
      left = padding.left || 0;
    }

    const minX = Math.min(left, width - right);
    const maxX = Math.max(left, width - right);
    const minY = Math.min(height - bottom, top);
    const maxY = Math.max(height - bottom, top);

    plotRange.tl = {
      x: minX,
      y: minY
    }; // top-left

    plotRange.tr = {
      x: maxX,
      y: minY
    }; // top-right

    plotRange.bl = {
      x: minX,
      y: maxY
    }; // bottom-left

    plotRange.br = {
      x: maxX,
      y: maxY
    }; // bottom-right

    plotRange.cc = {
      x: (maxX + minX) / 2,
      y: (maxY + minY) / 2
    };

    this.set('plotRange', plotRange);
  }

  repaint() {
    this._calculateRange();
    this._renderBackground();
    this._renderPlotBackground();
    return this;
  }
}

module.exports = PlotBack;

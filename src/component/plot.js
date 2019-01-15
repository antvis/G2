/**
 * @fileOverview The class of canvas plot
 * @author sima.zhang
 */
const Util = require('../util');
const { Group } = require('../renderer');
const AUTO_STR = 'auto';

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

  _convert(val, isHorizontal) {
    if (Util.isString(val)) {
      if (val === AUTO_STR) {
        val = 0;
      } else if (val.indexOf('%') !== -1) {
        const canvas = this.get('canvas');
        const width = this.get('width') || canvas.get('width');
        const height = this.get('height') || canvas.get('height');
        val = parseInt(val, 10) / 100;
        val = isHorizontal ? val * width : val * height;
      }
    }

    return val;
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

    const allPadding = Util.toAllPadding(padding);

    const top = self._convert(allPadding[0], false);
    const right = self._convert(allPadding[1], true);
    const bottom = self._convert(allPadding[2], false);
    const left = self._convert(allPadding[3], true);

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

/**
 * @fileOverview heatmap
 * @author leungwensen@gmail.com
 */
const GeomBase = require('./base');
const colorUtil = require('../attr/color-util');
const Util = require('../util');

const ORIGIN_FIELD = '_origin';
const SHADOW_CANVAS = 'shadowCanvas';
const VALUE_RANGE = 'valueRange';
const IMAGE_SHAPE = 'imageShape';
const MAPPED_DATA = 'mappedData';
const GRAY_SCALE_BLURRED_CANVAS = 'grayScaleBlurredCanvas';
const HEATMAP_SIZE = 'heatmapSize';

const paletteCache = {};

class Heatmap extends GeomBase {
  /**
   * get default configuration
   * @protected
   * @return {Object} configuration
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'heatmap';
    // cfg.shapeType = 'heatmap';
    return cfg;
  }

  _prepareRange() {
    const self = this;

    const data = self.get(MAPPED_DATA);
    const colorAttr = self.getAttr('color');
    const colorField = colorAttr.field;

    let min = Infinity;
    let max = -Infinity;
    data.forEach(row => {
      const value = row[ORIGIN_FIELD][colorField];
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });
    if (min === max) {
      min = max - 1;
    }

    const range = [ min, max ];
    self.set(VALUE_RANGE, range);
  }

  _prepareSize() {
    const self = this;
    let radius = self.getDefaultValue('size');
    if (!Util.isNumber(radius)) {
      radius = self._getDefaultSize();
    }
    const styleOptions = self.get('styleOptions');
    let blur = styleOptions && Util.isObject(styleOptions.style) ? styleOptions.style.blur : null;
    if (!Util.isFinite(blur)) {
      blur = radius / 2;
    }
    self.set(HEATMAP_SIZE, {
      blur,
      radius
    });
  }

  _getDefaultSize() {
    const self = this;
    const position = self.getAttr('position');
    const coord = self.get('coord');
    const radius = Math.min(
      coord.width / (position.scales[0].ticks.length * 4),
      coord.height / (position.scales[1].ticks.length * 4)
    );
    return radius;
  }

  _colorize(img) {
    const self = this;
    const colorAttr = self.getAttr('color');
    const pixels = img.data;
    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i]; // get gradient color from opacity value
      if (alpha) {
        let palette;
        if (paletteCache[alpha]) {
          palette = paletteCache[alpha];
        } else {
          palette = colorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
          paletteCache[alpha] = palette;
        }
        // const palette = colorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
        pixels[i - 3] = palette[0];
        pixels[i - 2] = palette[1];
        pixels[i - 1] = palette[2];
        pixels[i] = alpha;
      }
    }
  }

  _prepareGreyScaleBlurredCircle(r, blur) {
    const self = this;
    let circleCanvas = self.get(GRAY_SCALE_BLURRED_CANVAS);
    if (!circleCanvas) {
      circleCanvas = document.createElement('canvas');
      self.set(GRAY_SCALE_BLURRED_CANVAS, circleCanvas);
    }
    const r2 = r + blur;
    const ctx = circleCanvas.getContext('2d');
    circleCanvas.width = circleCanvas.height = r2 * 2;
    ctx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    // ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  _drawGrayScaleBlurredCircle(x, y, r, alpha, ctx) {
    const self = this;
    const circleCanvas = self.get(GRAY_SCALE_BLURRED_CANVAS);
    ctx.globalAlpha = alpha;
    ctx.drawImage(circleCanvas, x - r, y - r);
  }

  _getShadowCanvasCtx() {
    const self = this;
    let canvas = self.get(SHADOW_CANVAS);
    if (!canvas) {
      canvas = document.createElement('canvas');
      self.set(SHADOW_CANVAS, canvas);
    }
    const { width, height } = self.get('coord');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  }

  _clearShadowCanvasCtx() {
    const ctx = this._getShadowCanvasCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _getImageShape() {
    const self = this;
    let imageShape = self.get(IMAGE_SHAPE);
    if (imageShape) {
      return imageShape;
    }
    const container = self.get('container');
    imageShape = container.addShape('Image', {});
    self.set(IMAGE_SHAPE, imageShape);
    return imageShape;
  }

  drawWithRange(range) {
    const self = this;

    // canvas size
    const { start, end, width, height } = self.get('coord');

    // value, range, etc
    const valueField = self.getAttr('color').field;
    const size = self.get(HEATMAP_SIZE);

    // prepare shadow canvas context
    self._clearShadowCanvasCtx();
    const ctx = self._getShadowCanvasCtx();

    // filter data
    let data = self.get(MAPPED_DATA);
    if (range) {
      data = data.filter(row => {
        return row[ORIGIN_FIELD][valueField] <= range[1] && row[ORIGIN_FIELD][valueField] >= range[0];
      });
    }

    // step1. draw points with shadow
    const scale = self._getScale(valueField);
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const cfg = self.getDrawCfg(obj);
      const alpha = scale.scale(obj[ORIGIN_FIELD][valueField]);
      self._drawGrayScaleBlurredCircle(cfg.x - start.x, cfg.y - end.y, size.radius + size.blur, alpha, ctx);
    }

    // step2. convert pixels
    const colored = ctx.getImageData(0, 0, width, height);
    self._clearShadowCanvasCtx();
    self._colorize(colored);
    ctx.putImageData(colored, 0, 0);
    const imageShape = self._getImageShape();
    imageShape.attr('x', start.x);
    imageShape.attr('y', end.y);
    imageShape.attr('width', width);
    imageShape.attr('height', height);
    imageShape.attr('img', ctx.canvas);
  }

  draw(data /* , container, shapeFactory, index */) {
    const self = this;
    self.set(MAPPED_DATA, data);

    self._prepareRange();
    self._prepareSize();

    const size = self.get(HEATMAP_SIZE);
    self._prepareGreyScaleBlurredCircle(size.radius, size.blur);

    const range = self.get(VALUE_RANGE);
    self.drawWithRange(range);
    // super.draw(data, container, shapeFactory, index);
  }
}

GeomBase.Heatmap = Heatmap;

module.exports = Heatmap;

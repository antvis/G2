/**
 * @fileOverview heatmap
 * @author leungwensen@gmail.com
 */
const GeomBase = require('./base');
const colorUtil = require('../attr/color-util');

const ORIGIN_FIELD = '_origin';

class Heatmap extends GeomBase {
  /**
   * get default configuration
   * @protected
   * @return {Object} configuration
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'heatmap';
    cfg.shapeType = 'heatmap';
    return cfg;
  }

  getDrawCfg(obj) {
    const self = this;
    const cfg = super.getDrawCfg(obj);
    const valueField = self.get('value-field');
    const [ min, max ] = self.get('value-range');

    cfg.alpha = Math.min((obj[ORIGIN_FIELD][valueField] - min) / (max - min), 1);
    cfg.ctx = self.get('heatmap-ctx');
    cfg.radius = self.get('default-radius');

    return cfg;
  }

  _getRadius() {
    const self = this;
    const position = self.getAttr('position');
    const coord = self.get('coord');
    const radius = Math.min(
      coord.width / (position.scales[0].ticks.length * 4),
      coord.height / (position.scales[1].ticks.length * 4)
    );
    return radius;
  }

  draw(data, container, shapeFactory, index) {
    const self = this;
    const colorAttr = self.getAttr('color');
    const colorField = colorAttr.field;
    self.set('value-field', colorField);
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
    const coord = self.get('coord');
    const width = coord.x.end;
    const height = coord.y.start;
    const heatmapCanvas = document.createElement('canvas');
    heatmapCanvas.width = width;
    heatmapCanvas.height = height;
    const ctx = heatmapCanvas.getContext('2d');

    self.set('default-radius', self._getRadius());
    self.set('heatmap-ctx', ctx);
    self.set('value-range', [ min, max ]);

    // step1. draw points with shadow
    super.draw(data, container, shapeFactory, index);

    // step2. convert pixels
    const colored = ctx.getImageData(coord.start.x, coord.end.y, width, height);
    self._colorize(colored);
    ctx.putImageData(colored, 0, 0);
    const image = container.addShape('Image', {
      attrs: {
        // x: 0,
        // y: 0,
        x: coord.start.x,
        y: coord.end.y,
        width,
        height
      }
    });
    image.attr('img', heatmapCanvas);
  }

  _colorize(img) {
    const self = this;
    const colorAttr = self.getAttr('color');
    const pixels = img.data;
    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i]; // get gradient color from opacity value
      if (alpha) {
        const palette = colorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
        pixels[i - 3] = palette[0];
        pixels[i - 2] = palette[1];
        pixels[i - 1] = palette[2];
        pixels[i] = alpha;
      }
    }
  }
}

module.exports = Heatmap;

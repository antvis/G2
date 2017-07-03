const Util = require('../../util');
const Continuous = require('./continuous');
const ColorUtil = require('../../attr/color-util'); // TODO： 这个 Util 是否可换个位置

class Color extends Continuous {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 类型
       * @type {String}
       */
      type: 'color-legend',
      /**
       * 布局方式
       * horizontal 水平
       * vertical 垂直
       * @type {String}
       */
      layout: 'vertical',
      _labelOffset: 10 // TODO: 文本同渐变背景的距离
    });
  }

  _renderSliderShape() {
    const slider = this.get('slider');
    const backgroundElement = slider.get('backgroundElement');
    const width = this.get('width');
    const height = this.get('height');
    const layout = this.get('layout');
    const items = this.get('items');
    let fill = '';
    let rgbColor;

    if (layout === 'vertical') {
      fill += 'l (90) ';
      Util.each(items, function(v) {
        rgbColor = ColorUtil.toRGB(v.color);
        fill += (1 - v.value) + ':' + rgbColor + ' ';
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, function(v) {
        rgbColor = ColorUtil.toRGB(v.color);
        fill += v.value + ':' + rgbColor + ' ';
      });
    }
    return this._addBackground(backgroundElement, 'Rect', {
      x: 0,
      y: 0,
      width,
      height,
      fill,
      strokeOpacity: 0
    });
  }

  _renderBackground() {
    const self = this;
    const titleShape = this.get('titleShape');
    let titleGap = this.get('titleGap');
    titleGap = titleShape ? titleShape.getBBox().height + titleGap : titleGap;
    const width = this.get('width');
    const height = this.get('height');
    const layout = this.get('layout');
    const items = this.get('items');
    let fill = '';
    let rgbColor;

    const path = [];
    const bgGroup = this.addGroup();

    if (layout === 'vertical') {
      fill += 'l (90) ';
      Util.each(items, v => {
        path.push([ 'M', 0, height - v.value * height ]);
        path.push([ 'L', width, height - v.value * height ]);
        rgbColor = ColorUtil.toRGB(v.color);
        fill += (1 - v.value) + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: width + self.get('_labelOffset'),
            y: height - v.value * height,
            text: self._formatItemValue(v.name)
          }, self.get('textStyle'))
        });
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, v => {
        path.push([ 'M', v.value * width, 0 ]);
        path.push([ 'L', v.value * width, height ]);
        rgbColor = ColorUtil.toRGB(v.color);
        fill += v.value + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: v.value * width,
            y: height + self.get('_labelOffset'),
            text: self._formatItemValue(v.name)
          }, self.get('textStyle'))
        });
      });
    }
    bgGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        fill,
        strokeOpacity: 0
      }
    });

    bgGroup.addShape('path', {
      attrs: {
        path,
        lineWidth: 1,
        stroke: '#fff'
      }
    });

    bgGroup.move(0, titleGap);
  }
}

module.exports = Color;

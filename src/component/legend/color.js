/**
 * @fileOverview The class of the gradient color legend
 * @author sima.zhang
 */
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
      labelOffset: 15,
      lineStyle: {
        lineWidth: 1,
        stroke: '#fff'
      }
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
        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += (1 - v.scaleValue) + ':' + rgbColor + ' ';
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, function(v) {
        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += v.scaleValue + ':' + rgbColor + ' ';
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
      Util.each(items, (v, index) => {
        if (index !== 0 && (index !== items.length - 1)) {
          path.push([ 'M', 0, height - v.scaleValue * height ]);
          path.push([ 'L', width, height - v.scaleValue * height ]);
        }

        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += (1 - v.scaleValue) + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: width + self.get('labelOffset') / 2,
            y: height - v.scaleValue * height,
            text: self._formatItemValue(v.value) + '' // 以字符串格式展示
          }, self.get('textStyle'), {
            textAlign: 'start'
          })
        });
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, (v, index) => {
        if (index !== 0 && (index !== items.length - 1)) {
          path.push([ 'M', v.scaleValue * width, 0 ]);
          path.push([ 'L', v.scaleValue * width, height ]);
        }
        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += v.scaleValue + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: v.scaleValue * width,
            y: height + self.get('labelOffset'),
            text: self._formatItemValue(v.value) + '' // 以字符串格式展示
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
      attrs: Util.mix({
        path
      }, this.get('lineStyle'))
    });

    bgGroup.move(0, titleGap);
  }
}

module.exports = Color;

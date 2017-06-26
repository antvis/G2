const Util = require('../../util');
const Base = require('./base');
const ColorUtil = require('../../attr/color-util'); // TODO： 这个 Util 是否可换个位置
// const { Event, Group } = require('@ali/g');
// var Range = require('../range/range');
// var TRIGGER_WIDTH = 16;

class Continuous extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 类型
       * @type {String}
       */
      type: 'continuous-legend',
      /**
       * 子项
       * @type {Array}
       */
      items: null,
      /**
       * 布局方式
       * horizontal 水平
       * vertical 垂直
       * @type {String}
       */
      layout: 'vertical',
      /**
       * 宽度
       * @type {Number}
       */
      width: 200,
      /**
       * 高度
       * @type {Number}
       */
      height: 20,
      /**
       * 标题偏移量
       * @type {Number}
       */
      titleGap: 10,
      /**
       * 默认文本图形属性
       * @type {ATTRS}
       */
      textStyle: {
        fill: '#333',
        textAlign: 'center',
        textBaseline: 'top'
      },
      /**
       * 连续图例是否可滑动
       * @type {Boolean}
       */
      slidable: true,
      /**
       * 范围内颜色
       * @type {ATTRS}
       */
      inRange: {
        fill: '#4E7CCC'
      },
      labelOffset: 10 // ToDO: 文本同渐变背景的距离
    });
  }

  _beforeRenderUI() {
    const items = this.get('items');
    if (!Util.isArray(items) || !Util.isEmpty(items)) {
      return;
    }

    super._beforeRenderUI();
    this.set('firstItem', items[0]);
    this.set('lastItem', items[items.length - 1]);
  }

  _formatItemValue(value) {
    const formatter = this.get('itemFormatter');
    if (formatter) {
      value = formatter.call(this, value);
    }
    return value;
  }

  _renderUI() {
    super._renderUI();
    this._renderBackground();
    // this._renderTrigger();
  }

  _renderBackground() {
    const type = this.get('attrType');
    if (type === 'color') {
      this._renderGradient();
    } else if (type === 'size') {
      this._renderTriangle();
    }
  }

  _renderGradient() {
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
      fill += 'l (270) ';
      Util.each(items, v => {
        path.push([ 'M', 0, v.value * height ]);
        path.push([ 'L', width, v.value * height ]);
        rgbColor = ColorUtil.toRGB(v.color);
        fill += (1 - v.value) + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: width + self.get('labelOffset'),
            y: v.value * height,
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
            y: height + self.get('labelOffset'),
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
    // bgGroup.name = 'legend';
  }

  // 绘制三角大小背景
  _renderTriangle() {
    const self = this;
    const width = this.get('width');
    const height = this.get('height');
    const layout = this.get('layout');
    const points = (layout === 'vertical') ? [
      [ 0, 0 ],
      [ width, 0 ],
      [ width, height ]
    ] : [
      [ 0, height ],
      [ width, 0 ],
      [ width, height ]
    ];

    return this.addShape('polygon', {
      attrs: Util.mix({
        points
      }, self.get('inRange'))
    });
  }
}

module.exports = Continuous;

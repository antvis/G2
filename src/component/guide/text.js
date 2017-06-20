const Util = require('../../util');
const Base = require('./base');

class Text extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 辅助元素类型
       * @type {String}
       */
      type: 'text',
      /**
       * 辅助文本的位置
       * @type {Object | Function}
       */
      start: null,
      /**
       * 辅助文本的显示文字
       * @type {String}
       */
      content: null,
      /**
       * 辅助文本的样式配置
       * @type {Object}
       */
      style: {
        fill: '#999',
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'sans-serif',
        textAlign: 'center'
      },
      /**
       * x 方向的偏移量
       * @type {Number}
       */
      offsetX: null,
      /**
       * y 方向的偏移量
       * @type {Number}
       */
      offsetY: null
    });
  }

  paint(coord, group) {
    const self = this;
    const start = self.start;
    const point = self.parsePoint(coord, start);
    const textStyle = this.style;

    if (self.offsetX) {
      point.x += self.offsetX;
    }

    if (self.offsetY) {
      point.y += self.offsetY;
    }

    if (textStyle.rotate) {
      textStyle.rotate = (textStyle.rotate * Math.PI) / 180; // 将角度转换为弧度
    }

    const guideText = group.addShape('Text', {
      attrs: Util.mix({
        text: self.content
      }, textStyle, point)
    });
    guideText.name = 'guide-text';
  }
}

module.exports = Text;

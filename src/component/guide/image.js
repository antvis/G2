/**
 * @fileOverview the image guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');

class Image extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 辅助元素类型
       * @type {String}
       */
      type: 'image',
      zIndex: 1,
      /**
       * 辅助图片的起点位置
       * @type {Object | Function | Array}
       */
      start: null,
      /**
       * 辅助图片的终点位置
       * @type {Object | Function | Array}
       */
      end: null,
      /**
       * 辅助图片的地址
       * @type {Strinf}
       */
      src: null,
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

  render(coord, group) {
    const self = this;
    const start = self.parsePoint(coord, self.start);

    const cfg = {
      x: start.x,
      y: start.y
    };
    cfg.img = self.src;

    if (!self.end) { // 如果咩有指定结束点，则 start 为图片的左上角坐标
      if (self.width) {
        cfg.width = self.width;
      }

      if (self.height) {
        cfg.height = self.height;
      }
    } else {
      const end = self.parsePoint(coord, self.end);
      // cfg.width = Math.abs(end.x - start.x);
      // cfg.height = Math.abs(start.y - end.y);
      cfg.width = end.x - start.x;
      cfg.height = end.y - start.y;
    }

    if (self.offsetX) {
      cfg.x += self.offsetX;
    }

    if (self.offsetY) {
      cfg.y += self.offsetY;
    }

    const imgGuide = group.addShape('Image', {
      zIndex: 1,
      attrs: cfg
    });
    imgGuide.name = 'guide-image';
    self.appendInfo && imgGuide.setSilent('appendInfo', self.appendInfo);
    self.el = imgGuide;
  }
}

module.exports = Image;

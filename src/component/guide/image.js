/**
 * @fileOverview guide image
 * @author dxq613@gmail.com
 */

'use strict';

var Util = require('@ali/g-util');
var Guide = require('./guide');

/**
 * @class Guide.Image
 * 辅助图片
 */
var Img = function(cfg) {
  Img.superclass.constructor.call(this, cfg);
};

Util.extend(Img, Guide);

Util.augment(Img, {
  /**
   * 起始位置
   * @type {Array}
   */
  start: [],
  /**
   * 结束位置
   * @type {Array}
   */
  end: null,
  /**
   * 图片地址
   * @type {String}
   */
  src: '',
  // override
  paint: function(coord, group) {
    var self = this;
    var start = self.parsePoint(coord, self.start);
    var cfg = self.cfg;

    cfg.img = cfg.src;
    cfg = Util.mix({
      src: self.src
    }, cfg, start);
    if (self.end) {
      var end = self.parsePoint(coord, self.end);
      cfg.x = start.x;
      cfg.y = end.y;
      cfg.width = end.x - start.x;
      cfg.height = start.y - end.y;
    } else {
      cfg.y = cfg.y - cfg.height;
    }
    group.addShape('Image', {
      attrs: cfg
    });
  }
});

module.exports = Img;

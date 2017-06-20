/**
 * @fileOverview guide text
 * @author dxq613@gmail.com
 */

'use strict';

var Util = require('@ali/g-util');
var Guide = require('./guide');

/**
 * @class Guide.Text
 * 辅助文本
 */
var Text = function(cfg) {
  Text.superclass.constructor.call(this, cfg);
};

Util.extend(Text, Guide);

Util.augment(Text, {
  /**
   * 位置
   * @type {Array}
   */
  position: [],
  /**
   * 文本
   * @type {String}
   */
  text: '',
  /**
   * 配置信息
   * @type {Object}
   */
  cfg: {
    fill: '#000',
    textAlign: 'center'
  },
  // override
  paint: function(coord, group) {
    var self = this;
    var position = self.position;
    var point = self.parsePoint(coord, position);
    var cfg = self.cfg;
    cfg = Util.mix({
      text: self.text
    }, cfg, point);
    group.addShape('Text', {
      attrs: cfg
    });
  }
});

module.exports = Text;

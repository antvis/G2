/**
 * @fileOverview guide line
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */

'use strict';

var Util = require('@ali/g-util');
var Guide = require('./guide');

require('./util/domUtil');

function getOffsetFromAlign (align, width, height) {
  var result = [];
  switch (align) {
    case 'tl':
      result[0] = 0;
      result[1] = 0;
      break;
    case 'tr':
      result[0] = -width;
      result[1] = 0;
      break;
    case 'bl':
      result[0] = 0;
      result[1] = Math.floor(-height);
      break;
    case 'br':
      result[0] = Math.floor(-width);
      result[1] = Math.floor(-height);
      break;
    case 'rc':
      result[0] = Math.floor(-width);
      result[1] = Math.floor(-height / 2);
      break;
    case 'lc':
      result[0] = 0;
      result[1] = Math.floor(-height / 2);
      break;
    case 'tc':
      result[0] = Math.floor(-width / 2);
      result[1] = Math.floor(-height);
      break;
    case 'bc':
      result[0] = Math.floor(-width / 2);
      result[1] = 0;
      break;
    default:
      result[0] = Math.floor(-width / 2);
      result[1] = Math.floor(-height / 2);
  }
  return result;
}
/**
 * @class  Guide.Html
 * 辅助html
 */
var Html = function(cfg) {
  Html.superclass.constructor.call(this, cfg);
};

Util.extend(Html, Guide);

Util.augment(Html, {
  type: 'html',
  /**
   * 坐标点
   * @type {Array}
   */
  point: [],
  /**
   * 配置项
   * @type {object}
   */
  cfg: {
    offset: [0, 0],
    align: 'cc'
  },
  /**
  * html内容
  *@type {String}
  */
  html: '',
  // override paint
  paint: function(coord, group) {
    var self = this;
    var position = self.parsePoint(coord, self.point);
    var myNode = Util.createDom(self.html);
    myNode = Util.modiCSS(myNode, {
      position: 'absolute',
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'hidden'
    });
    var wrapperNode;
    var parentNode = group.get('canvas').get('el').parentNode;
    if (parentNode.getElementsByClassName('guideWapper').length > 0) {
      wrapperNode = parentNode.getElementsByClassName('guideWapper')[0];
    } else {
      wrapperNode = Util.createDom('<div class="guideWapper"></div>');
      wrapperNode = Util.modiCSS(wrapperNode, {
        position: 'absolute',
        top: 0,
        left: 0
      });
      parentNode.appendChild(wrapperNode);
    }
    wrapperNode.appendChild(myNode);
    var cfg = self.cfg;
    // 对齐
    if (cfg.align) {
      var align = cfg.align;
      var width = Util.getWidth(myNode);
      var height = Util.getHeight(myNode);
      var newOffset = getOffsetFromAlign(align, width, height);
      position.x = position.x + newOffset[0];
      position.y = position.y + newOffset[1];
    }
    // 偏移
    if (cfg.offset) {
      var offset = cfg.offset;
      position.x = position.x + offset[0];
      position.y = position.y + offset[1];
    }
    Util.modiCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
  }
});

module.exports = Html;

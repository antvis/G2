/**
 * @fileOverview guide rect
 * @author dxq613@gmail.com
 */

'use strict';

var Util = require('@ali/g-util');
var Guide = require('./guide');

/**
 * @class Guide.Rect
 * 矩形辅助框
 */
var Rect = function(cfg) {
  Rect.superclass.constructor.call(this, cfg);
};

Util.extend(Rect, Guide);

Util.augment(Rect, {
  /**
   * 起点
   * @type {Array}
   */
  start: [],
  /**
   * 终点
   * @type {Array}
   */
  end: [],

  cfg: {
    stroke: '#000'
  },
  // 获取矩形的path
  getPath: function(coord) {
    var self = this;
    var start = self.parsePoint(coord, self.start);
    var end = self.parsePoint(coord, self.end);
    var path = [];
    path.push(['M', start.x, start.y]);
    path.push(['L', end.x, start.y]);
    path.push(['L', end.x, end.y]);
    path.push(['L', start.x, end.y]);
    path.push(['z']);
    return path;
  },
  // Override
  paint: function(coord, group) {
    var self = this;
    var cfg = self.cfg;
    var path = self.getPath(coord);
    cfg = Util.mix({
      path: path
    }, cfg);
    group.addShape('Path', {
      attrs: cfg
    });
  }
});

module.exports = Rect;

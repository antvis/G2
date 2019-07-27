/**
 * @fileOverview The controller of coordinate
 * @author sima.zhang
 */
const Util = require('../../util');
const Coord = require('@antv/coord/lib/');

class CoordController {
  constructor(option) {
    this.type = 'rect';
    this.actions = [];
    this.cfg = {};
    Util.mix(this, option);
    this.option = option || {};
  }

  reset(coordOption) {
    this.actions = coordOption.actions || [];
    this.type = coordOption.type;
    this.cfg = coordOption.cfg;
    this.option.actions = this.actions;
    this.option.type = this.type;
    this.option.cfg = this.cfg;
    return this;
  }

  _execActions(coord) {
    const actions = this.actions;
    Util.each(actions, function(action) {
      const m = action[0];
      coord[m](action[1], action[2]);
    });
  }

  hasAction(actionName) {
    const actions = this.actions;
    let rst = false;
    Util.each(actions, function(action) {
      if (actionName === action[0]) {
        rst = true;
        return false;
      }
    });
    return rst;
  }
  /**
   * 创建坐标系对象
   * @param  {Object} start 坐标系起始点
   * @param  {Object} end   坐标系结束点
   * @return {Function} 坐标系的构造函数
   */
  createCoord(start, end) {
    const self = this;
    const type = self.type;
    const cfg = self.cfg;
    let C; // 构造函数
    let coord;

    const coordCfg = Util.mix({
      start,
      end
    }, cfg);

    if (type === 'theta') { // definition of theta coord
      C = Coord.Polar;

      if (!self.hasAction('transpose')) {
        self.transpose(); // 极坐标，同时transpose
      }
      coord = new C(coordCfg);
      coord.type = type;
    } else {
      C = Coord[Util.upperFirst(type || '')] || Coord.Rect;
      coord = new C(coordCfg);
    }

    self._execActions(coord);
    return coord;
  }

  rotate(angle) {
    angle = angle * Math.PI / 180;
    this.actions.push([ 'rotate', angle ]);
    return this;
  }

  reflect(dim) {
    this.actions.push([ 'reflect', dim ]);
    return this;
  }

  scale(sx, sy) {
    this.actions.push([ 'scale', sx, sy ]);
    return this;
  }

  transpose() {
    this.actions.push([ 'transpose' ]);
    return this;
  }
}

module.exports = CoordController;

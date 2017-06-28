const Util = require('../../util');
const Coord = require('../../coord/index');

class CoordController {
  constructor(cfg) {
    this.type = 'rect';
    this.actions = null;
    this.chart = null;

    Util.mix(this, cfg);
    this.resetActions();
  }

  resetActions() {
    const options = this.chart.get('options');
    if (options.coord && options.coord.actions) {
      this.actions = options.coord.actions;
    } else {
      this.actions = [];
    }
    return this;
  }

  _getCoordOptions() {
    const chart = this.chart;
    if (!chart.get('options').coord) {
      chart._setOptions('coord', {});
    }
    return chart.get('options').coord;
  }

  _execActions(coord) {
    const coordOption = this._getCoordOptions();
    const actions = coordOption.actions;
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
    const options = this.chart.get('options');
    const coordOption = options.coord;
    const type = coordOption && coordOption.type ? coordOption.type : self.type;
    let C; // 构造函数
    let coord;

    const coordCfg = Util.mix({
      start,
      end
    }, coordOption && coordOption.cfg);

    if (type === 'theta') {
      C = Coord.Polar;

      if (!self.hasAction('transpose')) {
        self.transpose(); // 极坐标，同时transpose
      }

      coord = new C(coordCfg);
      coord.type = type;
    } else {
      C = Coord[Util.ucfirst(type)] || Coord.Rect;
      coord = new C(coordCfg);
    }

    self._execActions(coord);
    return coord;
  }

  rotate(angle) {
    angle = angle * Math.PI / 180;
    this.actions.push([ 'rotate', angle ]);
    const coordOption = this._getCoordOptions();
    coordOption.actions = this.actions;
    return this;
  }

  reflect(dim) {
    this.actions.push([ 'reflect', dim ]);
    const coordOption = this._getCoordOptions();
    coordOption.actions = this.actions;
    return this;
  }

  scale(sx, sy) {
    this.actions.push([ 'scale', sx, sy ]);
    const coordOption = this._getCoordOptions();
    coordOption.actions = this.actions;
    return this;
  }

  transpose() {
    this.actions.push([ 'transpose' ]);
    const coordOption = this._getCoordOptions();
    coordOption.actions = this.actions;
    return this;
  }
}

module.exports = CoordController;

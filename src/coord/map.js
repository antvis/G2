const Util = require('../util');
const Cartesian = require('./cartesian');
const GMapProjection = require('@ali/g-map-projection');

class Map extends Cartesian {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      projection: 'mercator',
      type: 'map'
    });
  }

  constructor(cfg) {
    super(cfg);
    const projectionType = this.projection;
    const basic = this.basic;
    const C = GMapProjection[projectionType];
    this.project = new C({
      basic
    });
  }

  _getOriginRange() {
    const xMin = this.originMin ? this.originMin[0] : this.min[0];
    const yMin = this.originMin ? this.originMin[1] : this.min[1];
    const xMax = this.originMax ? this.originMax[0] : this.max[0];
    const yMax = this.originMax ? this.originMax[1] : this.max[1];
    const range = {
      x: (xMax - xMin),
      y: (yMax - yMin)
    };

    return {
      xMin,
      yMin,
      range
    };
  }

  _getProjectRange() {
    const min = this.min ? this.min : this.originMin;
    const max = this.max ? this.max : this.originMax;
    const xMin = min[0];
    const yMin = min[1];
    const xMax = max[0];
    const yMax = max[1];
    const range = {
      x: (xMax - xMin),
      y: (yMax - yMin)
    };
    return {
      xMin,
      yMin,
      range
    };
  }

  _invert(point, type) {
    let param;
    if (type === 'origin') {
      param = this._getOriginRange();
    } else if (type === 'project') {
      param = this._getProjectRange();
    }
    const xMin = param.xMin;
    const yMin = param.yMin;
    const range = param.range;

    point.x = xMin + point.x * range.x;
    point.y = yMin + point.y * range.y;

    return point;
  }

  _scale(point, type) {
    let param;
    if (type === 'origin') {
      param = this._getOriginRange();
    } else if (type === 'project') {
      param = this._getProjectRange();
    }
    const xMin = param.xMin;
    const yMin = param.yMin;
    const range = param.range;

    point.x = (point.x - xMin) / range.x;
    point.y = (point.y - yMin) / range.y;
    return point;
  }

  convertPoint(point) {
    const x = this.isTransposed ? point.y : point.x;
    const y = this.isTransposed ? point.x : point.y;
    const project = this.project;
    let aPoint = this._invert({
      x,
      y
    }, 'origin'); // 转换为度量前的数值
    aPoint = project.project(aPoint.x, aPoint.y);
    aPoint = this._scale(aPoint, 'project');

    return {
      x: this.convertDim(aPoint.x, 'x'),
      y: this.convertDim(aPoint.y, 'y')
    };
  }

  invertPoint(point) {
    const x = this.invertDim(point.x, 'x');
    const y = this.invertDim(point.y, 'y');
    let rst = {};
    rst.x = this.isTransposed ? y : x;
    rst.y = this.isTransposed ? x : y;
    const project = this.project;
    rst = this._invert(rst, 'project');
    rst = project.invert(rst);
    rst = this._scale(rst, 'origin');

    return rst;
  }
}

module.exports = Map;

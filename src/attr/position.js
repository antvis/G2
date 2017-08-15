/**
 * @fileOverview the position attribute of core
 * @author huangtonger@aliyun.com
 */


const Util = require('../util');
const Base = require('./base');

class Position extends Base {

  constructor(cfg) {
    super(cfg);
    this.names = [ 'x', 'y' ];
    this.type = 'position';
  }

  mapping(x, y) {
    const scales = this.scales;
    const coord = this.coord;
    const scaleX = scales[0];
    const scaleY = scales[1];
    let rstX;
    let rstY;
    let obj;
    if (Util.isNil(x) || Util.isNil(y)) {
      return [];
    }
    if (Util.isArray(y) && Util.isArray(x)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0; i < x.length && j < y.length; i++, j++) {
        obj = coord.convertPoint({
          x: scaleX.scale(x[i]),
          y: scaleY.scale(y[j])
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (Util.isArray(y)) {
      x = scaleX.scale(x);
      rstY = [];
      Util.each(y, function(yVal) {
        yVal = scaleY.scale(yVal);
        obj = coord.convertPoint({
          x,
          y: yVal
        });
        if (rstX && rstX !== obj.x) {
          if (!Util.isArray(rstX)) {
            rstX = [ rstX ];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      });
    } else if (Util.isArray(x)) {
      y = scaleY.scale(y);
      rstX = [];
      Util.each(x, function(xVal) {
        xVal = scaleX.scale(xVal);
        obj = coord.convertPoint({
          x: xVal,
          y
        });
        if (rstY && rstY !== obj.y) {
          if (!Util.isArray(rstY)) {
            rstY = [ rstY ];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      });
    } else {
      x = scaleX.scale(x);
      y = scaleY.scale(y);
      const point = coord.convertPoint({
        x,
        y
      });
      rstX = point.x;
      rstY = point.y;
    }
    return [ rstX, rstY ];
  }
}

module.exports = Position;

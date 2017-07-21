/**
 * @fileOverview shape 的辅助方法
 * @author dxq613@gmail.com
 */
const Util = require('../../util');

const ShapeUtil = {
  splitPoints(obj) {
    const points = [];
    const x = obj.x;
    let y = obj.y;
    y = Util.isArray(y) ? y : [ y ];
    Util.each(y, function(yItem, index) {
      const point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  }
};

module.exports = ShapeUtil;

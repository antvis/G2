/**
 * @fileOverview the entry of axis
 * @author sima.zhang
 */
module.exports = {
  Line: require('./line'), // 基础的直线坐标轴
  Circle: require('./circle'), // 极坐标下
  Helix: require('./helix'), // 螺旋坐标轴
  PolyLine: require('./polyline') // 多线段组成的坐标轴
};

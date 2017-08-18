const Util = require('./src/util');
const Scale = require('./src/scale/index');
const Chart = require('./src/chart/chart');
const Shape = require('./src/geom/shape/');
const Global = require('./src/global');
const Animate = require('./src/animate/animate');
let G2 = {
  Util,
  Scale,
  Chart,
  Shape,
  Global,
  Animate,
  version: '3.0.0-rc2'
};

// 保证两个版本共存
if (window && window.G2) {
  window.G2_3 = G2;
  G2 = window.G2;
}

module.exports = G2;

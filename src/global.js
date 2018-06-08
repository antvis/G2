/**
 * @fileOverview 全局变量
 * @author dxq613
 */
const Util = require('./util');
const Theme = require('./theme/index');

// const Global = {};
const Global = {
  version: '3.1.2', // TODO fix version
  trackable: true,
  animate: true,
  snapArray: [ 0, 1, 2, 4, 5, 10 ],
  // 指定固定 tick 数的逼近值
  snapCountArray: [ 0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ],
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.9999999, // 玫瑰图柱状占比 1
    multiplePie: 1 / 1.3 // 多层的饼图、环图
  },
  // 折线图、区域图、path 当只有一个数据时，是否显示成点
  showSinglePoint: false,
  connectNulls: false,
  scales: {
  }
};

function setTheme(theme) {
  // for (const k in Global) {
  //   if (Global.hasOwnProperty(k)) {
  //     delete Global[k];
  //   }
  // }

  let newTheme = {};
  if (Util.isObject(theme)) {
    newTheme = theme;
  } else if (Util.indexOf(Object.keys(Theme), theme) !== -1) {
    newTheme = Theme[theme];
  } else {
    newTheme = Theme.default;
  }
  Util.deepMix(Global, newTheme);
}

setTheme('default');

Global.setTheme = setTheme;

module.exports = Global;

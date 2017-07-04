/**
 * @fileOverview 全局变量
 * @author dxq613
 */


const Util = require('./util');
const Theme = require('./theme/index');
const THEME_TYPES = [ 'default', 'dark', 'cheery' ];

const Global = {};
let Default;

function setTheme(theme) {
  for (const k in Global) {
    if (Global.hasOwnProperty(k)) {
      delete Global[k];
    }
  }

  let newTheme;
  if (Util.isObject(theme)) {
    newTheme = theme;
  } else if (Util.indexOf(THEME_TYPES, theme) !== -1) {
    newTheme = Theme[theme];
  } else {
    newTheme = Theme.default;
  }
  Util.merge(Global, Default, newTheme);
  Global.setTheme = setTheme;
}

Default = {
  animate: true,
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

setTheme('default');

module.exports = Global;

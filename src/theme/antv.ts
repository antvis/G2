/** antv 主题色 */
const DEFAULT_COLOR = '#1890FF';
/** 10 个分类以内的色板 */
const COLOR_PLATE_10 = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];
/** 20 个分类以内的色板 */
const COLOR_PLATE_20 = [
  '#5B8FF9',
  '#BDD2FD',
  '#5AD8A6',
  '#BDEFDB',
  '#5D7092',
  '#C2C8D5',
  '#F6BD16',
  '#FBE5A2',
  '#E8684A',
  '#F6C3B7',
  '#6DC8EC',
  '#B6E3F5',
  '#9270CA',
  '#D3C6EA',
  '#FF9D4D',
  '#FFD8B8',
  '#269A99',
  '#AAD8D8',
  '#FF99C3',
  '#FF99C3',
  '#FFD6E7',
];
/** antv 默认字体 */
const FONT_FAMILY = `
  "-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue",
  Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
  SimSun, "sans-serif"'`;

export default {
  defaultColor: DEFAULT_COLOR,
  padding: 'auto',
  fontFamily: FONT_FAMILY,
  colors: COLOR_PLATE_10,
  colors_20: COLOR_PLATE_20,
  // TODO: @simaq
  widthRatio: {
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.9999999, // 玫瑰图柱状占比 1
    multiplePie: 1 / 1.3, // 多层的饼图、环图
  },

  /** 定义 interval 下各个 shape 的样式以及动画 */
  interval: {
    rect: {
      default: {
        lineWidth: 0,
        fill: DEFAULT_COLOR,
        fillOpacity: 0.85,
      },
      active: {},
      inactive: {},
      selected: {},
      animate: {},
    },
  },
};

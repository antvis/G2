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
  '#FFD6E7',
];
/** antv 默认字体 */
const FONT_FAMILY = `
  "-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue",
  Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
  SimSun, "sans-serif"'`;

const SHAPE_STYLE = {
  area: {
    lineWidth: 0,
    fill: DEFAULT_COLOR,
    fillOpacity: 0.6,
  },
  interval: {
    lineWidth: 0,
    fill: DEFAULT_COLOR,
    fillOpacity: 0.85,
  },
  hollowInterval: {
    fill: '#fff',
    stroke: DEFAULT_COLOR,
    fillOpacity: 0,
    lineWidth: 2,
  },
  line: {
    stroke: DEFAULT_COLOR,
    lineWidth: 2,
    fill: null,
  },
  polygon: {
    lineWidth: 0,
    fill: DEFAULT_COLOR,
    fillOpacity: 1,
  },
  point: {
    lineWidth: 1,
    fill: DEFAULT_COLOR,
    r: 4,
  },
  hollowPoint: {
    fill: '#fff',
    lineWidth: 1,
    stroke: DEFAULT_COLOR,
    r: 3,
  },
};

export default {
  defaultColor: DEFAULT_COLOR,
  padding: 'auto',
  fontFamily: FONT_FAMILY,
  colors: COLOR_PLATE_10,
  colors_20: COLOR_PLATE_20,
  /** 一般柱状图宽度占比 */
  columnWidthRatio: 1 / 2,
  /** 柱状图最大宽度 */
  maxColumnWidth: null,
  /** 柱状图最小宽度 */
  minColumnWidth: null,
  /** 玫瑰图占比 */
  roseWidthRatio: 0.9999999,
  /** 多层饼图/环图占比 */
  multiplePieWidthRatio: 1 / 1.3,
  /** 定义 interval 下各个 shape 的样式以及动画 */
  interval: {
    rect: {
      default: SHAPE_STYLE.interval,
      active: {},
      inactive: {},
      selected: {},
    },
    hollowRect: {
      default: SHAPE_STYLE.hollowInterval,
    },
    line: {
      default: SHAPE_STYLE.hollowInterval,
    },
    tick: {
      default: SHAPE_STYLE.hollowInterval,
    },
    funnel: {
      default: SHAPE_STYLE.interval,
    },
    pyramid: {
      default: SHAPE_STYLE.interval,
    },
  },
  line: {
    line: {
      default: SHAPE_STYLE.line,
    },
    dot: {
      default: {
        ...SHAPE_STYLE.line,
        lineDash: [1, 1],
      },
    },
    dash: {
      default: {
        ...SHAPE_STYLE.line,
        lineDash: [5.5, 1],
      },
    },
    smooth: {
      default: SHAPE_STYLE.line,
    },
    hv: {
      default: SHAPE_STYLE.line,
    },
    vh: {
      default: SHAPE_STYLE.line,
    },
    hvh: {
      default: SHAPE_STYLE.line,
    },
    vhv: {
      default: SHAPE_STYLE.line,
    },
  },
  polygon: {
    polygon: {
      default: SHAPE_STYLE.polygon,
    },
  },
  point: {
    circle: {
      default: SHAPE_STYLE.point,
    },
    square: {
      default: SHAPE_STYLE.point,
    },
    bowtie: {
      default: SHAPE_STYLE.point,
    },
    diamond: {
      default: SHAPE_STYLE.point,
    },
    hexagon: {
      default: SHAPE_STYLE.point,
    },
    triangle: {
      default: SHAPE_STYLE.point,
    },
    triangleDown: {
      default: SHAPE_STYLE.point,
    },
    hollowCircle: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowSquare: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowBowtie: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowDiamond: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowHexagon: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowTriangle: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hollowTriangleDown: {
      default: SHAPE_STYLE.hollowPoint,
    },
    cross: {
      default: SHAPE_STYLE.hollowPoint,
    },
    tick: {
      default: SHAPE_STYLE.hollowPoint,
    },
    plus: {
      default: SHAPE_STYLE.hollowPoint,
    },
    hyphen: {
      default: SHAPE_STYLE.hollowPoint,
    },
    line: {
      default: SHAPE_STYLE.hollowPoint,
    },
  },
};

/**
 * @description 图表默认主题
 */
import * as _ from '@antv/util';

const DEFAULT_COLOR = '#1890FF';

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
// tslint:disable-next-line
const FONT_FAMILY = '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, "sans-serif"';
// tooltip 相关 dom 的 css 类名
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip';
const TOOLTIP_TITLE_CLASS = 'g2-tooltip-title';
const TOOLTIP_LIST_CLASS = 'g2-tooltip-list';
const TOOLTIP_LIST_ITEM_CLASS = 'g2-tooltip-list-item';
const TOOLTIP_MARKER_CLASS = 'g2-tooltip-marker';
const TOOLTIP_VALUE_CLASS = 'g2-tooltip-value';

const SHAPE_STYLE = {
  area: {
    lineWidth: 0,
    fill: DEFAULT_COLOR,
    fillOpacity: 0.6,
  },
  hollowArea: {
    fill: '#fff',
    stroke: DEFAULT_COLOR,
    fillOpacity: 0,
    lineWidth: 2,
  },
  box: {
    stroke: DEFAULT_COLOR,
    lineWidth: 1,
    fill: null,
  },
  edge: {
    stroke: DEFAULT_COLOR,
    lineWidth: 1,
    fill: null,
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
  kline: {
    fill: DEFAULT_COLOR,
    lineWidth: 1,
    stroke: DEFAULT_COLOR,
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
  hollowPolygon: {
    fill: '#fff',
    stroke: DEFAULT_COLOR,
    fillOpacity: 0,
    lineWidth: 2,
  },
  point: {
    lineWidth: 1,
    fill: DEFAULT_COLOR,
    radius: 4,
  },
  hollowPoint: {
    fill: '#fff',
    lineWidth: 1,
    stroke: DEFAULT_COLOR,
    radius: 3,
  },
  text: {
    fill: DEFAULT_COLOR,
    textAlign: 'center',
    textBaseline: 'middle',
  },
};
const OPACITY_ACTIVE_STYLE = function (style) {
  const opacity = style.fillOpacity || style.opacity || 1;
  return {
    fillOpacity: _.clamp(opacity - 0.15, 0.1, 1),
    strokeOpacity: _.clamp(opacity - 0.15, 0.1, 1),
  };
};
const LINEWIDTH_ACTIVE_STYLE = function (style) {
  const lineWidth = style.lineWidth || 1;
  return {
    lineWidth: lineWidth + 1,
  };
};
const FILLOPACITY_ACTIVE_STYLE = function (style) {
  const fillOpacity = style.fillOpacity || style.opacity || 1;
  return {
    fillOpacity: _.clamp(fillOpacity - 0.15, 0.1, 1),
  };
};
const POINT_ACTIVE_STYLE = function (style) {
  const color = style.fill || style.fillStyle;
  const radius = style.size || style.radius;

  return {
    radius: radius + 1,
    shadowBlur: radius,
    shadowColor: color,
    stroke: color,
    strokeOpacity: 1,
    lineWidth: 1,
  };
};
const HOLLOW_POINT_ACTIVE_STYLE = function (style) {
  const color = style.stroke || style.strokeStyle;
  const radius = style.size || style.radius;

  return {
    radius: radius + 1,
    shadowBlur: radius,
    shadowColor: color,
    stroke: color,
    strokeOpacity: 1,
    lineWidth: 1,
  };
};
const TEXT_ACTIVE_STYLE = function (style) {
  const color = style.fill || style.fillStyle;

  return {
    stroke: color,
    strokeOpacity: 1,
    lineWidth: 1,
  };
};

// 坐标轴的通用配置
const DEFAULT_AXIS_CONFIG = {
  autoRotateLabel: true, // 当文本过长时，自动旋转文本
  autoHideLabel: false, // 文本重叠时自动隐藏
  autoRotateTitle: true, // 自动根据标题的位置旋转标题
  showTitle: false, // 默认不展示坐标轴标题
  gridType: 'line', // 网格线的类型
  title: {
    textStyle: {
      fontSize: 12,
      fill: '#ccc',
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
      textAlign: 'center',
    },
    offset: 20,
  },
  label: {
    offset: 16,
    textStyle: {
      fill: '#545454',
      fontSize: 12,
      lineHeight: 16,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
  },
  line: {
    lineWidth: 1,
    stroke: '#BFBFBF',
  },
  tickLine: {
    lineWidth: 1,
    stroke: '#BFBFBF',
    length: 4,
    alignWithLabel: true,
  },
  grid: {
    stroke: '#E9E9E9',
    lineWidth: 1,
    lineDash: [ 3, 3 ],
  },
};

// 图例的通用配置
const DEFAULT_LEGEND_CONFIG = {
  showTitle: false, // 默认不展示标题
  textStyle: {
    fill: '#8C8C8C',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle',
    lineHeight: 20,
    fontFamily: FONT_FAMILY,
  }, // 图例项文本的样式
  unSelectedColor: '#bfbfbf',
  titleStyle: {
    fill: '#333',
    textBaseline: 'top',
    textAlign: 'start',
    fontFamily: FONT_FAMILY,
  },
  flipPage: true, // 默认自动翻页
};

const Theme = {
  pixelRatio: null,
  defaultColor: DEFAULT_COLOR, // 默认主题色
  padding: [ 20, 20, 95, 80 ], // Todo：auto padding 逻辑加入后改成 'auto'
  fontFamily: FONT_FAMILY,
  colors: COLOR_PLATE_10,
  colors_20: COLOR_PLATE_20,
  shapes: {
    point: [ 'hollowCircle', 'hollowSquare', 'hollowDiamond', 'hollowBowtie', 'hollowTriangle',
      'hollowHexagon', 'cross', 'tick', 'plus', 'hyphen', 'line' ],
    line: [ 'line', 'dash', 'dot' ],
    area: [ 'area' ],
  },
  sizes: [ 1, 10 ],
  opacities: [ 0.1, 0.9 ],
  backgroundStyle: {
    fill: 'rgba(255,255,255,0)',
  },
  axis: {
    top: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      position: 'top',
      grid: null,
    }),
    bottom: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      position: 'bottom',
      grid: null,
    }),
    left: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      position: 'left',
      label: {
        offset: 8,
      },
      line: null,
      tickLine: null,
    }),
    right: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      position: 'right',
      label: {
        offset: 8,
      },
      line: null,
      tickLine: null,
    }),
    circle: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      label: {
        offset: 8,
        textStyle: {
          textBaseline: 'alphabetic',
        },
      },
    }),
    radius: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      label: {
        offset: 12,
      },
      gridType: 'arc',
    }),
    helix: _.deepMix({}, DEFAULT_AXIS_CONFIG, {
      label: null,
      grid: null,
    }),
  },
  label: {
    offset: 20,
    textStyle: {
      fill: '#545454',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
  },
  treemapLabels: {
    offset: 10,
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'top',
      fontStyle: 'bold',
      fontFamily: FONT_FAMILY,
    },
  },
  innerLabels: {
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
  },
  // 在theta坐标系下的饼图文本内部的样式
  thetaLabels: {
    labelHeight: 14,
    offset: 30,
    labelLine: {
      lineWidth: 1,
    },
  },
  defaultLegendPosition: 'bottom', // 默认图例的展示位置
  legend: {
    right: _.deepMix({}, DEFAULT_LEGEND_CONFIG, {
      position: 'right',
      layout: 'vertical',
      itemMarginBottom: 8,
      textStyle: {
        lineHeight: 0,
      },
    }),
    left: _.deepMix({}, DEFAULT_LEGEND_CONFIG, {
      position: 'left',
      layout: 'vertical',
      itemMarginBottom: 8,
    }),
    top: _.deepMix({}, DEFAULT_LEGEND_CONFIG, {
      position: 'top',
      layout: 'horizontal',
      itemDistance: 10,
    }),
    bottom: _.deepMix({}, DEFAULT_LEGEND_CONFIG, {
      position: 'bottom',
      layout: 'horizontal',
    }),
    // 定义 html 渲染图例的样式
    html: {
      position: 'bottom',
      layout: 'horizontal',
      showTitle: false,
      unSelectedColor: '#bfbfbf',
      backgroundStyle: {
        height: 'auto',
        width: 'auto',
        position: 'absolute',
        overflow: 'auto',
        fontSize: '12px',
        fontFamily: FONT_FAMILY,
        lineHeight: '20px',
        color: '#8C8C8C',
      },
      titleStyle: {
        marginBottom: '4px',
      },
      listStyle: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },
      itemStyle: {
        cursor: 'pointer',
        marginBottom: '5px',
        marginRight: '24px',
      },
      markerStyle: {
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '8px',
        verticalAlign: 'middle',
      },
    },
    margin: [ 0, 24, 24, 24 ], // 图例跟四个边的坐标轴、绘图区域的间距
    legendMargin: 24, // 图例之间的间距
  },
  tooltip: {
    useHtml: true,
    // css style for tooltip
    [`${TOOLTIP_CONTAINER_CLASS}`]: {
      position: 'absolute',
      visibility: 'hidden',
      // @2018-07-25 by blue.lb 这里去掉浮动，火狐上存在样式错位
      // whiteSpace: 'nowrap',
      zIndex: 8,
      // tslint:disable-next-line
      transition: 'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0px 0px 10px #aeaeae',
      borderRadius: '3px',
      color: 'rgb(87, 87, 87)',
      fontSize: '12px',
      fontFamily: FONT_FAMILY,
      lineHeight: '20px',
      padding: '10px 10px 6px 10px',
    },
    [`${TOOLTIP_TITLE_CLASS}`]: {
      marginBottom: '4px',
    },
    [`${TOOLTIP_LIST_CLASS}`]: {
      margin: 0,
      listStyleType: 'none',
      padding: 0,
    },
    [`${TOOLTIP_LIST_ITEM_CLASS}`]: {
      marginBottom: '4px',
    },
    [`${TOOLTIP_MARKER_CLASS}`]: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '8px',
    },
    [`${TOOLTIP_VALUE_CLASS}`]: {
      display: 'inline-block',
      float: 'right',
      marginLeft: '30px',
    },
  },
  tooltipMarker: {
    symbol: (x, y, r) => {
      return [
        [ 'M', x, y ],
        [ 'm', -r, 0 ],
        [ 'a', r, r, 0, 1, 0, r * 2, 0 ],
        [ 'a', r, r, 0, 1, 0, -r * 2, 0 ],
      ];
    },
    stroke: '#fff',
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffSetY: 0,
    shadowColor: 'rgba(0,0,0,0.09)',
    lineWidth: 2,
    radius: 4,
  }, // 提示信息在折线图、区域图上形成点的样式
  tooltipCrosshairsLine: {
    lineStyle: {
      stroke: 'rgba(0, 0, 0, 0.25)',
      lineWidth: 1,
    },
  },
  annotation: {
    line: {
      line: {
        style: {
          stroke: 'rgba(0, 0, 0, .65)',
          lineDash: [ 2, 2 ],
          lineWidth: 1,
        },
      },
      text: {
        position: 'start',
        autoRotate: true,
        style: {
          fill: 'rgba(0, 0, 0, .45)',
          fontSize: 12,
          textAlign: 'start',
          fontFamily: FONT_FAMILY,
          textBaseline: 'bottom',
        },
      },
    },
    text: {
      top: true,
      style: {
        fill: 'rgba(0,0,0,.5)',
        fontSize: 12,
        textBaseline: 'middle',
        textAlign: 'start',
        fontFamily: FONT_FAMILY,
      },
    },
    region: {
      top: false,
      style: {
        lineWidth: 0, // 辅助框的边框宽度
        fill: '#000', // 辅助框填充的颜色
        fillOpacity: 0.04, // 辅助框的背景透明度
      }, // 辅助框的图形样式属性
    },
    html: {
      alignX: 'middle',
      alignY: 'middle',
    },
    dataRegion: {
      region: {
        style: {
          lineWidth: 0,
          fill: '#000000',
          opacity: 0.04,
        },
      },
      text: {
        style: {
          textAlign: 'center',
          textBaseline: 'bottom',
          fontSize: 12,
          fill: 'rgba(0, 0, 0, .65)',
        },
      },
    },
    dataMarker: {
      top: true,
      direction: 'upward',
      autoAdjust: true,
      text: {
        display: true,
        style: {
          fill: 'rgba(0, 0, 0, .65)',
          opacity: 1,
          fontSize: 12,
          textAlign: 'start',
        },
      },
      line: {
        display: true,
        lineLength: 20,
        style: {
          stroke: '#A3B1BF',
          lineWidth: 1,
        },
      },
      point: {
        display: true,
        style: {
          r: 3,
          fill: '#FFFFFF',
          stroke: '#1890FF',
          lineWidth: 2,
        },
      },
    },
  },
  shape: {
    area: {
      area: {
        default: SHAPE_STYLE.area,
        active: OPACITY_ACTIVE_STYLE,
      },
      smooth: {
        default: SHAPE_STYLE.area,
        active: OPACITY_ACTIVE_STYLE,
      },
      line: {
        default: SHAPE_STYLE.hollowArea,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      smoothLine: {
        default: SHAPE_STYLE.hollowArea,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
    },
    box: {
      box: {
        default: SHAPE_STYLE.box,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
    },
    edge: {
      line: {
        default: SHAPE_STYLE.edge,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      vhv: {
        default: SHAPE_STYLE.edge,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      smooth: {
        default: SHAPE_STYLE.edge,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      arc: {
        default: SHAPE_STYLE.edge,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
    },
    interval: {
      rect: {
        default: SHAPE_STYLE.interval,
        active: FILLOPACITY_ACTIVE_STYLE,
      },
      hollowInterval: {
        default: SHAPE_STYLE.hollowInterval,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      line: {
        default: SHAPE_STYLE.hollowInterval,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      tick: {
        default: SHAPE_STYLE.hollowInterval,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      funnel: {
        default: SHAPE_STYLE.interval,
        active: FILLOPACITY_ACTIVE_STYLE,
      },
      pyramid: {
        default: SHAPE_STYLE.interval,
        active: FILLOPACITY_ACTIVE_STYLE,
      },
      'top-line': {
        default: SHAPE_STYLE.interval,
        active: FILLOPACITY_ACTIVE_STYLE,
      },
    },
    kline: {
      kline: {
        default: SHAPE_STYLE.kline,
        active: OPACITY_ACTIVE_STYLE,
      },
    },
    line: {
      line: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      dot: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      dash: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      smooth: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      hv: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      vh: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      hvh: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
      vhv: {
        default: SHAPE_STYLE.line,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
    },
    polygon: {
      polygon: {
        default: SHAPE_STYLE.polygon,
        active: FILLOPACITY_ACTIVE_STYLE,
      },
      hollow: {
        default: SHAPE_STYLE.hollowPolygon,
        active: LINEWIDTH_ACTIVE_STYLE,
      },
    },
    point: {
      circle: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      square: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      bowtie: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      diamond: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      hexagon: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      triangle: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      triangleDown: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      hollowCircle: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowSquare: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowBowtie: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowDiamond: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowHexagon: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowTriangle: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hollowTriangleDown: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      cross: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      tick: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      plus: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      hyphen: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      line: {
        default: SHAPE_STYLE.hollowPoint,
        active: HOLLOW_POINT_ACTIVE_STYLE,
      },
      rect: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      image: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
      path: {
        default: SHAPE_STYLE.point,
        active: POINT_ACTIVE_STYLE,
      },
    },
    text: {
      text: {
        default: SHAPE_STYLE.text,
        active: TEXT_ACTIVE_STYLE,
      },
    },
  },
};

export default Theme;

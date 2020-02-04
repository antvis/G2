import * as TOOLTIP_CSS_CONST from '@antv/component/lib/tooltip/css-const';
import { deepMix } from '@antv/util';

/** antv 主题色 */
const DEFAULT_COLOR = '#5B8FF9';
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
  SimSun, "sans-serif"`;

const SHAPE_STYLE = {
  hollowArea: {
    fill: '#fff',
    stroke: DEFAULT_COLOR,
    fillOpacity: 0,
    lineWidth: 2,
  },
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
    lineAppendWidth: 10,
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
  hollowPolygon: {
    fill: '#fff',
    stroke: DEFAULT_COLOR,
    fillOpacity: 0,
    lineWidth: 2,
  },
  edge: {
    stroke: DEFAULT_COLOR,
    lineWidth: 1,
    fill: null
  },
  schema: {
    stroke: DEFAULT_COLOR,
    lineWidth: 1,
    fill: null,
  },
};

const AXIS_STYLE = {
  position: '',
  title: {
    autoRotate: true,
    position: 'center', // start, center, end
    style: {
      fill: '#545454',
      fontSize: 12,
      lineHeight: 16,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
    offset: 32,
  },
  label: {
    autoRotate: true,
    autoHide: true,
    offset: 16,
    style: {
      fill: '#545454',
      fontSize: 12,
      lineHeight: 16,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
  },
  line: {
    style: {
      lineWidth: 1,
      stroke: '#BFBFBF',
    },
  },
  tickLine: {
    style: {
      lineWidth: 1,
      stroke: '#BFBFBF',
    },
    alignTick: true, // 默认刻度线和文本对齐
    length: 5,
  },
  subTickLine: null,
  animate: true,
};

const GRID_STYLE = {
  line: {
    type: 'line',
    style: {
      stroke: '#BFBFBF',
      lineWidth: 1,
      lineDash: [3, 3],
    },
  },
  animate: true,
};

const LEGEND_STYLE = {
  title: null,
  marker: { symbol: 'circle', style: { r: 4, fill: DEFAULT_COLOR } },
  itemName: {
    spacing: 5, // 如果右边有 value 使用这个间距
    style: {
      fill: '#545454',
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'middle',
    },
  },
  animate: false,
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
  shapes: {
    point: [
      'hollow-circle',
      'hollow-square',
      'hollow-diamond',
      'hollow-bowtie',
      'hollow-triangle',
      'hollow-hexagon',
      'cross',
      'tick',
      'plus',
      'hyphen',
      'line',
    ],
    line: ['line', 'dash', 'dot'],
    area: ['area'],
  },
  sizes: [1, 10],
  geometries: {
    interval: {
      rect: {
        default: SHAPE_STYLE.interval,
        active: {
          interval: { fillOpacity: 1 },
        },
        inactive: {
          interval: { fillOpacity: 0.3 },
        },
        selected: {},
      },
      'hollow-rect': {
        default: SHAPE_STYLE.hollowInterval,
        active: {
          interval: { lineWidth: 4 },
        },
      },
      line: {
        default: SHAPE_STYLE.hollowInterval,
        active: {
          interval: { lineWidth: 4 },
        },
      },
      tick: {
        default: SHAPE_STYLE.hollowInterval,
        active: {
          interval: { lineWidth: 4 },
        },
      },
      funnel: {
        default: SHAPE_STYLE.interval,
        active: {
          interval: { fillOpacity: 0.5 },
        },
      },
      pyramid: {
        default: SHAPE_STYLE.interval,
        active: {
          interval: { fillOpacity: 0.5 },
        },
      },
    },
    line: {
      line: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
        inactive: {
          line: { strokeOpacity: 0.3 },
        },
      },
      dot: {
        default: {
          ...SHAPE_STYLE.line,
          lineDash: [1, 1],
        },
        active: {
          line: { lineWidth: 4 },
        },
      },
      dash: {
        default: {
          ...SHAPE_STYLE.line,
          lineDash: [5.5, 1],
        },
        active: {
          line: { lineWidth: 4 },
        },
      },
      smooth: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
      },
      hv: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
      },
      vh: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
      },
      hvh: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
      },
      vhv: {
        default: SHAPE_STYLE.line,
        active: {
          line: { lineWidth: 4 },
        },
      },
    },
    polygon: {
      polygon: {
        default: SHAPE_STYLE.polygon,
        active: {
          polygon: { fillOpacity: 0.5 },
        },
      },
      hollow: {
        default: SHAPE_STYLE.hollowPolygon,
      },
    },
    point: {
      circle: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      square: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      bowtie: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      diamond: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      hexagon: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      triangle: {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      'triangle-down': {
        default: SHAPE_STYLE.point,
        active: {
          point: { fillOpacity: 0.5 },
        },
      },
      'hollow-circle': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-square': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-bowtie': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-diamond': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-hexagon': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-triangle': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      'hollow-triangle-down': {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      cross: {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      tick: {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      plus: {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      hyphen: {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
      line: {
        default: SHAPE_STYLE.hollowPoint,
        active: {
          point: { r: 4 },
        },
      },
    },
    area: {
      area: {
        default: SHAPE_STYLE.area,
        active: {
          area: { fillOpacity: 0.3 },
        },
      },
      smooth: {
        default: SHAPE_STYLE.area,
        active: {
          area: { fillOpacity: 0.3 },
        },
      },
      line: {
        default: SHAPE_STYLE.hollowArea,
        active: {
          area: { lineWidth: 4 },
        },
      },
      'smooth-line': {
        default: SHAPE_STYLE.hollowArea,
        active: {
          area: { lineWidth: 4 },
        },
      },
    },
    schema: {
      candle: {
        default: SHAPE_STYLE.schema,
        active: {
          schema: {
            lineWidth: 2,
          },
        },
      },
      box: {
        default: SHAPE_STYLE.schema,
        active: {
          schema: {
            lineWidth: 2,
          },
        },
      },
    },
    edge: {
      line: {
        default: SHAPE_STYLE.edge,
        active: {
          edge: { lineWidth: 2 },
        },
      },
      vhv: {
        default: SHAPE_STYLE.edge,
        active: {
          edge: { lineWidth: 2 },
        },
      },
      smooth: {
        default: SHAPE_STYLE.edge,
        active: {
          edge: { lineWidth: 2 },
        },
      },
      arc: {
        default: SHAPE_STYLE.edge,
        active: {
          edge: { lineWidth: 2 },
        },
      },
    }
  },
  components: {
    axis: {
      top: deepMix({}, AXIS_STYLE, {
        grid: null,
        title: null,
      }),
      bottom: deepMix({}, AXIS_STYLE, {
        grid: null,
        title: null,
      }),
      left: deepMix({}, AXIS_STYLE, {
        label: {
          offset: 8,
        },
        title: null,
        line: null,
        tickLine: null,
        grid: GRID_STYLE,
      }),
      right: deepMix({}, AXIS_STYLE, {
        label: {
          offset: 8,
        },
        title: null,
        line: null,
        tickLine: null,
        grid: GRID_STYLE,
      }),
      circle: deepMix({}, AXIS_STYLE, {
        title: null,
        label: {
          offset: 8,
        },
        grid: deepMix({}, GRID_STYLE, { line: { type: 'line' } }),
      }),
      radius: deepMix({}, AXIS_STYLE, {
        title: null,
        label: {
          offset: 8,
        },
        grid: deepMix({}, GRID_STYLE, { line: { type: 'circle' } }),
      }),
    },
    legend: {
      right: deepMix({}, LEGEND_STYLE, {
        layout: 'vertical',
      }),
      left: deepMix({}, LEGEND_STYLE, {
        layout: 'vertical',
      }),
      top: deepMix({}, LEGEND_STYLE, {
        layout: 'horizontal',
      }),
      bottom: deepMix({}, LEGEND_STYLE, {
        layout: 'horizontal',
      }),
      continuous: {
        title: null,
        background: null,
        track: {},
        rail: {
          type: 'color',
          size: 16,
          defaultLength: 100,
          style: {},
        },
        label: {
          align: 'rail',
          spacing: 4, // 文本和 rail 的间距
          formatter: null,
          style: {
            fill: '#545454',
            fontSize: 12,
            lineHeight: 16,
            textBaseline: 'middle',
            fontFamily: FONT_FAMILY,
          },
        },
        handler: {
          size: 8,
          style: {
            fill: '#fff',
            stroke: '#333',
          },
        },
        slidable: true,
      },
    },
    tooltip: {
      follow: false,
      showCrosshairs: false,
      showTooltipMarkers: true,
      shared: false,
      tooltipMarker: {
        symbol: 'circle',
        stroke: '#fff',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffSetY: 0,
        shadowColor: 'rgba(0,0,0,0.09)',
        lineWidth: 2,
        r: 4,
      },
      crosshairs: {
        line: {
          style: {
            stroke: '#BFBFBF',
            lineWidth: 1,
          },
        },
        text: null,
        textBackground: {
          padding: 2,
          style: {
            fill: 'rgba(0, 0, 0, 0.25)',
            lineWidth: 0,
            stroke: null,
          },
        },
      },
      // tooltip dom 样式
      domStyles: {
        [`${TOOLTIP_CSS_CONST.CONTAINER_CLASS}`]: {
          position: 'absolute',
          visibility: 'hidden',
          zIndex: 8,
          transition:
            'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), ' +
            'left 0.4s cubic-bezier(0.23, 1, 0.32, 1), ' +
            'top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 0px 10px #aeaeae',
          borderRadius: '3px',
          color: 'rgb(87, 87, 87)',
          fontSize: '12px',
          fontFamily: FONT_FAMILY,
          lineHeight: '20px',
          padding: '10px 10px 6px 10px',
        },
        [`${TOOLTIP_CSS_CONST.TITLE_CLASS}`]: {
          marginBottom: '4px',
        },
        [`${TOOLTIP_CSS_CONST.LIST_CLASS}`]: {
          margin: 0,
          listStyleType: 'none',
          padding: 0,
        },
        [`${TOOLTIP_CSS_CONST.LIST_ITEM_CLASS}`]: {
          listStyleType: 'none',
          padding: 0,
          marginBottom: '4px',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        },
        [`${TOOLTIP_CSS_CONST.MARKER_CLASS}`]: {
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '8px',
        },
        [`${TOOLTIP_CSS_CONST.VALUE_CLASS}`]: {
          display: 'inline-block',
          float: 'right',
          marginLeft: '30px',
        },
      },
    },
    annotation: {
      arc: {
        style: {
          stroke: 'rgba(0, 0, 0, .65)',
          lineWidth: 1,
        },
        animate: true,
      },
      line: {
        style: {
          stroke: 'rgba(0, 0, 0, .65)',
          lineDash: [2, 2],
          lineWidth: 1,
        },
        text: {
          position: 'start',
          autoRotate: true,
          style: {
            fill: 'rgba(0, 0, 0, .45)',
            stroke: null,
            fontSize: 12,
            textAlign: 'start',
            fontFamily: FONT_FAMILY,
            textBaseline: 'bottom',
          },
        },
        animate: true,
      },
      text: {
        style: {
          fill: 'rgba(0,0,0,.5)',
          fontSize: 12,
          textBaseline: 'middle',
          textAlign: 'start',
          fontFamily: FONT_FAMILY,
        },
        animate: true,
      },
      region: {
        top: false,
        style: {
          lineWidth: 0, // 辅助框的边框宽度
          fill: '#000', // 辅助框填充的颜色
          fillOpacity: 0.04, // 辅助框的背景透明度
        }, // 辅助框的图形样式属性
        animate: true,
      },
      image: {
        top: false,
        animate: true,
      },
      dataMarker: {
        top: true,
        point: {
          style: {
            r: 3,
            fill: '#FFFFFF',
            stroke: '#1890FF',
            lineWidth: 2,
          },
        },
        line: {
          style: {
            stroke: '#A3B1BF',
            lineWidth: 1,
          },
          length: 20,
        },
        text: {
          style: {
            fill: 'rgba(0, 0, 0, .65)',
            opacity: 1,
            fontSize: 12,
            textAlign: 'start'
          },
        },
        direction: 'upward',
        autoAdjust: true,
        animate: true,
      },
      dataRegion: {
        style: {
          region: {
            lineWidth: 0,
            fill: '#000000',
            opacity: 0.04,
          },
          text: {
            textAlign: 'center',
            textBaseline: 'bottom',
            fontSize: 12,
            fill: 'rgba(0, 0, 0, .65)',
          },
        },
        animate: true,
      },
    },
  },
  labels: {
    offset: 12,
    style: {
      fill: '#545454',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
      stroke: '#fff',
      lineWidth: 1,
    },
    autoRotate: true,
  },
  innerLabels: {
    style: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
      stroke: null,
      lineWidth: 0,
    },
    autoRotate: true,
  },
  thetaLabels: {
    labelHeight: 14,
    offset: 30,
    labelLine: {
      style: {
        lineWidth: 1,
      },
    },
    autoRotate: true,
  },
};

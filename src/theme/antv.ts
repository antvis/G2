import * as TOOLTIP_CSS_CONST from '@antv/component/lib/tooltip/css-const';
import { transform } from '@antv/matrix-util';
import { deepMix } from '@antv/util';
import Element from '../geometry/element';
import { getAngle } from '../util/graphics';

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

/** antv 默认字体 */
const FONT_FAMILY = `
  "-apple-system", "Segoe UI", Roboto,"Helvetica Neue",
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
  alignTick: true,
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
  flipPage: true,
  animate: false,
};

export default {
  defaultColor: DEFAULT_COLOR,
  padding: 'auto',
  fontFamily: FONT_FAMILY,
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
  colors: COLOR_PLATE_10,
  shapes: {
    point: [
      'hollow-circle',
      'hollow-square',
      'hollow-bowtie',
      'hollow-diamond',
      'hollow-hexagon',
      'hollow-triangle',
      'hollow-triangle-down',
      'circle',
      'square',
      'bowtie',
      'diamond',
      'hexagon',
      'triangle',
      'triangle-down',
      'cross',
      'tick',
      'plus',
      'hyphen',
      'line',
    ],
    line: ['line', 'dash', 'dot', 'smooth'],
    area: ['area', 'smooth', 'line', 'smooth-line'],
    interval: ['rect', 'hollow-rect', 'line', 'tick' ],
  },
  sizes: [1, 10],
  geometries: {
    interval: {
      rect: {
        default: {
          style: SHAPE_STYLE.interval,
        },
        active: {
          style: { fillOpacity: 1 }
        },
        inactive: {
          style: { fillOpacity: 0.3 },
        },
        selected: {
          animateCfg: {
            duration: 300,
          },
          style: (element: Element) => {
            const coordinate = element.geometry.coordinate;
            if (coordinate.isPolar && coordinate.isTransposed) {
              const { startAngle, endAngle } = getAngle(element.getModel(), coordinate);
              const middleAngle = (startAngle + endAngle) / 2;
              const r = 7.5;
              const x = r * Math.cos(middleAngle);
              const y = r * Math.sin(middleAngle);
              return {
                matrix: transform(null, [['t', x, y]]),
              };
            }
          }
        },
      },
      'hollow-rect': {
        default: {
          style: SHAPE_STYLE.hollowInterval,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      line: {
        default: {
          style: SHAPE_STYLE.hollowInterval,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      tick: {
        default: {
          style: SHAPE_STYLE.hollowInterval,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      funnel: {
        default: {
          style: SHAPE_STYLE.interval,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      pyramid: {
        default: {
          style: SHAPE_STYLE.interval,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
    },
    line: {
      line: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
        inactive: {
          style: { strokeOpacity: 0.3 },
        },
      },
      dot: {
        default: {
          style: {
            ...SHAPE_STYLE.line,
            lineDash: [1, 1],
          },
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      dash: {
        default: {
          style: {
            ...SHAPE_STYLE.line,
            lineDash: [5.5, 1],
          },
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      smooth: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      hv: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      vh: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      hvh: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      vhv: {
        default: {
          style: SHAPE_STYLE.line,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
    },
    polygon: {
      polygon: {
        default: {
          style: SHAPE_STYLE.polygon,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
    },
    point: {
      circle: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      square: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      bowtie: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      diamond: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      hexagon: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      triangle: {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      'triangle-down': {
        default: {
          style: SHAPE_STYLE.point,
        },
        active: {
          style: { fillOpacity: 0.5 },
        },
      },
      'hollow-circle': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-square': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-bowtie': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-diamond': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-hexagon': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-triangle': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      'hollow-triangle-down': {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      cross: {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      tick: {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      plus: {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      hyphen: {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
      line: {
        default: {
          style: SHAPE_STYLE.hollowPoint
        },
        active: {
          style: { r: 4 },
        },
      },
    },
    area: {
      area: {
        default: {
          style: SHAPE_STYLE.area,
        },
        active: {
          style: { fillOpacity: 0.3 },
        },
      },
      smooth: {
        default: {
          style: SHAPE_STYLE.area,
        },
        active: {
          style: { fillOpacity: 0.3 },
        },
      },
      line: {
        default: {
          style: SHAPE_STYLE.hollowArea,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
      'smooth-line': {
        default: {
          style: SHAPE_STYLE.hollowArea,
        },
        active: {
          style: { lineWidth: 4 },
        },
      },
    },
    schema: {
      candle: {
        default: {
          style: SHAPE_STYLE.schema,
        },
        active: {
          style: { lineWidth: 2 },
        },
      },
      box: {
        default: {
          style: SHAPE_STYLE.schema,
        },
        active: {
          style: { lineWidth: 2 },
        },
      },
    },
    edge: {
      line: {
        default: {
          style: SHAPE_STYLE.edge,
        },
        active: {
          style: { lineWidth: 2 },
        },
      },
      vhv: {
        default: {
          style: SHAPE_STYLE.edge,
        },
        active: {
          style: { lineWidth: 2 },
        },
      },
      smooth: {
        default: {
          style: SHAPE_STYLE.edge,
        },
        active: {
          style: { lineWidth: 2 },
        },
      },
      arc: {
        default: {
          style: SHAPE_STYLE.edge,
        },
        active: {
          style: { lineWidth: 2 },
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
      showMarkers: true,
      shared: false,
      marker: {
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
  pieLabels: {
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

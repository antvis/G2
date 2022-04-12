import { TOOLTIP_CSS_CONST } from '@antv/component';
import { ext } from '@antv/matrix-util';
import { deepMix } from '@antv/util';
import Element from '../../geometry/element';
import { LooseObject, StyleSheet } from '../../interface';
import { getAngle } from '../../util/graphics';

/**
 * 根据样式表创建 axis 组件主题样式
 * @param styleSheet
 */
function createAxisStyles(styleSheet: StyleSheet): LooseObject {
  return {
    title: {
      autoRotate: true,
      position: 'center', // start, center, end
      spacing: styleSheet.axisTitleSpacing,
      style: {
        fill: styleSheet.axisTitleTextFillColor,
        fontSize: styleSheet.axisTitleTextFontSize,
        lineHeight: styleSheet.axisTitleTextLineHeight,
        textBaseline: 'middle',
        fontFamily: styleSheet.fontFamily,
      },
      iconStyle: {
        fill: styleSheet.axisDescriptionIconFillColor
      }
    },
    label: {
      autoRotate: false,
      autoEllipsis: false,
      autoHide: { type: 'equidistance', cfg: { minGap: 6 } },
      offset: styleSheet.axisLabelOffset,
      style: {
        fill: styleSheet.axisLabelFillColor,
        fontSize: styleSheet.axisLabelFontSize,
        lineHeight: styleSheet.axisLabelLineHeight,
        fontFamily: styleSheet.fontFamily,
      },
    },
    line: {
      style: {
        lineWidth: styleSheet.axisLineBorder,
        stroke: styleSheet.axisLineBorderColor,
      },
    },
    grid: {
      line: {
        type: 'line',
        style: {
          stroke: styleSheet.axisGridBorderColor,
          lineWidth: styleSheet.axisGridBorder,
          lineDash: styleSheet.axisGridLineDash,
        },
      },
      alignTick: true,
      animate: true,
    },
    tickLine: {
      style: {
        lineWidth: styleSheet.axisTickLineBorder,
        stroke: styleSheet.axisTickLineBorderColor,
      },
      alignTick: true, // 默认刻度线和文本对齐
      length: styleSheet.axisTickLineLength,
    },
    subTickLine: null,
    animate: true,
  };
}

/**
 *
 * @param styleSheet
 */
// export function

/**
 * 根据样式表创建 legend 组件主题样式
 * @param styleSheet
 */
function createLegendStyles(styleSheet: StyleSheet): LooseObject {
  return {
    title: null,
    marker: {
      symbol: 'circle',
      spacing: styleSheet.legendMarkerSpacing,
      style: {
        r: styleSheet.legendCircleMarkerSize,
        fill: styleSheet.legendMarkerColor,
      },
    },
    itemName: {
      spacing: 5, // 如果右边有 value 使用这个间距
      style: {
        fill: styleSheet.legendItemNameFillColor,
        fontFamily: styleSheet.fontFamily,
        fontSize: styleSheet.legendItemNameFontSize,
        lineHeight: styleSheet.legendItemNameLineHeight,
        fontWeight: styleSheet.legendItemNameFontWeight,
        textAlign: 'start',
        textBaseline: 'middle',
      },
    },
    itemStates: {
      active: {
        nameStyle: {
          opacity: 0.8,
        },
      },
      unchecked: {
        nameStyle: {
          fill: '#D8D8D8',
        },
        markerStyle: {
          fill: '#D8D8D8',
          stroke: '#D8D8D8',
        },
      },
      inactive: {
        nameStyle: {
          fill: '#D8D8D8',
        },
        markerStyle: {
          opacity: 0.2,
        },
      },
    },
    flipPage: true,
    pageNavigator: {
      marker: {
        style: {
          size: styleSheet.legendPageNavigatorMarkerSize,
          inactiveFill: styleSheet.legendPageNavigatorMarkerInactiveFillColor,
          inactiveOpacity: styleSheet.legendPageNavigatorMarkerInactiveFillOpacity,
          fill: styleSheet.legendPageNavigatorMarkerFillColor,
          opacity: styleSheet.legendPageNavigatorMarkerFillOpacity,
        },
      },
      text: {
        style: {
          fill: styleSheet.legendPageNavigatorTextFillColor,
          fontSize: styleSheet.legendPageNavigatorTextFontSize,
        },
      },
    },
    animate: false,
    maxItemWidth: 200,
    itemSpacing: styleSheet.legendItemSpacing,
    itemMarginBottom: styleSheet.legendItemMarginBottom,
    padding: styleSheet.legendPadding, // 图例组件自己的外边距
  };
}

/**
 * 根据主题样式表生成主题结构
 * @param styleSheet 主题样式表
 */
export function createThemeByStyleSheet(styleSheet: StyleSheet): LooseObject {
  const shapeStyles = {
    point: {
      default: {
        fill: styleSheet.pointFillColor,
        r: styleSheet.pointSize,
        stroke: styleSheet.pointBorderColor,
        lineWidth: styleSheet.pointBorder,
        fillOpacity: styleSheet.pointFillOpacity,
      },
      active: {
        stroke: styleSheet.pointActiveBorderColor,
        lineWidth: styleSheet.pointActiveBorder,
      },
      selected: {
        stroke: styleSheet.pointSelectedBorderColor,
        lineWidth: styleSheet.pointSelectedBorder,
      },
      inactive: {
        fillOpacity: styleSheet.pointInactiveFillOpacity,
        strokeOpacity: styleSheet.pointInactiveBorderOpacity,
      },
    },
    hollowPoint: {
      default: {
        fill: styleSheet.hollowPointFillColor,
        lineWidth: styleSheet.hollowPointBorder,
        stroke: styleSheet.hollowPointBorderColor,
        strokeOpacity: styleSheet.hollowPointBorderOpacity,
        r: styleSheet.hollowPointSize,
      },
      active: {
        stroke: styleSheet.hollowPointActiveBorderColor,
        strokeOpacity: styleSheet.hollowPointActiveBorderOpacity,
      },
      selected: {
        lineWidth: styleSheet.hollowPointSelectedBorder,
        stroke: styleSheet.hollowPointSelectedBorderColor,
        strokeOpacity: styleSheet.hollowPointSelectedBorderOpacity,
      },
      inactive: {
        strokeOpacity: styleSheet.hollowPointInactiveBorderOpacity,
      },
    },
    area: {
      default: {
        fill: styleSheet.areaFillColor,
        fillOpacity: styleSheet.areaFillOpacity,
        stroke: null,
      },
      active: {
        fillOpacity: styleSheet.areaActiveFillOpacity,
      },
      selected: {
        fillOpacity: styleSheet.areaSelectedFillOpacity,
      },
      inactive: {
        fillOpacity: styleSheet.areaInactiveFillOpacity,
      },
    },
    hollowArea: {
      default: {
        fill: null,
        stroke: styleSheet.hollowAreaBorderColor,
        lineWidth: styleSheet.hollowAreaBorder,
        strokeOpacity: styleSheet.hollowAreaBorderOpacity,
      },
      active: {
        fill: null,
        lineWidth: styleSheet.hollowAreaActiveBorder,
      },
      selected: {
        fill: null,
        lineWidth: styleSheet.hollowAreaSelectedBorder,
      },
      inactive: {
        strokeOpacity: styleSheet.hollowAreaInactiveBorderOpacity,
      },
    },
    interval: {
      default: {
        fill: styleSheet.intervalFillColor,
        fillOpacity: styleSheet.intervalFillOpacity,
      },
      active: {
        stroke: styleSheet.intervalActiveBorderColor,
        lineWidth: styleSheet.intervalActiveBorder,
      },
      selected: {
        stroke: styleSheet.intervalSelectedBorderColor,
        lineWidth: styleSheet.intervalSelectedBorder,
      },
      inactive: {
        fillOpacity: styleSheet.intervalInactiveFillOpacity,
        strokeOpacity: styleSheet.intervalInactiveBorderOpacity,
      },
    },
    hollowInterval: {
      default: {
        fill: styleSheet.hollowIntervalFillColor,
        stroke: styleSheet.hollowIntervalBorderColor,
        lineWidth: styleSheet.hollowIntervalBorder,
        strokeOpacity: styleSheet.hollowIntervalBorderOpacity,
      },
      active: {
        stroke: styleSheet.hollowIntervalActiveBorderColor,
        lineWidth: styleSheet.hollowIntervalActiveBorder,
        strokeOpacity: styleSheet.hollowIntervalActiveBorderOpacity,
      },
      selected: {
        stroke: styleSheet.hollowIntervalSelectedBorderColor,
        lineWidth: styleSheet.hollowIntervalSelectedBorder,
        strokeOpacity: styleSheet.hollowIntervalSelectedBorderOpacity,
      },
      inactive: {
        stroke: styleSheet.hollowIntervalInactiveBorderColor,
        lineWidth: styleSheet.hollowIntervalInactiveBorder,
        strokeOpacity: styleSheet.hollowIntervalInactiveBorderOpacity,
      },
    },
    line: {
      default: {
        stroke: styleSheet.lineBorderColor,
        lineWidth: styleSheet.lineBorder,
        strokeOpacity: styleSheet.lineBorderOpacity,
        fill: null,
        lineAppendWidth: 10,
        lineCap: 'round',
        lineJoin: 'round',
      },
      active: {
        lineWidth: styleSheet.lineActiveBorder,
      },
      selected: {
        lineWidth: styleSheet.lineSelectedBorder,
      },
      inactive: {
        strokeOpacity: styleSheet.lineInactiveBorderOpacity,
      },
    },
  };
  const axisStyles = createAxisStyles(styleSheet);
  const legendStyles = createLegendStyles(styleSheet);

  return {
    background: styleSheet.backgroundColor,
    defaultColor: styleSheet.brandColor,
    subColor: styleSheet.subColor,
    semanticRed: styleSheet.paletteSemanticRed,
    semanticGreen: styleSheet.paletteSemanticGreen,
    padding: 'auto',
    fontFamily: styleSheet.fontFamily,
    // 兼容Theme配置
    /** 一般柱状图宽度占比，geometry中已添加默认值，为了geometry配置生效默认值为null */
    columnWidthRatio: 1 / 2,
    /** 柱状图最大宽度 */
    maxColumnWidth: null,
    /** 柱状图最小宽度 */
    minColumnWidth: null,
    /** 玫瑰图占比 */
    roseWidthRatio: 0.9999999,
    /** 多层饼图/环图占比 */
    multiplePieWidthRatio: 1 / 1.3,
    colors10: styleSheet.paletteQualitative10,
    colors20: styleSheet.paletteQualitative20,
    sequenceColors: styleSheet.paletteSequence,
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
      interval: ['rect', 'hollow-rect', 'line', 'tick'],
    },
    sizes: [1, 10],
    geometries: {
      interval: {
        rect: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: (element: Element) => {
              const coordinate = element.geometry.coordinate;
              if (coordinate.isPolar && coordinate.isTransposed) {
                const { startAngle, endAngle } = getAngle(element.getModel(), coordinate);
                const middleAngle = (startAngle + endAngle) / 2;
                const r = 7.5;
                const x = r * Math.cos(middleAngle);
                const y = r * Math.sin(middleAngle);
                return {
                  matrix: ext.transform(null, [['t', x, y]]),
                };
              }
              return shapeStyles.interval.selected;
            },
          },
        },
        'hollow-rect': {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        tick: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        funnel: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
        pyramid: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
      },
      line: {
        line: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        dot: {
          default: {
            style: {
              ...shapeStyles.line.default,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          active: {
            style: {
              ...shapeStyles.line.active,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          inactive: {
            style: {
              ...shapeStyles.line.inactive,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          selected: {
            style: {
              ...shapeStyles.line.selected,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
        },
        dash: {
          default: {
            style: {
              ...shapeStyles.line.default,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          active: {
            style: {
              ...shapeStyles.line.active,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          inactive: {
            style: {
              ...shapeStyles.line.inactive,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          selected: {
            style: {
              ...shapeStyles.line.selected,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vh: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hvh: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vhv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
      },
      polygon: {
        polygon: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
      },
      point: {
        circle: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        square: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        bowtie: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        diamond: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        hexagon: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        triangle: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        'triangle-down': {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        'hollow-circle': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-square': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-bowtie': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-diamond': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-hexagon': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-triangle': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-triangle-down': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        cross: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        tick: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        plus: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        hyphen: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
      },
      area: {
        area: {
          default: {
            style: shapeStyles.area.default,
          },
          active: {
            style: shapeStyles.area.active,
          },
          inactive: {
            style: shapeStyles.area.inactive,
          },
          selected: {
            style: shapeStyles.area.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.area.default,
          },
          active: {
            style: shapeStyles.area.active,
          },
          inactive: {
            style: shapeStyles.area.inactive,
          },
          selected: {
            style: shapeStyles.area.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
        'smooth-line': {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
      },
      schema: {
        candle: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        box: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
      },
      edge: {
        line: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vhv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        arc: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
      },
      violin: {
        violin: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hollow: {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
        'hollow-smooth': {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
      },
    },
    components: {
      axis: {
        common: axisStyles,
        top: {
          position: 'top',
          grid: null,
          title: null,
          verticalLimitLength: 1 / 2,
        },
        bottom: {
          position: 'bottom',
          grid: null,
          title: null,
          verticalLimitLength: 1 / 2,
        },
        left: {
          position: 'left',
          title: null,
          line: null,
          tickLine: null,
          verticalLimitLength: 1 / 3,
        },
        right: {
          position: 'right',
          title: null,
          line: null,
          tickLine: null,
          verticalLimitLength: 1 / 3,
        },
        circle: {
          title: null,
          grid: deepMix({}, axisStyles.grid, { line: { type: 'line' } }),
        },
        radius: {
          title: null,
          grid: deepMix({}, axisStyles.grid, { line: { type: 'circle' } }),
        },
      },
      legend: {
        common: legendStyles,
        right: {
          layout: 'vertical',
          padding: styleSheet.legendVerticalPadding,
        },
        left: {
          layout: 'vertical',
          padding: styleSheet.legendVerticalPadding,
        },
        top: {
          layout: 'horizontal',
          padding: styleSheet.legendHorizontalPadding,
        },
        bottom: {
          layout: 'horizontal',
          padding: styleSheet.legendHorizontalPadding,
        },
        continuous: {
          title: null,
          background: null,
          track: {},
          rail: {
            type: 'color',
            size: styleSheet.sliderRailHeight,
            defaultLength: styleSheet.sliderRailWidth,
            style: {
              fill: styleSheet.sliderRailFillColor,
              stroke: styleSheet.sliderRailBorderColor,
              lineWidth: styleSheet.sliderRailBorder,
            },
          },
          label: {
            align: 'rail',
            spacing: 4, // 文本和 rail 的间距
            formatter: null,
            style: {
              fill: styleSheet.sliderLabelTextFillColor,
              fontSize: styleSheet.sliderLabelTextFontSize,
              lineHeight: styleSheet.sliderLabelTextLineHeight,
              textBaseline: 'middle',
              fontFamily: styleSheet.fontFamily,
            },
          },
          handler: {
            size: styleSheet.sliderHandlerWidth,
            style: {
              fill: styleSheet.sliderHandlerFillColor,
              stroke: styleSheet.sliderHandlerBorderColor,
            },
          },
          slidable: true,
          padding: legendStyles.padding,
        },
      },
      tooltip: {
        showContent: true,
        follow: true,
        showCrosshairs: false,
        showMarkers: true,
        shared: false,
        enterable: false,
        position: 'auto',
        marker: {
          symbol: 'circle',
          stroke: '#fff',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.09)',
          lineWidth: 2,
          r: 4,
        },
        crosshairs: {
          line: {
            style: {
              stroke: styleSheet.tooltipCrosshairsBorderColor,
              lineWidth: styleSheet.tooltipCrosshairsBorder,
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
          follow: false,
        },
        // tooltip dom 样式
        domStyles: {
          [`${TOOLTIP_CSS_CONST.CONTAINER_CLASS}`]: {
            position: 'absolute',
            visibility: 'hidden',
            zIndex: 8,
            transition: 'left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s',
            backgroundColor: styleSheet.tooltipContainerFillColor,
            opacity: styleSheet.tooltipContainerFillOpacity,
            boxShadow: styleSheet.tooltipContainerShadow,
            borderRadius: `${styleSheet.tooltipContainerBorderRadius}px`,
            color: styleSheet.tooltipTextFillColor,
            fontSize: `${styleSheet.tooltipTextFontSize}px`,
            fontFamily: styleSheet.fontFamily,
            lineHeight: `${styleSheet.tooltipTextLineHeight}px`,
            padding: '0 12px 0 12px',
          },
          [`${TOOLTIP_CSS_CONST.TITLE_CLASS}`]: {
            marginBottom: '12px',
            marginTop: '12px',
          },
          [`${TOOLTIP_CSS_CONST.LIST_CLASS}`]: {
            margin: 0,
            listStyleType: 'none',
            padding: 0,
          },
          [`${TOOLTIP_CSS_CONST.LIST_ITEM_CLASS}`]: {
            listStyleType: 'none',
            padding: 0,
            marginBottom: '12px',
            marginTop: '12px',
            marginLeft: 0,
            marginRight: 0,
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
            stroke: styleSheet.annotationArcBorderColor,
            lineWidth: styleSheet.annotationArcBorder,
          },
          animate: true,
        },
        line: {
          style: {
            stroke: styleSheet.annotationLineBorderColor,
            lineDash: styleSheet.annotationLineDash,
            lineWidth: styleSheet.annotationLineBorder,
          },
          text: {
            position: 'start',
            autoRotate: true,
            style: {
              fill: styleSheet.annotationTextFillColor,
              stroke: styleSheet.annotationTextBorderColor,
              lineWidth: styleSheet.annotationTextBorder,
              fontSize: styleSheet.annotationTextFontSize,
              textAlign: 'start',
              fontFamily: styleSheet.fontFamily,
              textBaseline: 'bottom',
            },
          },
          animate: true,
        },
        text: {
          style: {
            fill: styleSheet.annotationTextFillColor,
            stroke: styleSheet.annotationTextBorderColor,
            lineWidth: styleSheet.annotationTextBorder,
            fontSize: styleSheet.annotationTextFontSize,
            textBaseline: 'middle',
            textAlign: 'start',
            fontFamily: styleSheet.fontFamily,
          },
          animate: true,
        },
        region: {
          top: false,
          style: {
            lineWidth: styleSheet.annotationRegionBorder,
            stroke: styleSheet.annotationRegionBorderColor,
            fill: styleSheet.annotationRegionFillColor,
            fillOpacity: styleSheet.annotationRegionFillOpacity,
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
              stroke: styleSheet.brandColor,
              lineWidth: 2,
            },
          },
          line: {
            style: {
              stroke: styleSheet.annotationLineBorderColor,
              lineWidth: styleSheet.annotationLineBorder,
            },
            length: styleSheet.annotationDataMarkerLineLength,
          },
          text: {
            style: {
              textAlign: 'start',
              fill: styleSheet.annotationTextFillColor,
              stroke: styleSheet.annotationTextBorderColor,
              lineWidth: styleSheet.annotationTextBorder,
              fontSize: styleSheet.annotationTextFontSize,
              fontFamily: styleSheet.fontFamily,
            },
          },
          direction: 'upward',
          autoAdjust: true,
          animate: true,
        },
        dataRegion: {
          style: {
            region: {
              fill: styleSheet.annotationRegionFillColor,
              fillOpacity: styleSheet.annotationRegionFillOpacity,
            },
            text: {
              textAlign: 'center',
              textBaseline: 'bottom',
              fill: styleSheet.annotationTextFillColor,
              stroke: styleSheet.annotationTextBorderColor,
              lineWidth: styleSheet.annotationTextBorder,
              fontSize: styleSheet.annotationTextFontSize,
              fontFamily: styleSheet.fontFamily,
            },
          },
          animate: true,
        },
      },
      slider: {
        common: {
          padding: [8, 8, 8, 8],
          backgroundStyle: {
            fill: styleSheet.cSliderBackgroundFillColor,
            opacity: styleSheet.cSliderBackgroundFillOpacity,
          },
          foregroundStyle: {
            fill: styleSheet.cSliderForegroundFillColor,
            opacity: styleSheet.cSliderForegroundFillOpacity,
          },
          handlerStyle: {
            width: styleSheet.cSliderHandlerWidth,
            height: styleSheet.cSliderHandlerHeight,
            fill: styleSheet.cSliderHandlerFillColor,
            opacity: styleSheet.cSliderHandlerFillOpacity,
            stroke: styleSheet.cSliderHandlerBorderColor,
            lineWidth: styleSheet.cSliderHandlerBorder,
            radius: styleSheet.cSliderHandlerBorderRadius,
            // 高亮的颜色
            highLightFill: styleSheet.cSliderHandlerHighlightFillColor,
          },
          textStyle: {
            fill: styleSheet.cSliderTextFillColor,
            opacity: styleSheet.cSliderTextFillOpacity,
            fontSize: styleSheet.cSliderTextFontSize,
            lineHeight: styleSheet.cSliderTextLineHeight,
            fontWeight: styleSheet.cSliderTextFontWeight,
            stroke: styleSheet.cSliderTextBorderColor,
            lineWidth: styleSheet.cSliderTextBorder,
          },
        },
      },
      scrollbar: {
        common: {
          padding: [8, 8, 8, 8],
        },
        default: {
          style: {
            trackColor: styleSheet.scrollbarTrackFillColor,
            thumbColor: styleSheet.scrollbarThumbFillColor,
          },
        },
        hover: {
          style: {
            thumbColor: styleSheet.scrollbarThumbHighlightFillColor,
          },
        },
      },
    },
    labels: {
      offset: 12,
      style: {
        fill: styleSheet.labelFillColor,
        fontSize: styleSheet.labelFontSize,
        fontFamily: styleSheet.fontFamily,
        stroke: styleSheet.labelBorderColor,
        lineWidth: styleSheet.labelBorder,
      },
      fillColorDark: styleSheet.labelFillColorDark,
      fillColorLight: styleSheet.labelFillColorLight,
      autoRotate: true,
    },
    innerLabels: {
      style: {
        fill: styleSheet.innerLabelFillColor,
        fontSize: styleSheet.innerLabelFontSize,
        fontFamily: styleSheet.fontFamily,
        stroke: styleSheet.innerLabelBorderColor,
        lineWidth: styleSheet.innerLabelBorder,
      },
      autoRotate: true,
    },
    overflowLabels: {
      style: {
        fill: styleSheet.overflowLabelFillColor,
        fontSize: styleSheet.overflowLabelFontSize,
        fontFamily: styleSheet.fontFamily,
        stroke: styleSheet.overflowLabelBorderColor,
        lineWidth: styleSheet.overflowLabelBorder,
      },
    },
    pieLabels: {
      labelHeight: 14,
      offset: 10,
      labelLine: {
        style: {
          lineWidth: styleSheet.labelLineBorder,
        },
      },
      autoRotate: true,
    },
  };
}

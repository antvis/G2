import { deepMix } from '@antv/util';
import { AxisTheme, LegendTheme, ScrollbarTheme, TooltipTheme } from '../types/component';
import { PlainObject } from '../types/common';
import { StyleSheet } from '../types/theme';

/**
 * 根据样式表获取 axis 组件主题样式
 * @param styleSheet
 */
export function getAxisThemeStyle(styleSheet: Partial<StyleSheet>): AxisTheme {
  const axisStyles = {
    title: {
      autoRotate: true,
      // todo 不加入 主题样式表，直接在具体使用的时候 进行处理就好
      position: 'center', // start, center, end
      spacing: styleSheet.axisTitleSpacing,
      style: {
        fill: styleSheet.axisTitleTextFillColor,
        fontSize: styleSheet.axisTitleTextFontSize,
        lineHeight: styleSheet.axisTitleTextLineHeight,
        textBaseline: styleSheet.axisTitleTextBaseline,
        fontFamily: styleSheet.fontFamily,
      },
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

  return {
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
  };
}

/**
 * 根据样式表获取 legend 组件主题样式
 * @param styleSheet
 */
export function getLegendThemeStyle(styleSheet: StyleSheet): LegendTheme {
  const legendStyles = {
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
  return {
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
        size: styleSheet.legendRailHeight,
        defaultLength: styleSheet.legendRailWidth,
        style: {
          fill: styleSheet.legendRailFillColor,
          stroke: styleSheet.legendRailBorderColor,
          lineWidth: styleSheet.legendRailBorder,
        },
      },
      label: {
        align: 'rail',
        spacing: 4, // 文本和 rail 的间距
        formatter: null,
        style: {
          fill: styleSheet.legendRailLabelTextFillColor,
          fontSize: styleSheet.legendRailLabelTextFontSize,
          lineHeight: styleSheet.legendRailLabelTextLineHeight,
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
  };
}

/**
 * todo 抽取 token
 * 根据样式表获取 tooltip 组件主题样式
 * @param styleSheet
 */
export function getTooltipThemeStyle(styleSheet: Partial<StyleSheet>): TooltipTheme {
  return {
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
    domStyles: {},
  };
}

/**
 * 根据样式表获取 scrollbar 组件主题样式
 * @param styleSheet
 */
export function getScrollbarThemeStyle(styleSheet: StyleSheet): Required<ScrollbarTheme> {
  return {
    // todo 可以放到主题里，适用于：一键切换方角、圆角主题
    isRound: true,
    padding: [0, 0, 0, 0],
    trackStyle: {
      default: {
        fill: styleSheet.scrollbarTrackFillColor,
      },
      active: {},
    },
    thumbStyle: {
      default: {
        fill: styleSheet.scrollbarThumbFillColor,
      },
      active: {
        fill: styleSheet.scrollbarThumbHighlightFillColor,
      },
    },
  };
}

/**
 * 根据样式表获取几何图形 shape 主题样式
 * @param styleSheet
 */
export function getShapeThemeStyle(styleSheet: Partial<StyleSheet>): PlainObject {
  return {
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
}

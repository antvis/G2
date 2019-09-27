/**
 * @fileOverview G2 3.0 default theme
 * @author sima.zhang
 */
const DEFAULT_COLOR = '#1890FF';
const COLOR_PLATE_8 = [
  '#1890FF',
  '#2FC25B',
  '#FACC14',
  '#223273',
  '#8543E0',
  '#13C2C2',
  '#3436C7',
  '#F04864'
];
const COLOR_PLATE_16 = [
  '#1890FF',
  '#41D9C7',
  '#2FC25B',
  '#FACC14',
  '#E6965C',
  '#223273',
  '#7564CC',
  '#8543E0',
  '#5C8EE6',
  '#13C2C2',
  '#5CA3E6',
  '#3436C7',
  '#B381E6',
  '#F04864',
  '#D598D9'
];
const COLOR_PLATE_24 = [ '#1890FF',
  '#66B5FF',
  '#41D9C7',
  '#2FC25B',
  '#6EDB8F',
  '#9AE65C',
  '#FACC14',
  '#E6965C',
  '#57AD71',
  '#223273',
  '#738AE6',
  '#7564CC',
  '#8543E0',
  '#A877ED',
  '#5C8EE6',
  '#13C2C2',
  '#70E0E0',
  '#5CA3E6',
  '#3436C7',
  '#8082FF',
  '#DD81E6',
  '#F04864',
  '#FA7D92',
  '#D598D9' ];
const COLOR_PIE = [
  '#1890FF',
  '#13C2C2',
  '#2FC25B',
  '#FACC14',
  '#F04864',
  '#8543E0',
  '#3436C7',
  '#223273' ];
const COLOR_PIE_16 = [
  '#1890FF',
  '#73C9E6',
  '#13C2C2',
  '#6CD9B3',
  '#2FC25B',
  '#9DD96C',
  '#FACC14',
  '#E6965C',
  '#F04864',
  '#D66BCA',
  '#8543E0',
  '#8E77ED',
  '#3436C7',
  '#737EE6',
  '#223273',
  '#7EA2E6'
];

const FONT_FAMILY = '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, "sans-serif"';
// tooltip 相关 dom 的 css 类名
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip';
const TOOLTIP_TITLE_CLASS = 'g2-tooltip-title';
const TOOLTIP_LIST_CLASS = 'g2-tooltip-list';
const TOOLTIP_LIST_ITEM_CLASS = 'g2-tooltip-list-item';
const TOOLTIP_MARKER_CLASS = 'g2-tooltip-marker';
const TOOLTIP_VALUE_CLASS = 'g2-tooltip-value';

// html 渲染的 legend 相关 dom 的 css 类型
const LEGEND_CONTAINER_CLASS = 'g2-legend';
const LEGEND_TITLE_CLASS = 'g2-legend-title';
const LEGEND_LIST_CLASS = 'g2-legend-list';
const LEGEND_LIST_ITEM_CLASS = 'g2-legend-list-item';
const LEGEND_MARKER_CLASS = 'g2-legend-marker';

const Theme = {
  defaultColor: DEFAULT_COLOR, // 默认主题色
  plotCfg: {
    padding: [ 20, 20, 95, 80 ]
  },
  fontFamily: FONT_FAMILY,
  defaultLegendPosition: 'bottom', // 默认图例的展示位置
  colors: COLOR_PLATE_8,
  colors_16: COLOR_PLATE_16,
  colors_24: COLOR_PLATE_24,
  colors_pie: COLOR_PIE,
  colors_pie_16: COLOR_PIE_16,
  shapes: {
    point: [ 'hollowCircle', 'hollowSquare', 'hollowDiamond', 'hollowBowtie', 'hollowTriangle',
      'hollowHexagon', 'cross', 'tick', 'plus', 'hyphen', 'line' ],
    line: [ 'line', 'dash', 'dot' ],
    area: [ 'area' ]
  },
  sizes: [ 1, 10 ],
  opacities: [ 0.1, 0.9 ],
  axis: {
    top: {
      // zIndex: 1, // 默认上下方向的坐标轴位于左右坐标轴的上方
      position: 'top',
      title: null,
      label: {
        offset: 16,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          lineHeight: 16,
          textBaseline: 'middle',
          fontFamily: FONT_FAMILY
        },
        autoRotate: true
      },
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#BFBFBF',
        length: 4,
        alignWithLabel: true
      }
    },
    bottom: {
      position: 'bottom',
      title: null,
      label: {
        offset: 16,
        autoRotate: true,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          lineHeight: 16,
          textBaseline: 'middle',
          fontFamily: FONT_FAMILY
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#BFBFBF',
        length: 4,
        alignWithLabel: true
      }
    },
    left: {
      position: 'left',
      title: null,
      label: {
        offset: 8,
        autoRotate: true,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          lineHeight: 16,
          textBaseline: 'middle',
          fontFamily: FONT_FAMILY
        }
      },
      line: null,
      tickLine: null,
      grid: {
        zIndex: -1,
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        },
        hideFirstLine: true
      }
    },
    right: {
      position: 'right',
      title: null,
      label: {
        offset: 8,
        autoRotate: true,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          lineHeight: 16,
          textBaseline: 'middle',
          fontFamily: FONT_FAMILY
        }
      },
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        },
        hideFirstLine: true
      }
    },
    circle: {
      zIndex: 1,
      title: null,
      label: {
        offset: 8,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          lineHeight: 16,
          fontFamily: FONT_FAMILY
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#BFBFBF',
        length: 4,
        alignWithLabel: true
      },
      grid: {
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        },
        hideFirstLine: true
      }
    },
    radius: {
      zIndex: 0,
      label: {
        offset: 12,
        textStyle: {
          fill: '#545454',
          fontSize: 12,
          textBaseline: 'middle',
          lineHeight: 16,
          fontFamily: FONT_FAMILY
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#BFBFBF',
        length: 4,
        alignWithLabel: true
      },
      grid: {
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        },
        type: 'circle'
      }
    },
    helix: {
      grid: null,
      label: null,
      title: null,
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        lineWidth: 1,
        length: 4,
        stroke: '#BFBFBF',
        alignWithLabel: true
      }
    }
  },
  label: {
    offset: 20,
    textStyle: {
      fill: '#545454',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY
    }
  },
  treemapLabels: {
    offset: 10,
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'top',
      fontStyle: 'bold',
      fontFamily: FONT_FAMILY
    }
  },
  innerLabels: {
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY
    }
  },
  // 在theta坐标系下的饼图文本内部的样式
  thetaLabels: {
    labelHeight: 14,
    offset: 30
    // 在theta坐标系下的饼图文本的样式
  },
  legend: {
    right: {
      position: 'right',
      layout: 'vertical',
      itemMarginBottom: 8, // layout 为 vertical 时各个图例项的间距
      width: 16,
      height: 156,
      title: null,
      legendStyle: {
        LIST_CLASS: {
          textAlign: 'left'
        }
      },
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
        lineHeight: 0,
        fontFamily: FONT_FAMILY
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    left: {
      position: 'left',
      layout: 'vertical',
      itemMarginBottom: 8,
      width: 16,
      height: 156,
      title: null,
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
        lineHeight: 20,
        fontFamily: FONT_FAMILY
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    top: {
      position: 'top',
      offset: [ 0, 6 ],
      layout: 'horizontal',
      title: null,
      itemGap: 10,
      width: 156,
      height: 16,
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
        lineHeight: 20,
        fontFamily: FONT_FAMILY
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    bottom: {
      position: 'bottom',
      offset: [ 0, 6 ],
      layout: 'horizontal',
      title: null,
      itemGap: 10,
      width: 156,
      height: 16,
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
        lineHeight: 20,
        fontFamily: FONT_FAMILY
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    // 定义 html 渲染图例的样式
    html: {
      [`${LEGEND_CONTAINER_CLASS}`]: {
        height: 'auto',
        width: 'auto',
        position: 'absolute',
        overflow: 'auto',
        fontSize: '12px',
        fontFamily: FONT_FAMILY,
        lineHeight: '20px',
        color: '#8C8C8C'
      },
      [`${LEGEND_TITLE_CLASS}`]: {
        marginBottom: '4px'
      },
      [`${LEGEND_LIST_CLASS}`]: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
      },
      [`${LEGEND_LIST_ITEM_CLASS}`]: {
        cursor: 'pointer',
        marginBottom: '5px',
        marginRight: '24px'
      },
      [`${LEGEND_MARKER_CLASS}`]: {
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '8px',
        verticalAlign: 'middle'
      }
    },
    // 不能滑动的连续图例样式
    gradient: {
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'center',
        textBaseline: 'middle',
        lineHeight: 20,
        fontFamily: FONT_FAMILY
      }, // 图例项文本的样式
      lineStyle: {
        lineWidth: 1,
        stroke: '#fff'
      },
      unCheckColor: '#bfbfbf'
    },
    margin: [ 0, 5, 24, 5 ], // 图例跟四个边的坐标轴、绘图区域的间距
    legendMargin: 24 // 图例之间的间距
  },
  tooltip: {
    useHtml: true,
    crosshairs: false,
    offset: 15,
    marker: {
      symbol: 'circle',
      activeSymbol: 'circle'
    },
    // css style for tooltip
    [`${TOOLTIP_CONTAINER_CLASS}`]: {
      position: 'absolute',
      visibility: 'hidden',
      // @2018-07-25 by blue.lb 这里去掉浮动，火狐上存在样式错位
      // whiteSpace: 'nowrap',
      zIndex: 8,
      transition: 'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0px 0px 10px #aeaeae',
      borderRadius: '3px',
      color: 'rgb(87, 87, 87)',
      fontSize: '12px',
      fontFamily: FONT_FAMILY,
      lineHeight: '20px',
      padding: '10px 10px 6px 10px'
    },
    [`${TOOLTIP_TITLE_CLASS}`]: {
      marginBottom: '4px'
    },
    [`${TOOLTIP_LIST_CLASS}`]: {
      margin: 0,
      listStyleType: 'none',
      padding: 0
    },
    [`${TOOLTIP_LIST_ITEM_CLASS}`]: {
      marginBottom: '4px'
    },
    [`${TOOLTIP_MARKER_CLASS}`]: {
      width: '5px',
      height: '5px',
      display: 'inline-block',
      marginRight: '8px'
    },
    [`${TOOLTIP_VALUE_CLASS}`]: {
      display: 'inline-block',
      float: 'right',
      marginLeft: '30px'
    }
  },
  tooltipMarker: {
    symbol: (x, y, r) => {
      return [
        [ 'M', x, y ],
        [ 'm', -r, 0 ],
        [ 'a', r, r, 0, 1, 0, r * 2, 0 ],
        [ 'a', r, r, 0, 1, 0, -r * 2, 0 ]
      ];
    },
    stroke: '#fff',
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffSetY: 0,
    shadowColor: 'rgba(0,0,0,0.09)',
    lineWidth: 2,
    radius: 4
  }, // 提示信息在折线图、区域图上形成点的样式
  tooltipCrosshairsRect: {
    type: 'rect',
    rectStyle: {
      fill: '#CCD6EC',
      opacity: 0.3
    }
  }, // tooltip 辅助背景框样式
  tooltipCrosshairsLine: {
    lineStyle: {
      stroke: 'rgba(0, 0, 0, 0.25)',
      lineWidth: 1
    }
  },
  shape: {
    point: {
      lineWidth: 1,
      fill: DEFAULT_COLOR,
      radius: 4
    },
    hollowPoint: {
      fill: '#fff',
      lineWidth: 1,
      stroke: DEFAULT_COLOR,
      radius: 3
    },
    interval: {
      lineWidth: 0,
      fill: DEFAULT_COLOR,
      fillOpacity: 0.85
    },
    hollowInterval: {
      fill: '#fff',
      stroke: DEFAULT_COLOR,
      fillOpacity: 0,
      lineWidth: 2
    },
    area: {
      lineWidth: 0,
      fill: DEFAULT_COLOR,
      fillOpacity: 0.6
    },
    polygon: {
      lineWidth: 0,
      fill: DEFAULT_COLOR,
      fillOpacity: 1
    },
    hollowPolygon: {
      fill: '#fff',
      stroke: DEFAULT_COLOR,
      fillOpacity: 0,
      lineWidth: 2
    },
    hollowArea: {
      fill: '#fff',
      stroke: DEFAULT_COLOR,
      fillOpacity: 0,
      lineWidth: 2
    },
    line: {
      stroke: DEFAULT_COLOR,
      lineWidth: 2,
      fill: null
    },
    edge: {
      stroke: DEFAULT_COLOR,
      lineWidth: 1,
      fill: null
    },
    schema: {
      stroke: DEFAULT_COLOR,
      lineWidth: 1,
      fill: null
    }
  },
  guide: {
    line: {
      lineStyle: {
        stroke: 'rgba(0, 0, 0, .65)',
        lineDash: [ 2, 2 ],
        lineWidth: 1
      },
      text: {
        position: 'start',
        autoRotate: true,
        style: {
          fill: 'rgba(0, 0, 0, .45)',
          fontSize: 12,
          textAlign: 'start',
          fontFamily: FONT_FAMILY,
          textBaseline: 'bottom'
        }
      }
    },
    text: {
      style: {
        fill: 'rgba(0,0,0,.5)',
        fontSize: 12,
        textBaseline: 'middle',
        textAlign: 'start',
        fontFamily: FONT_FAMILY
      }
    },
    region: {
      style: {
        lineWidth: 0, // 辅助框的边框宽度
        fill: '#000', // 辅助框填充的颜色
        fillOpacity: 0.04 // 辅助框的背景透明度
      } // 辅助框的图形样式属性
    },
    html: {
      alignX: 'middle',
      alignY: 'middle'
    },
    dataRegion: {
      style: {
        region: {
          lineWidth: 0,
          fill: '#000000',
          opacity: 0.04
        },
        text: {
          textAlign: 'center',
          textBaseline: 'bottom',
          fontSize: 12,
          fill: 'rgba(0, 0, 0, .65)'
        }
      }
    },
    dataMarker: {
      top: true,
      style: {
        point: {
          r: 3,
          fill: '#FFFFFF',
          stroke: '#1890FF',
          lineWidth: 2
        },
        line: {
          stroke: '#A3B1BF',
          lineWidth: 1
        },
        text: {
          fill: 'rgba(0, 0, 0, .65)',
          opacity: 1,
          fontSize: 12,
          textAlign: 'start'
        }
      },
      display: {
        point: true,
        line: true,
        text: true
      },
      lineLength: 20,
      direction: 'upward',
      autoAdjust: true
    }
  },
  pixelRatio: null
};

module.exports = Theme;

/**
 * @fileOverview G2 3.0 最新主题
 */
const DEFAULT_COLOR = '#4E7CCC';
const FONT_FAMILY = '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"';
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip';
const TOOLTIP_TITLE_CLASS = 'g2-tooltip-title';
const TOOLTIP_LIST_CLASS = 'g2-tooltip-list';
const TOOLTIP_MARKER_CLASS = 'g2-tooltip-marker';

const Theme = {
  defaultColor: DEFAULT_COLOR, // 默认主题色
  plotCfg: {
    padding: [ 20, 20, 80, 69 ]
  },
  fontFamily: FONT_FAMILY,
  defaultLegendPosition: 'bottom', // 默认图例的展示位置
  colors: [ '#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D' ],
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
      position: 'top',
      title: {
        offset: 31,
        position: 'center',
        autoRotate: true,
        textStyle: {
          fontSize: 12,
          fill: '#999',
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'center'
        }
      },
      label: {
        offset: 14,
        textStyle: {
          fill: '#666',
          fontSize: 12,
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'center'
        },
        autoRotate: true
      },
      line: {
        lineWidth: 1,
        stroke: '#CCD6EC'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#CCD6EC',
        length: 4
      }
    },
    bottom: {
      position: 'bottom',
      title: {
        offset: 36,
        autoRotate: true,
        position: 'center',
        textStyle: {
          fontSize: 12,
          lineHeight: 1,
          textAlign: 'center',
          fill: '#999',
          textBaseline: 'middle'
        }
      },
      label: {
        offset: 14,
        autoRotate: true,
        textStyle: {
          fill: '#666',
          fontSize: 12,
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'center'
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#CCD6EC'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#CCD6EC',
        length: 4
      }
    },
    left: {
      position: 'left',
      title: {
        offset: 54,
        autoRotate: true,
        point: 'center',
        textStyle: {
          fontSize: 12,
          fill: '#999',
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'center'
        }
      },
      label: {
        offset: 14,
        autoRotate: true,
        textStyle: {
          fill: '#666',
          fontSize: 12,
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'end'
        }
      },
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        }
      }
    },
    right: {
      position: 'right',
      title: {
        offset: 54,
        autoRotate: true,
        position: 'center',
        textStyle: {
          fontSize: 12,
          fill: '#999',
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'start'
        }
      },
      label: {
        offset: 14,
        autoRotate: true,
        textStyle: {
          fill: '#666',
          fontSize: 12,
          lineHeight: 1,
          textBaseline: 'middle',
          textAlign: 'start'
        }
      },
      line: null,
      tickLine: null
    },
    circle: {
      title: null,
      label: {
        offset: 8,
        textStyle: {
          fill: '#666',
          fontSize: 12
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#CCD6EC'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#CCD6EC',
        length: 4
      },
      grid: {
        lineStyle: {
          stroke: '#E9E9E9',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        }
      }
    },
    radius: {
      label: {
        offset: 8,
        textStyle: {
          fill: '#666',
          fontSize: 12,
          textBaseline: 'middle',
          textAlign: 'end'
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#CCD6EC'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#CCD6EC',
        length: 4
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
        stroke: '#CCD6EC'
      },
      tickLine: {
        lineWidth: 1,
        length: 4,
        stroke: '#CCD6EC'
      }
    }
  },
  label: {
    offset: 20,
    textStyle: {
      fill: '#666',
      fontSize: 12,
      textBaseline: 'middle'
    }
  },
  treemapLabels: {
    offset: 10,
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'top',
      fontStyle: 'bold'
    }
  },
  innerLabels: {
    textStyle: {
      fill: '#fff',
      fontSize: 12,
      textBaseline: 'middle'
    }
  },
  // 在theta坐标系下的饼图文本内部的样式
  thetaLabels: {
    labelLine: {
      lineWidth: 1
    },
    labelHeight: 14,
    offset: 30
    // 在theta坐标系下的饼图文本的样式
  },
  legend: {
    right: {
      position: 'right',
      layout: 'vertical',
      itemMarginBottom: 5, // layout 为 vertical 时各个图例项的间距
      width: 20,
      height: 156,
      title: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      },
      textStyle: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      }, // 图例项文本的样式
      unCheckColor: '#ccc'
    },
    left: {
      position: 'left',
      layout: 'vertical',
      itemMarginBottom: 5,
      width: 20,
      height: 156,
      title: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      },
      textStyle: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      }, // 图例项文本的样式
      unCheckColor: '#ccc'
    },
    top: {
      position: 'top',
      offset: 6,
      layout: 'horizontal',
      title: null,
      itemGap: 10,
      width: 156,
      height: 20,
      textStyle: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      }, // 图例项文本的样式
      unCheckColor: '#ccc'
    },
    bottom: {
      position: 'bottom',
      offset: 50,
      layout: 'horizontal',
      title: null,
      itemGap: 24,
      width: 156,
      height: 20,
      textStyle: {
        fill: '#666',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      }, // 图例项文本的样式
      unCheckColor: '#ccc'
    }
  },
  tooltip: {
    crosshairs: false,
    offset: 15,
    // css style for tooltip
    [`${TOOLTIP_CONTAINER_CLASS}`]: {
      position: 'absolute',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      zIndex: 999,
      transition: 'left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '2px',
      color: 'rgb(255, 255, 255)',
      fontSize: '12px',
      fontFamily: FONT_FAMILY,
      lineHeight: '12px',
      padding: '8px 8px 0 8px'
    },
    [`${TOOLTIP_TITLE_CLASS}`]: {
      marginBottom: '8px'
    },
    [`${TOOLTIP_LIST_CLASS}`]: {
      margin: 0,
      listStyleType: 'none',
      padding: 0
    },
    [`${TOOLTIP_MARKER_CLASS}`]: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '6px'
    }
  },
  tooltipMarker: {
    fill: '#fff',
    symbol: 'circle',
    lineWidth: 2,
    stroke: DEFAULT_COLOR,
    radius: 4
  }, // 提示信息在折线图、区域图上形成点的样式
  tooltipCrosshairsRect: {
    type: 'rect',
    style: {
      fill: '#CCD6EC',
      opacity: 0.3
    }
  }, // tooltip 辅助背景框样式
  tooltipCrosshairsLine: {
    style: {
      stroke: 'rgba(0, 0, 0, 0.4)',
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
      fillOpacity: 0.9
    },
    pie: {
      lineWidth: 1,
      stroke: '#fff'
    },
    hollowInterval: {
      fill: '#fff',
      stroke: DEFAULT_COLOR,
      fillOpacity: 0,
      lineWidth: 1
    },
    area: {
      lineWidth: 0,
      fill: DEFAULT_COLOR,
      fillOpacity: 0.8
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
      lineWidth: 1
    },
    hollowArea: {
      fill: '#fff',
      stroke: DEFAULT_COLOR,
      fillOpacity: 0,
      lineWidth: 1
    },
    line: {
      stroke: DEFAULT_COLOR,
      lineWidth: 1,
      fill: null
    }
  },
  guide: {
    line: {
      lineStyle: {
        stroke: DEFAULT_COLOR,
        lineDash: [ 0, 2, 2 ],
        lineWidth: 1
      },
      text: {
        position: 'end',
        autoRotate: true,
        style: {
          fill: '#999',
          fontSize: 12,
          textAlign: 'center'
        }
      }
    },
    text: {
      style: {
        fill: '#666',
        fontSize: 12,
        textBaseline: 'middle',
        textAlign: 'start'
      }
    },
    region: {
      style: {
        lineWidth: 0, // 辅助框的边框宽度
        fill: DEFAULT_COLOR, // 辅助框填充的颜色
        fillOpacity: 0.1 // 辅助框的背景透明度
      } // 辅助框的图形样式属性
    },
    html: {
      alignX: 'middle',
      alignY: 'middle'
    }
  },
  pixelRatio: null
};

module.exports = Theme;

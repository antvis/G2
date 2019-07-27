/**
 * @fileOverview G2 3.0 dark theme
 * @author sima.zhang
 */
const Util = require('../util');
const BasicTheme = require('./default');

// tooltip 相关 dom 的 css 类名
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip';
const LEGEND_CONTAINER_CLASS = 'g2-legend';

const DarkTheme = Util.deepMix({}, BasicTheme, {
  background: {
    fill: '#1F1F1F',
    radius: 2
  }, // 容器区域
  plotBackground: {
    fill: '#1F1F1F'
  }, // 绘图区域
  axis: {
    top: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      line: {
        stroke: '#737373'
      },
      tickLine: {
        stroke: '#737373'
      }
    },
    bottom: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      line: {
        stroke: '#737373'
      },
      tickLine: {
        stroke: '#737373'
      }
    },
    left: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      grid: {
        lineStyle: {
          stroke: '#404040'
        }
      }
    },
    right: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      grid: {
        lineStyle: {
          stroke: '#404040'
        }
      }
    },
    circle: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      line: {
        stroke: '#737373'
      },
      tickLine: {
        stroke: '#737373'
      },
      grid: {
        lineStyle: {
          stroke: '#404040'
        }
      }
    },
    radius: {
      label: {
        textStyle: {
          fill: '#A6A6A6'
        }
      },
      line: {
        stroke: '#737373'
      },
      tickLine: {
        stroke: '#737373'
      },
      grid: {
        lineStyle: {
          stroke: '#404040'
        }
      }
    },
    helix: {
      line: {
        stroke: '#737373'
      },
      tickLine: {
        stroke: '#737373'
      }
    }
  },
  label: {
    textStyle: {
      fill: '#A6A6A6'
    }
  },
  legend: {
    right: {
      textStyle: {
        fill: '#737373'
      },
      unCheckColor: '#bfbfbf'
    },
    left: {
      textStyle: {
        fill: '#737373'
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    top: {
      textStyle: {
        fill: '#737373'
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    bottom: {
      textStyle: {
        fill: '#737373'
      }, // 图例项文本的样式
      unCheckColor: '#bfbfbf'
    },
    html: {
      [`${LEGEND_CONTAINER_CLASS}`]: {
        color: '#D9D9D9'
      }
    },
    gradient: {
      textStyle: {
        fill: '#D9D9D9'
      },
      lineStyle: {
        stroke: '#404040'
      }
    }
  },
  tooltip: {
    // css style for tooltip
    [`${TOOLTIP_CONTAINER_CLASS}`]: {
      color: '#D9D9D9',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0px 0px 2px #000'
    }
  },
  tooltipCrosshairsRect: {
    type: 'rect',
    rectStyle: {
      fill: '#fff',
      opacity: 0.1
    }
  }, // tooltip 辅助背景框样式
  tooltipCrosshairsLine: {
    lineStyle: {
      stroke: 'rgba(255, 255, 255, 0.45)'
    }
  },
  guide: {
    line: {
      text: {
        style: {
          fill: '#A6A6A6'
        }
      }
    },
    text: {
      style: {
        fill: '#A6A6A6'
      }
    },
    region: {
      // TODO
      style: {
        lineWidth: 0, // 辅助框的边框宽度
        fill: '#000', // 辅助框填充的颜色
        fillOpacity: 0.04 // 辅助框的背景透明度
      } // 辅助框的图形样式属性
    }
  }
});

module.exports = DarkTheme;


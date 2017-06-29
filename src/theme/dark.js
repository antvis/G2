/**
 * @fileOverview 暗色背景下的主题
 */
const Util = require('../util');
const DefaultTheme = require('./default');

const Theme = Util.merge({}, DefaultTheme, {
  plotCfg: {
    margin: [ 20, 80, 60, 80 ],
    border: {
      fill: '#18242E' // 设置背景色
    }
  },
  axis: {
    top: {
      labels: {
        label: {
          fill: '#D5D4D4'
        }
      },
      tickLine: {
        stroke: '#46525F'
      }
    },
    bottom: {
      labels: {
        label: {
          fill: '#999'
        }
      },
      line: {
        stroke: '#46525F'
      },
      tickLine: {
        stroke: '#46525F'
      }
    },
    left: {
      labels: {
        label: {
          fill: '#999'
        }
      },
      line: {
        stroke: '#46525F'
      },
      tickLine: {
        stroke: '#46525F'
      },
      grid: {
        line: {
          stroke: '#46525F'
        }
      }
    },
    right: {
      labels: {
        label: {
          fill: '#999'
        }
      },
      line: {
        stroke: '#46525F'
      },
      tickLine: {
        stroke: '#46525F'
      }
    },
    circle: {
      line: {
        stroke: '#46525F'
      },
      grid: {
        line: {
          stroke: '#46525F'
        }
      },
      labels: {
        label: {
          fill: '#999'
        }
      }
    },
    gauge: {
      tickLine: {
        stroke: '#46525F'
      },
      labels: {
        label: {
          fill: '#999'
        }
      }
    },
    clock: {
      tickLine: {
        stroke: '#46525F'
      },
      subTick: 5,
      labels: {
        label: {
          fill: '#999'
        }
      }
    },
    radius: {
      labels: {
        label: {
          fill: '#999'
        }
      },
      line: {
        stroke: '#46525F'
      },
      grid: {
        line: {
          stroke: '#46525F'
        }
      }
    }
  },
  legend: {
    right: {
      word: {
        fill: '#999'
      },
      title: {
        fill: '#999'
      }
    },
    left: {
      word: {
        fill: '#999'
      },
      title: {
        fill: '#999'
      }
    },
    top: {
      word: {
        fill: '#999'
      }
    },
    bottom: {
      word: {
        fill: '#999'
      }
    }
  },
  guide: {
    text: {
      fill: '#999'
    },
    tag: {
      text: {
        fill: '#999'
      }
    }
  }
});

module.exports = Theme;

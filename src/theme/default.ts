export default {
  pixelRatio: null,
  defaultColor: '#1890FF',
  padding: [20, 20, 95, 80],
  fontFamily:
    '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, "sans-serif"',
  colors: [
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
  ],
  colors_20: [
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
  ],
  shapes: {
    point: [
      'hollowCircle',
      'hollowSquare',
      'hollowDiamond',
      'hollowBowtie',
      'hollowTriangle',
      'hollowHexagon',
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
  shape: {
    polygon: {
      polygon: {
        default: {
          lineWidth: 0,
          fill: '#1890ff',
          fillOpacity: 1,
        },
        active: {
          lineWidth: 2,
          stroke: '#000',
        },
      },
    },
    myInterval: {
      tick: {
        default: {
          lineWidth: 10,
        },
        active: {
          stroke: 'red',
        },
        selected: {
          stroke: 'blue',
        },
      },
    },
  },
};

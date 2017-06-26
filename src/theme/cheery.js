
const Util = require('../util');
const DefaultTheme = require('./default');
const DEFAULT_COLOR = '#62a4e8';

const Theme = Util.merge({}, DefaultTheme, {
  defaultColor: DEFAULT_COLOR, // 默认主题色
  colors: {
    default: [ '#61A5E8', '#7ECF51', '#EECB5F', '#E4925D', '#E16757', '#9570E5', '#605FF0' ],
    intervalStack: [ '#61A5E8', '#7ECF51', '#EECB5F', '#E4925D', '#E16757', '#9570E5', '#605FF0',
      '#605ff0', '#85ca36', '#1c9925', '#0d8b5f', '#0f9cd3', '#2f7e9b', '#2f677d', '#9b7fed',
      '#7453d6', '#3b1d98', '#27abb1', '#017377', '#015f63', '#b86868', '#5669b7', '#e5aab4',
      '#60b65f', '#98d2b2', '#c9c8bc', '#45c3dc', '#e17979', '#5baa5a', '#eaccc2', '#ffaa74'
    ] // 层叠的柱状图使用不同的颜色
  },
  shape: {
    point: {
      fill: DEFAULT_COLOR
    },
    hollowPoint: {
      stroke: DEFAULT_COLOR
    },
    interval: {
      fill: DEFAULT_COLOR
    },
    hollowInterval: {
      stroke: DEFAULT_COLOR
    },
    area: {
      fill: DEFAULT_COLOR
    },
    polygon: {
      fill: DEFAULT_COLOR
    },
    hollowPolygon: {
      stroke: DEFAULT_COLOR
    },
    hollowArea: {
      stroke: DEFAULT_COLOR
    },
    line: {
      stroke: DEFAULT_COLOR
    }
  },
  guide: {
    line: {
      stroke: DEFAULT_COLOR
    },
    rect: {
      fill: DEFAULT_COLOR
    },
    tag: {
      line: {
        stroke: DEFAULT_COLOR
      },
      rect: {
        fill: DEFAULT_COLOR
      }
    }
  },
  tooltipMarker: {
    stroke: DEFAULT_COLOR
  }
});

module.exports = Theme;

import { ThemeComponent as TC, Theme } from '../runtime';

export type DarkOptions = Theme;

/**
 * Dark theme.
 */
export const Dark: TC<DarkOptions> = (options) => {
  const DEFAULT_COLOR = '#5B8FF9';
  const defaultOptions: Theme = {
    defaultColor: DEFAULT_COLOR,
    defaultCategory10: 'category10',
    defaultCategory20: 'category20',
    defaultSize: 1,
    elementActiveStroke: 'black',
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    // --- Theme of mark shape
    line: {
      line: {
        stroke: DEFAULT_COLOR,
        strokeOpacity: 1,
        lineWidth: 1,
      },
    },
    point: {
      point: {
        r: 3,
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
        lineWidth: 0,
      },
      hollow: {
        r: 3,
        stroke: DEFAULT_COLOR,
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
      plus: {
        r: 3,
        stroke: DEFAULT_COLOR,
        strokeOpacity: 0.95,
        lineWidth: 3,
      },
      diamond: {
        r: 3,
        stroke: DEFAULT_COLOR,
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
    },
    interval: {
      rect: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
      },
      hollow: {
        stroke: DEFAULT_COLOR,
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    area: {
      area: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.85,
        lineWidth: 0,
      },
    },
    polygon: {
      polygon: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
      },
    },
    cell: {
      rect: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
      },
      hollow: {
        stroke: DEFAULT_COLOR,
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    link: {
      link: {
        stroke: DEFAULT_COLOR,
        strokeOpacity: 1,
      },
    },
    vector: {
      vector: {
        fill: DEFAULT_COLOR,
        stroke: DEFAULT_COLOR,
        fillOpacity: 1,
      },
    },
    box: {
      box: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
        stroke: DEFAULT_COLOR,
        lineWidth: 2,
      },
    },
    text: {
      text: {
        fill: '#1D2129',
        fontSize: 12,
      },
    },
    lineX: {
      line: {
        stroke: '#416180',
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    lineY: {
      line: {
        stroke: '#416180',
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    rangeX: {
      range: {
        fill: '#416180',
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: '#416180',
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: '#416180',
        strokeOpacity: 0.45,
        lineWidth: 1,
        endMarker: {
          fillOpacity: 0.85,
        },
      },
    },
    interaction: {
      active: {
        line: {
          line: { lineWidth: 3 },
        },
        interval: {
          rect: { stroke: 'black' },
        },
        area: {
          area: { fillOpacity: 0.5 },
        },
      },
      inactive: {
        area: {
          area: { fillOpacity: 0.3 },
        },
      },
      selected: {},
      disabled: {},
    },
    axis: {
      titleFill: '#fff',
      titleFillOpacity: 0.65,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      axisStroke: '#FFF',
      axisStrokeOpacity: 0.3,
      axisLineWidth: 0.5,
      tickLineStroke: '#BFBFBF',
      tickLineLineWidth: 1,
      tickLineLength: 4,
      subTickLineStroke: '#D9D9D9',
      subTickLineLineWidth: 1,
      subTickLineLength: 2,
      labelFill: '#FFF',
      labelFillOpacity: 0.65,
      labelFontSize: 12,
      labelFontWeight: 'lighter',
      labelSpacing: 8,
      gridStroke: '#FFF',
      gridStrokeOpacity: 0.15,
      gridLineWidth: 0.5,
      gridLineDash: [0, 0],
    },
    legend: {
      titleFill: '#FFF',
      titleFontSize: 12,
      titleLineHeight: 21,
      titleFontWeight: 'bold',
      markerFill: DEFAULT_COLOR,
      markerSpacing: 8,
      markerSize: 4,
      itemNameFill: '#FFF',
      itemNameFillOpacity: 0.65,
      itemNameFontSize: 12,
      itemNameFontWeight: 'normal',
      itemValueFill: '#FFF',
      itemValueFillOpacity: 0.85,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
    },
    label: {
      fill: '#FFF',
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      stroke: null,
    },
    innerLabel: {
      fill: '#FFF',
      fontSize: 12,
      fillOpacity: 0.85,
      fontWeight: 'normal',
      stroke: '#000',
      lineWidth: 0.5,
    },
    title: {
      fill: '#FFF',
      fillOpacity: 0.9,
      fontSize: 40,
      fontWeight: 'bold',
      textBaseline: 'top',
    },
    subtitle: {
      fill: '#FFF',
      fillOpacity: 0.85,
      fontSize: 10,
      fontWeight: 'normal',
      textBaseline: 'top',
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Dark.props = {};

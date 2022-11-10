import { ThemeComponent as TC, Theme } from '../runtime';

export type LightOptions = Theme;

/**
 * Default theme.
 */
export const Light: TC<LightOptions> = (options) => {
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
        connectorStroke: '#416180',
        connectorStrokeOpacity: 0.45,
        connectorLineWidth: 1,
        backgroundFill: '#416180',
        backgroundFillOpacity: 0.15,
        backgroundPadding: [2, 4],
        startMarkerSymbol: 'circle',
        startMarkerSize: 4,
        endMarkerSymbol: 'circle',
        endMarkerSize: 4,
      },
      badge: {
        fill: '#1D2129',
        fontSize: 10,
        textAlign: 'center',
        textBaseline: 'middle',
        markerFill: '#416180',
        markerFillOpacity: 0.25,
        markerStrokeOpacity: 0,
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
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: '#416180',
        endMarkerFillOpacity: 0.95,
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
      titleFill: '#000',
      titleFillOpacity: 0.65,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      axisStroke: '#416180',
      axisStrokeOpacity: 0.45,
      axisLineWidth: 0.5,
      tickLineStroke: '#BFBFBF',
      tickLineLineWidth: 1,
      tickLineLength: 4,
      subTickLineStroke: '#D9D9D9',
      subTickLineLineWidth: 1,
      subTickLineLength: 2,
      labelFill: '#2C3542',
      labelFillOpacity: 0.65,
      labelFontSize: 12,
      labelFontWeight: 'lighter',
      labelSpacing: 8,
      gridStroke: '#416180',
      gridStrokeOpacity: 0.15,
      gridLineWidth: 0.5,
      gridLineDash: [0, 0],
    },
    legend: {
      titleFill: '#8C8C8C',
      titleFontSize: 12,
      titleLineHeight: 21,
      titleFontWeight: 'bold',
      markerFill: DEFAULT_COLOR,
      markerSpacing: 8,
      markerSize: 4,
      itemNameFill: '#595959',
      itemNameFillOpacity: 0.65,
      itemNameFontSize: 12,
      itemNameFontWeight: 'lighter',
      itemValueFill: '#595959',
      itemValueFillOpacity: 0.85,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
    },
    label: {
      fill: '#000',
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      stroke: null,
      offset: 8,
      connectorStroke: '#416180',
      connectorStrokeOpacity: 0.45,
      connectorLineWidth: 1,
      connectorLength: 12,
      connectorLength2: 8,
    },
    innerLabel: {
      fill: '#FFF',
      fontSize: 12,
      fillOpacity: 0.85,
      fontWeight: 'normal',
      stroke: null,
      offset: 0,
    },
    title: {
      fill: '#1D2129',
      fillOpacity: 1,
      fontSize: 40,
      fontWeight: 'bold',
      textBaseline: 'top',
    },
    subtitle: {
      fill: '#424E66',
      fillOpacity: 1,
      fontSize: 10,
      fontWeight: 'normal',
      textBaseline: 'top',
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Light.props = {};

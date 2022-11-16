import { ThemeComponent as TC, Theme } from '../runtime';

export type LightOptions = Theme;

const BLACK_COLORS = {
  100: '#000',
  95: '#0D0D0D',
  85: '#262626',
  65: '#595959',
  45: '#8C8C8C',
  25: '#BFBFBF',
  15: '#D9D9D9',
  6: '#F0F0F0',
};

const WHITE_COLORS = {
  100: '#FFFFFF',
  95: '#F2F2F2',
  85: '#D9D9D9',
  65: '#A6A6A6',
  45: '#737373',
  25: '#404040',
  15: '#262626',
  6: '#0F0F0F',
};

const BACKGROUND_COLOR = 'transparent';
const STROKE_COLOR = '#416180';

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
    elementActiveStroke: BLACK_COLORS[100],
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    // --- Theme of area style
    viewFill: BACKGROUND_COLOR,
    plotFill: 'transparent',
    mainFill: 'transparent',
    contentFill: 'transparent',
    // --- Theme of mark shape
    line: {
      line: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 1,
      },
    },
    point: {
      point: {
        r: 3,
        fillOpacity: 0.95,
        lineWidth: 0,
      },
      hollow: {
        r: 3,
        fill: '',
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
      plus: {
        r: 3,
        fill: '',
        strokeOpacity: 0.95,
        lineWidth: 3,
      },
      diamond: {
        r: 3,
        fill: '',
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
    },
    interval: {
      rect: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    area: {
      area: {
        fillOpacity: 0.85,
        lineWidth: 0,
      },
    },
    polygon: {
      polygon: {
        fillOpacity: 0.95,
      },
    },
    cell: {
      rect: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    link: {
      link: {
        fill: '',
        strokeOpacity: 1,
      },
    },
    vector: {
      vector: {
        fillOpacity: 1,
      },
    },
    box: {
      box: {
        fillOpacity: 0.95,
        stroke: '#1D2129',
        lineWidth: 1,
      },
    },
    text: {
      text: {
        // fill: BLACK_COLORS[65],
        fill: '#1D2129',
        fontSize: 12,
        strokeWidth: 0,
        connectorStroke: STROKE_COLOR,
        connectorStrokeOpacity: 0.45,
        connectorLineWidth: 1,
        backgroundFill: STROKE_COLOR,
        backgroundFillOpacity: 0.15,
        backgroundPadding: [2, 4],
        startMarkerSymbol: 'circle',
        startMarkerSize: 4,
        endMarkerSymbol: 'circle',
        endMarkerSize: 4,
      },
      badge: {
        fill: '#1D2129',
        fillOpacity: 0.65,
        strokeWidth: 0,
        fontSize: 10,
        textAlign: 'center',
        textBaseline: 'middle',
        markerFill: STROKE_COLOR,
        markerFillOpacity: 0.25,
        markerStrokeOpacity: 0,
      },
    },
    lineX: {
      line: {
        stroke: STROKE_COLOR,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    lineY: {
      line: {
        stroke: STROKE_COLOR,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    rangeX: {
      range: {
        fill: STROKE_COLOR,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: STROKE_COLOR,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: STROKE_COLOR,
        strokeOpacity: 0.45,
        lineWidth: 1,
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: STROKE_COLOR,
        endMarkerFillOpacity: 0.95,
      },
    },
    interaction: {
      active: {
        line: {
          line: { lineWidth: 3 },
        },
        interval: {
          rect: { stroke: BLACK_COLORS[100] },
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
      // axis title
      titleFill: BLACK_COLORS[65],
      titleFillOpacity: 1,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      // axis line
      lineStroke: BLACK_COLORS[25],
      lineStrokeOpacity: 0.45,
      lineLineWidth: 0.5,
      // axis tickLine
      tickLineStroke: BLACK_COLORS[25],
      tickLineLineWidth: 1,
      tickLineLength: 4,
      // axis label
      labelFill: BLACK_COLORS[45],
      labelFillOpacity: 1,
      labelFontSize: 12,
      labelFontWeight: 'lighter',
      labelSpacing: 8, // spacing between label and it's tick
      // axis grid
      gridStroke: BLACK_COLORS[15],
      gridStrokeOpacity: 1,
      gridLineWidth: 0.5,
      gridLineDash: [0, 0],
    },
    legend: {
      padding: 8,
      // legend title
      showTitle: false,
      titleFill: BLACK_COLORS[45],
      titleFontSize: 12,
      titleLineHeight: 21,
      titleFontWeight: 'normal',
      titleSpacing: 4,
      // legend marker
      markerFill: DEFAULT_COLOR,
      markerSpacing: 8,
      markerSize: 4,
      // [todo] rename itemLabel to itemName
      itemLabelFill: BLACK_COLORS[65],
      itemLabelFillOpacity: 1,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 'normal',
      itemValueFill: BLACK_COLORS[65],
      itemValueFillOpacity: 0.85,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
      itemBackgroundFill: 'transparent',
      // [todo] rename legend navigator
      navButtonFill: BLACK_COLORS[100],
      navButtonFillOpacity: 1,
      navPageNumFill: BLACK_COLORS[45],
      navPageNumFontSize: 12,
      // others
      backgroundFill: 'transparent',
    },
    continuousLegend: {
      labelFill: BLACK_COLORS[45],
      labelFontSize: 12,
      labelLineHeight: 12,
      labelFontWeight: 'normal',
      handleWidth: 10,
      handleHeight: 12,
      handleMarkerFill: BLACK_COLORS[6],
      handleMarkerStroke: BLACK_COLORS[25],
      handleMarkerLineWidth: 1,
      handleLabelFill: BLACK_COLORS[45],
      handleLabelFontSize: 12,
      handleLabelLineHeight: 12,
      handleLabelFontWeight: 'normal',
      // [todo] legend rail
    },
    label: {
      fill: BLACK_COLORS[100],
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      stroke: null,
      offset: 12,
      connectorStroke: STROKE_COLOR,
      connectorStrokeOpacity: 0.45,
      connectorLineWidth: 1,
      connectorLength2: 8,
      connectorDistance: 4,
    },
    innerLabel: {
      fill: WHITE_COLORS[100],
      fontSize: 12,
      fillOpacity: 0.85,
      fontWeight: 'normal',
      stroke: null,
      offset: 0,
    },
    slider: {
      railHeight: 16,
      railFill: STROKE_COLOR,
      railFillOpacity: 0.05,
      railForegroundFill: DEFAULT_COLOR,
      railForegroundFillOpacity: 0.15,
      handleHeight: 24,
      handleWidth: 10,
      handleFill: '#f7f7f7',
      handleFillOpacity: 1,
      handleStroke: BLACK_COLORS[25],
      handleStrokeOpacity: 1,
      handleLineWidth: 1,
      handleRadius: 2,
      textFill: BLACK_COLORS[100],
      textFillOpacity: 0.45,
      textFontSize: 12,
      textFontWeight: 'normal',
    },
    scrollbar: {},
    title: {
      fill: BLACK_COLORS[85],
      fillOpacity: 1,
      fontSize: 24,
      fontWeight: 'bold',
      textBaseline: 'top',
    },
    subtitle: {
      fill: BLACK_COLORS[65],
      fillOpacity: 1,
      fontSize: 10,
      fontWeight: 'normal',
      textBaseline: 'top',
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Light.props = {};

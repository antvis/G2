import { ThemeComponent as TC, Theme } from '../runtime';

export type DarkOptions = Theme;

const COLORS = {
  BLACK: '#fff',
  WHITE: '#000',
  STROKE: '#416180',
};

const BACKGROUND_COLOR = '#141414';
const STROKE_COLOR = '#416180';

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
    elementActiveStroke: COLORS.BLACK,
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    update: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    exit: {
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
        connectStroke: '#666',
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
        connectFill: COLORS.BLACK,
        connectFillOpacity: 0.1,
      },
    },
    polygon: {
      polygon: {
        fillOpacity: 0.95,
      },
    },
    cell: {
      cell: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    rect: {
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
        fill: COLORS.BLACK,
        fillOpacity: 0.65,
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
          rect: { stroke: COLORS.BLACK },
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
      titleFill: COLORS.BLACK,
      titleFillOpacity: 0.65,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      // axis line
      lineStroke: COLORS.BLACK,
      lineStrokeOpacity: 0.45,
      lineLineWidth: 0.5,
      // axis tick line
      tickStroke: COLORS.BLACK,
      tickStrokeOpacity: 0.25,
      tickLineWidth: 1,
      tickLength: 4,
      // axis label
      labelFill: COLORS.BLACK,
      labelFillOpacity: 0.65,
      labelFontSize: 12,
      labelFontWeight: 'lighter',
      labelSpacing: 8, // spacing between label and it's tick
      // axis grid
      gridStroke: COLORS.BLACK,
      gridStrokeOpacity: 0.05,
      gridLineWidth: 0.5,
      gridLineDash: [0, 0],
    },
    legend: {
      padding: 8,
      showTitle: false,
      titleFill: COLORS.BLACK,
      titleFillOpacity: 0.45,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 4,
      // legend marker
      itemMarkerFill: DEFAULT_COLOR,
      itemMarkerFillOpacity: 1,
      itemMarkerSize: 8,
      itemSpacing: [5, 8],
      itemLabelFill: COLORS.BLACK,
      itemLabelFillOpacity: 0.65,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 'normal',
      itemValueFill: COLORS.BLACK,
      itemValueFillOpacity: 0.65,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
      itemBackgroundFill: 'transparent',
      // [todo] support navButtonSize
      navButtonFill: COLORS.BLACK,
      navButtonFillOpacity: 0.45,
      navPageNumFill: COLORS.BLACK,
      navPageNumFillOpacity: 0.45,
      navPageNumFontSize: 12,
      // others
      backgroundFill: 'transparent',
    },
    continuousLegend: {
      labelFill: COLORS.BLACK,
      labelFillOpacity: 0.45,
      labelFontSize: 12,
      labelFontWeight: 'normal',
      handleWidth: 10,
      handleHeight: 12,
      handleMarkerFill: COLORS.BLACK,
      handleMarkerFillOpacity: 0.6,
      handleMarkerStroke: COLORS.BLACK,
      handleMarkerStrokeOpacity: 0.25,
      handleMarkerLineWidth: 1,
      handleLabelFill: COLORS.BLACK,
      handleLabelFillOpacity: 0.45,
      handleLabelFontSize: 12,
      handleLabelFontWeight: 'normal',
      // [todo] legend rail
    },
    label: {
      fill: COLORS.BLACK,
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      stroke: null,
      offset: 12,
      connectorStroke: COLORS.BLACK,
      connectorStrokeOpacity: 0.45,
      connectorLineWidth: 1,
      connectorLength2: 8,
      connectorDistance: 4,
    },
    innerLabel: {
      fill: COLORS.WHITE,
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
      handleStroke: COLORS.BLACK,
      handleStrokeOpacity: 0.25,
      handleLineWidth: 1,
      handleRadius: 2,
      textFill: COLORS.BLACK,
      textFillOpacity: 0.45,
      textFontSize: 12,
      textFontWeight: 'normal',
    },
    scrollbar: {},
    title: {
      fill: COLORS.BLACK,
      fillOpacity: 0.85,
      fontSize: 24,
      fontWeight: 'bold',
      textBaseline: 'top',
    },
    subtitle: {
      fill: COLORS.BLACK,
      fillOpacity: 0.65,
      fontSize: 10,
      fontWeight: 'normal',
      textBaseline: 'top',
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Dark.props = {};

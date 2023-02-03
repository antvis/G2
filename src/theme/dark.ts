import { ThemeComponent as TC, Theme } from '../runtime';

export type DarkOptions = Theme;

const COLORS = {
  BLACK: '#fff',
  WHITE: '#000',
  STROKE: '#416180',
};

const BACKGROUND_COLOR = '#141414';

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
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
      plus: {
        r: 3,
        strokeOpacity: 0.95,
        lineWidth: 3,
      },
      diamond: {
        r: 3,
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
        stroke: COLORS.BLACK,
        lineWidth: 1,
      },
    },
    text: {
      text: {
        fill: COLORS.BLACK,
        fillOpacity: 0.65,
        fontSize: 12,
        strokeWidth: 0,
        connectorStroke: COLORS.STROKE,
        connectorStrokeOpacity: 0.45,
        connectorLineWidth: 1,
        backgroundFill: COLORS.STROKE,
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
        markerFill: COLORS.STROKE,
        markerFillOpacity: 0.25,
        markerStrokeOpacity: 0,
      },
    },
    lineX: {
      line: {
        stroke: COLORS.STROKE,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    lineY: {
      line: {
        stroke: COLORS.STROKE,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    rangeX: {
      range: {
        fill: COLORS.STROKE,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: COLORS.STROKE,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: COLORS.STROKE,
        strokeOpacity: 0.45,
        lineWidth: 1,
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: COLORS.STROKE,
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
      lineArrow: null,
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
      labelAlign: 'horizontal',
      // axis grid
      gridStroke: COLORS.BLACK,
      gridStrokeOpacity: 0.05,
      gridLineWidth: 0.5,
      gridLineDash: [0, 0],
      titleTransformOrigin: 'center',
    },
    axisTop: {
      titlePosition: 'top',
      titleSpacing: 0,
      titleTextBaseline: 'middle',
      labelSpacing: 8,
      labelDirection: 'negative',
      tickDirection: 'negative',
      gridDirection: 'positive',
    },
    axisBottom: {
      titleSpacing: 10,
      titleTextBaseline: 'bottom',
      labelSpacing: 12,
      labelDirection: 'positive',
      tickDirection: 'positive',
      gridDirection: 'negative',
    },
    axisLeft: {
      titleTextBaseline: 'middle',
      titleSpacing: 10,
      titlePosition: 'left',
      titleTransformOrigin: 'center',
      titleTransform: `translate(50%, 0) rotate(-90)`,
      labelSpacing: 4,
      labelDirection: 'positive',
      labelAutoRotate: false,
      tickDirection: 'positive',
      gridDirection: 'negative',
    },
    axisRight: {
      titleTextBaseline: 'top',
      titleSpacing: 0,
      titlePosition: 'right',
      titleTransformOrigin: 'center',
      titleTransform: `translate(-50%, 0) rotate(-90)`,
      labelSpacing: 4,
      labelDirection: 'negative',
      tickDirection: 'negative',
      gridDirection: 'positive',
    },
    axisLinear: {
      titlePosition: 'top',
      titleTextBaseline: 'bottom',
      gridDirection: 'negative',
      gridConnect: 'arc',
      gridType: 'surround',
      girdClosed: true,
    },
    axisRadar: {
      titlePosition: 'start',
      showTick: false,
      showLabel: false,
      gridType: 'surround',
      girdClosed: true,
      gridStrokeOpacity: 0.3,
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
      // itemMarkerFill: DEFAULT_COLOR,
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
      connectorLength: 12,
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
      trackSize: 16,
      backgroundFill: COLORS.STROKE,
      backgroundFillOpacity: 1,
      selectionFill: DEFAULT_COLOR,
      selectionFillOpacity: 0.15,
      handleIconSize: 10,
      handleIconFill: '#f7f7f7',
      handleIconFillOpacity: 1,
      handleIconStroke: COLORS.BLACK,
      handleIconStrokeOpacity: 0.25,
      handleIconLineWidth: 1,
      handleIconRadius: 2,
      handleLabelFill: COLORS.BLACK,
      handleLabelFillOpacity: 0.45,
      handleLabelFontSize: 12,
      handleLabelFontWeight: 'normal',
    },
    scrollbar: {},
    title: {
      titleFill: COLORS.BLACK,
      titleFillOpacity: 0.85,
      titleFontSize: 14,
      titleFontWeight: 'bold',
      titleTextBaseline: 'top',
      subtitleFill: COLORS.BLACK,
      subtitleFillOpacity: 0.65,
      subtitleFontSize: 12,
      subtitleFontWeight: 'normal',
      subtitleTextBaseline: 'top',
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Dark.props = {};

Dark.props = {};

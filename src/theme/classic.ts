import { ThemeComponent as TC, Theme } from '../runtime';

export type ClassicOptions = Theme;

const COLORS = {
  BLACK: '#000',
  WHITE: '#fff',
  STROKE: '#416180',
};

const BACKGROUND_COLOR = 'transparent';

/**
 * Default theme.
 */
export const Classic: TC<ClassicOptions> = (options) => {
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
        // fill: COLORS.BLACK,fillOpacity: 0.65,
        fill: '#1D2129',
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
      arrow: false,
      gridLineDash: [0, 0],
      gridLineWidth: 0.5,
      gridStroke: COLORS.BLACK,
      gridStrokeOpacity: 0.05,
      labelAlign: 'horizontal',
      labelFill: COLORS.BLACK,
      labelFillOpacity: 0.65,
      labelFontSize: 12,
      labelFontWeight: 'lighter',
      labelSpacing: 8, // spacing between label and it's tick
      line: false,
      lineLineWidth: 0.5,
      lineStroke: COLORS.BLACK,
      lineStrokeOpacity: 0.45,
      tickLength: 4,
      tickLineWidth: 1,
      tickStroke: COLORS.BLACK,
      tickStrokeOpacity: 0.25,
      titleFill: COLORS.BLACK,
      titleFillOpacity: 0.65,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      titleTransformOrigin: 'center',
    },
    axisTop: {
      gridDirection: 'positive',
      labelDirection: 'negative',
      labelSpacing: 8,
      tickDirection: 'negative',
      titlePosition: 'top',
      titleSpacing: 0,
      titleTextBaseline: 'middle',
    },
    axisBottom: {
      gridDirection: 'negative',
      labelDirection: 'positive',
      labelSpacing: 12,
      tickDirection: 'positive',
      titlePosition: 'bottom',
      titleSpacing: 10,
      titleTextBaseline: 'bottom',
    },
    axisLeft: {
      gridDirection: 'negative',
      labelAutoRotate: false,
      labelDirection: 'positive',
      labelSpacing: 4,
      tickDirection: 'positive',
      titlePosition: 'left',
      titleSpacing: 10,
      titleTextBaseline: 'middle',
      titleTransform: `translate(50%, 0) rotate(-90)`,
      titleTransformOrigin: 'center',
    },
    axisRight: {
      gridDirection: 'positive',
      labelDirection: 'negative',
      labelSpacing: 4,
      tickDirection: 'negative',
      titlePosition: 'right',
      titleSpacing: 0,
      titleTextBaseline: 'top',
      titleTransform: `translate(-50%, 0) rotate(-90)`,
      titleTransformOrigin: 'center',
    },
    axisLinear: {
      girdClosed: true,
      gridConnect: 'arc',
      gridDirection: 'negative',
      gridType: 'surround',
      titlePosition: 'top',
      titleSpacing: 0,
    },
    axisRadar: {
      girdClosed: true,
      gridStrokeOpacity: 0.3,
      gridType: 'surround',
      label: false,
      tick: false,
      titlePosition: 'start',
    },
    legend: {
      backgroundFill: 'transparent',
      itemBackgroundFill: 'transparent',
      itemLabelFill: COLORS.BLACK,
      itemLabelFillOpacity: 0.65,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 'normal',
      itemMarkerFillOpacity: 1,
      itemMarkerSize: 8,
      itemSpacing: [5, 8],
      itemValueFill: COLORS.BLACK,
      itemValueFillOpacity: 0.65,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
      navButtonFill: COLORS.BLACK,
      navButtonFillOpacity: 0.65,
      navPageNumFill: COLORS.BLACK,
      navPageNumFillOpacity: 0.45,
      navPageNumFontSize: 12,
      padding: 8,
      title: false,
      titleFill: COLORS.BLACK,
      titleFillOpacity: 0.45,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 4,
    },
    continuousLegend: {
      handleHeight: 12,
      handleLabelFill: COLORS.BLACK,
      handleLabelFillOpacity: 0.45,
      handleLabelFontSize: 12,
      handleLabelFontWeight: 'normal',
      handleMarkerFill: COLORS.BLACK,
      handleMarkerFillOpacity: 0.6,
      handleMarkerLineWidth: 1,
      handleMarkerStroke: COLORS.BLACK,
      handleMarkerStrokeOpacity: 0.25,
      handleWidth: 10,
      labelFill: COLORS.BLACK,
      labelFillOpacity: 0.45,
      labelFontSize: 12,
      labelFontWeight: 'normal',
      labelSpacing: 8,
      tick: true,
      // [todo] legend rail
    },
    label: {
      fill: COLORS.BLACK,
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      stroke: undefined,
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
      stroke: undefined,
      offset: 0,
    },
    slider: {
      trackSize: 16,
      trackFill: COLORS.STROKE,
      trackFillOpacity: 1,
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
    scrollbar: {
      padding: [2, 2, 2, 2],
      trackSize: 10,
      isRound: true,
      slidable: true,
      scrollable: true,
      trackFill: '#e5e5e5',
      trackFillOpacity: 0,
      thumbFill: '#000',
      thumbFillOpacity: 0.15,
      thumbHighlightedFillOpacity: 0.2,
    },
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

Classic.props = {};

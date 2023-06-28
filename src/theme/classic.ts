import { ThemeComponent as TC, Theme } from '../runtime';
import { getToken } from './token';

export type ClassicOptions = Theme;

/**
 * Default theme.
 */
export const Classic: TC<ClassicOptions> = (options) => {
  const { token = {} } = options;
  const {
    color: ColorToken,
    font: FontToken,
    animate: AnimateToken,
    style: StyleToken,
    palette: PaletteToken,
  } = getToken(token);

  const defaultOptions: Theme = {
    // Palette Style
    palette: {
      defaultColor: PaletteToken.defaultColor,
      category10: PaletteToken.category10,
      category20: PaletteToken.category20,
    },

    // View Style
    view: {
      viewFill: ColorToken.transparent,
      plotFill: ColorToken.transparent,
      mainFill: ColorToken.transparent,
      contentFill: ColorToken.transparent,
    },

    // Mark Style
    line: {
      animate: AnimateToken,
      style: {
        line: {
          lineWidth: StyleToken.lineWidth2,
          strokeOpacity: 1,
          fill: '',
        },
      },
    },
    point: {
      animate: AnimateToken,
      style: {
        diamond: {
          r: StyleToken.r5,
          lineWidth: StyleToken.lineWidth1,
        },
        point: {
          r: StyleToken.r3,
          lineWidth: StyleToken.lineWidth0,
        },
        hollow: {
          r: StyleToken.r3,
          lineWidth: StyleToken.lineWidth1,
        },
        plus: {
          r: StyleToken.r3,
          lineWidth: StyleToken.lineWidth3,
        },
      },
    },
    interval: {
      animate: AnimateToken,
      style: {
        rect: {},
        hollow: {
          fill: ColorToken.transparent,
          lineWidth: StyleToken.lineWidth2,
        },
      },
    },
    area: {
      animate: AnimateToken,
      style: {
        area: {
          lineWidth: StyleToken.lineWidth0,
          connectFill: ColorToken.dark7,
        },
      },
    },
    polygon: {
      animate: AnimateToken,
      style: {
        polygon: {
          fillOpacity: 0.95,
        },
      },
    },
    cell: {
      animate: AnimateToken,
      style: {
        cell: {},
        hollow: {
          lineWidth: StyleToken.lineWidth3,
        },
      },
    },
    rect: {
      animate: AnimateToken,
      style: {
        rect: {
          fillOpacity: 0.95,
        },
        hollow: {
          fill: '',
          strokeOpacity: 1,
          lineWidth: StyleToken.lineWidth6,
        },
      },
    },
    link: {
      animate: AnimateToken,
      style: {
        link: {
          fill: '',
          strokeOpacity: 1,
        },
      },
    },
    vector: {
      animate: AnimateToken,
      style: {
        vector: {
          fillOpacity: 1,
        },
      },
    },
    box: {
      animate: AnimateToken,
      style: {
        box: {
          fillOpacity: 0.95,
          stroke: ColorToken.dark1,
          lineWidth: 1,
        },
      },
    },
    text: {
      animate: AnimateToken,
      style: {
        text: {
          fill: '#1D2129',
          fontSize: 12,
          strokeWidth: 0,
          connectorStroke: PaletteToken.defaultStroke,
          connectorStrokeOpacity: 0.45,
          connectorLineWidth: 1,
          backgroundFill: PaletteToken.defaultStroke,
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
          markerFill: PaletteToken.defaultStroke,
          markerFillOpacity: 0.25,
          markerStrokeOpacity: 0,
        },
      },
    },
    lineX: {
      animate: AnimateToken,
      style: {
        line: {
          stroke: PaletteToken.defaultStroke,
          strokeOpacity: 0.45,
          lineWidth: 1,
        },
      },
    },
    lineY: {
      animate: AnimateToken,
      style: {
        line: {
          stroke: PaletteToken.defaultStroke,
          strokeOpacity: 0.45,
          lineWidth: 1,
        },
      },
    },
    rangeX: {
      animate: AnimateToken,
      style: {
        range: {
          fill: PaletteToken.defaultStroke,
          fillOpacity: 0.15,
          lineWidth: 0,
        },
      },
    },
    rangeY: {
      animate: AnimateToken,
      style: {
        range: {
          fill: ColorToken.dark7,
          lineWidth: 0,
        },
      },
    },
    connector: {
      animate: AnimateToken,
      style: {
        connector: {
          stroke: PaletteToken.defaultStroke,
          strokeOpacity: 0.45,
          lineWidth: 1,
          connectLength1: 12,
          endMarker: true,
          endMarkerSize: 6,
          endMarkerFill: PaletteToken.defaultStroke,
          endMarkerFillOpacity: 0.95,
        },
      },
    },

    // Interaction Style
    interaction: {
      tooltip: {},
      elementHighlight: {},
    },

    axis: {
      animate: {},
      style: {
        arrow: false,
        gridLineDash: [0, 0],
        gridLineWidth: 0.5,
        gridStroke: ColorToken.dark1,
        gridStrokeOpacity: 0.05,
        labelAlign: 'horizontal',
        labelFill: ColorToken.dark1,
        labelFillOpacity: 0.65,
        labelFontSize: 12,
        labelFontWeight: 'lighter',
        labelSpacing: 8, // spacing between label and it's tick
        line: false,
        lineLineWidth: 0.5,
        lineStroke: ColorToken.dark1,
        lineStrokeOpacity: 0.45,
        tickLength: 4,
        tickLineWidth: 1,
        tickStroke: ColorToken.dark1,
        tickStrokeOpacity: 0.25,
        titleFill: ColorToken.dark1,
        titleFillOpacity: 0.65,
        titleFontSize: 12,
        titleFontWeight: FontToken.fontWeightNormal,
        titleSpacing: 12,
        titleTransformOrigin: 'center',

        axisTop: {
          gridDirection: 'positive',
          labelDirection: 'negative',
          labelSpacing: 4,
          tickDirection: 'negative',
          titlePosition: 'top',
          titleSpacing: 0,
          titleTextBaseline: 'middle',
        },
        axisBottom: {
          gridDirection: 'negative',
          labelDirection: 'positive',
          labelSpacing: 4,
          labelAutoRotate: true,
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
          labelAutoRotate: false,
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
        axisArc: {
          title: false,
          titlePosition: 'inner',
          line: false,
          tick: true,
          labelSpacing: 4,
        },
        axisRadar: {
          girdClosed: true,
          gridStrokeOpacity: 0.3,
          gridType: 'surround',
          label: false,
          tick: false,
          titlePosition: 'start',
        },
      },
    },
    legendCategory: {
      animate: {},
      style: {
        backgroundFill: 'transparent',
        itemBackgroundFill: 'transparent',
        itemLabelFill: ColorToken.dark1,
        itemLabelFillOpacity: 0.65,
        itemLabelFontSize: 12,
        itemLabelFontWeight: FontToken.fontWeightLighter,
        itemMarkerFillOpacity: 1,
        itemMarkerSize: 8,
        itemSpacing: [5, 8],
        itemValueFill: ColorToken.dark1,
        itemValueFillOpacity: 0.65,
        itemValueFontSize: 12,
        itemValueFontWeight: FontToken.fontWeightLighter,
        navButtonFill: ColorToken.dark1,
        navButtonFillOpacity: 0.65,
        navPageNumFill: ColorToken.dark1,
        navPageNumFillOpacity: 0.45,
        navPageNumFontSize: 12,
        padding: 8,
        title: true,
        titleFill: ColorToken.dark1,
        titleFillOpacity: 0.65,
        titleFontSize: 12,
        titleFontWeight: FontToken.fontWeightNormal,
        titleSpacing: 4,
        tickStroke: ColorToken.dark1,
        tickStrokeOpacity: 0.25,
        rowPadding: 0,
        colPadding: 8,

        legendContinuous: {
          handleHeight: 12,
          handleLabelFill: ColorToken.dark1,
          handleLabelFillOpacity: 0.45,
          handleLabelFontSize: 12,
          handleLabelFontWeight: FontToken.fontWeightNormal,
          handleMarkerFill: ColorToken.dark1,
          handleMarkerFillOpacity: 0.6,
          handleMarkerLineWidth: 1,
          handleMarkerStroke: ColorToken.dark1,
          handleMarkerStrokeOpacity: 0.25,
          handleWidth: 10,
          labelFill: ColorToken.dark1,
          labelFillOpacity: 0.45,
          labelFontSize: 12,
          labelFontWeight: 'lighter',
          labelSpacing: 3,
          tick: true,
          tickLength: 12,
          ribbonSize: 12,
          ribbonFill: '#aaa',
          handle: true,
          handleLabel: false,
          handleShape: 'slider',
          handleIconSize: 12 / 1.8,
          indicator: false,
          titleFontSize: 12,
          titleSpacing: 4,
          titleFontWeight: FontToken.fontWeightNormal,
          titleFillOpacity: 0.65,
          tickStroke: ColorToken.dark1,
          tickStrokeOpacity: 0.25,
        },
      },
    },

    label: {
      animate: {},
      style: {
        fill: ColorToken.dark1,
        fillOpacity: 0.65,
        fontSize: 12,
        fontWeight: FontToken.fontWeightNormal,
        stroke: undefined,
        offset: 12,
        connectorStroke: ColorToken.dark1,
        connectorStrokeOpacity: 0.45,
        connectorLineWidth: 1,
        connectorLength: 12,
        connectorLength2: 8,
        connectorDistance: 4,

        innerLabel: {
          fill: ColorToken.white1,
          fontSize: 12,
          fillOpacity: 0.85,
          fontWeight: FontToken.fontWeightNormal,
          stroke: undefined,
          offset: 0,
        },
      },
    },

    slider: {
      animate: {},
      style: {
        trackSize: 16,
        trackFill: PaletteToken.defaultStroke,
        trackFillOpacity: 1,
        selectionFill: PaletteToken.defaultColor,
        selectionFillOpacity: 0.15,
        handleIconSize: 10,
        handleIconFill: '#f7f7f7',
        handleIconFillOpacity: 1,
        handleIconStroke: ColorToken.dark1,
        handleIconStrokeOpacity: 0.25,
        handleIconLineWidth: 1,
        handleIconRadius: 2,
        handleLabelFill: ColorToken.dark1,
        handleLabelFillOpacity: 0.45,
        handleLabelFontSize: 12,
        handleLabelFontWeight: FontToken.fontWeightNormal,
      },
    },
    scrollbar: {
      animate: {},
      style: {
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
    },
    title: {
      animate: {},
      style: {
        titleFill: ColorToken.dark1,
        titleFillOpacity: 0.85,
        titleFontSize: 14,
        titleFontWeight: 'bold',
        titleTextBaseline: 'top',
        subtitleFill: ColorToken.dark1,
        subtitleFillOpacity: 0.65,
        subtitleFontSize: 12,
        subtitleFontWeight: FontToken.fontWeightNormal,
        subtitleTextBaseline: 'top',
      },
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Classic.props = {};

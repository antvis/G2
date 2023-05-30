import { ThemeComponent as TC, Theme } from '../runtime';
import { getToken } from './token';

export type ClassicDarkOptions = Theme;

/**
 * Dark theme.
 */
export const ClassicDark: TC<ClassicDarkOptions> = (options) => {
  const { token = {} } = options;
  const {
    color: ColorToken,
    font: FontToken,
    animate: AnimateToken,
    style: StyleToken,
    palette: PaletteToken,
  } = getToken(token);

  const defaultOptions: ClassicDarkOptions = {
    palette: {
      defaultColor: PaletteToken.defaultColor,
      category10: PaletteToken.category10,
      category20: PaletteToken.category20,
    },

    // View Style
    view: {
      viewFill: ColorToken.dark1,
      plotFill: ColorToken.transparent,
      mainFill: ColorToken.transparent,
      contentFill: ColorToken.transparent,
    },

    // Mark Style
    line: {
      animate: AnimateToken,
      style: {
        line: {
          lineWidth: StyleToken.lineWidth1,
          connectFill: ColorToken.white7,
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
          connectFill: ColorToken.white7,
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
      style: {
        cell: {},
        hollow: {
          lineWidth: StyleToken.lineWidth3,
        },
      },
    },
    rect: {
      style: {
        rect: {
          fillOpacity: 0.95,
        },
        hollow: {
          fill: '',
          strokeOpacity: 1,
          lineWidth: 2,
        },
      },
    },
    link: {
      style: {
        link: {
          fill: '',
          strokeOpacity: 1,
        },
      },
    },
    vector: {
      style: {
        vector: {
          fillOpacity: 1,
        },
      },
    },
    box: {
      style: {
        box: {
          fillOpacity: 0.95,
          stroke: ColorToken.white1,
          lineWidth: 1,
        },
      },
    },
    text: {
      style: {
        text: {
          fill: ColorToken.white1,
          fillOpacity: 0.65,
          fontSize: 12,
          strokeWidth: 0,
          connectorStroke: ColorToken.white1,
          connectorStrokeOpacity: 0.45,
          connectorLineWidth: 1,
          backgroundFill: ColorToken.white1,
          backgroundFillOpacity: 0.15,
          backgroundPadding: [2, 4],
          startMarkerSymbol: 'circle',
          startMarkerSize: 4,
          endMarkerSymbol: 'circle',
          endMarkerSize: 4,
        },
        badge: {
          fill: ColorToken.white4,
          strokeWidth: 0,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          markerFill: ColorToken.white6,
          markerStrokeOpacity: 0,
        },
      },
    },
    lineX: {
      line: {
        stroke: ColorToken.white5,
        lineWidth: StyleToken.lineWidth2,
      },
    },
    lineY: {
      line: {
        stroke: ColorToken.white5,
        lineWidth: StyleToken.lineWidth2,
      },
    },
    rangeX: {
      range: {
        fill: ColorToken.white7,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: ColorToken.white7,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: ColorToken.white5,
        lineWidth: StyleToken.lineWidth2,
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: ColorToken.white2,
      },
    },

    // Component Style
    axis: {
      animate: {},
      style: {
        arrow: false,
        gridLineDash: StyleToken.lineDashDotted,
        gridLineWidth: StyleToken.lineWidth1,
        gridStroke: ColorToken.white8,
        labelAlign: 'horizontal',
        labelFill: ColorToken.white4,
        labelFontSize: FontToken.fontSizeH5,
        labelFontWeight: FontToken.fontWeight,
        labelSpacing: 8, // spacing between label and it's tick
        line: false,
        lineLineWidth: StyleToken.lineWidth2,
        lineStroke: ColorToken.white5,
        tickLength: 4,
        tickLineWidth: 1,
        tickStroke: ColorToken.white6,
        titleFill: ColorToken.white4,
        titleFontSize: FontToken.fontSizeH5,
        titleFontWeight: FontToken.fontWeight,
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

    legend: {
      animate: {},
      style: {
        backgroundFill: ColorToken.dark1,
        itemBackgroundFill: ColorToken.dark1,
        itemLabelFill: ColorToken.white4,
        itemLabelFontSize: 12,
        itemLabelFontWeight: FontToken.fontWeight,
        itemMarkerFillOpacity: 1,
        itemMarkerSize: 8,
        itemSpacing: [5, 8],
        itemValueFill: ColorToken.white4,
        itemValueFontSize: FontToken.fontSizeH5,
        itemValueFontWeight: FontToken.fontWeight,
        navButtonFill: ColorToken.white4,
        navPageNumFill: ColorToken.white5,
        navPageNumFontSize: FontToken.fontSizeH5,
        padding: 8,
        title: false,
        titleFill: ColorToken.white3,
        titleFontSize: FontToken.fontSizeH5,
        titleFontWeight: FontToken.fontWeight,
        titleSpacing: 4,
        continuousLegend: {
          handleHeight: FontToken.fontSizeH5,
          handleLabelFill: ColorToken.white5,
          handleLabelFontSize: FontToken.fontSizeH5,
          handleLabelFontWeight: FontToken.fontWeight,
          handleMarkerFill: ColorToken.white4,
          handleMarkerLineWidth: 1,
          handleMarkerStroke: ColorToken.white6,
          handleWidth: 10,
          labelFill: ColorToken.white5,
          labelFontSize: FontToken.fontSizeH5,
          labelFontWeight: FontToken.fontWeight,
          labelSpacing: 8,
          tick: true,
        },
      },
    },

    label: {
      animate: {},
      style: {
        fill: ColorToken.white4,
        fillOpacity: 0.65,
        fontSize: FontToken.fontSizeH5,
        fontWeight: FontToken.fontWeight,
        stroke: undefined,
        offset: 12,
        connectorStroke: ColorToken.white5,
        connectorLineWidth: 1,
        connectorLength: 12,
        connectorLength2: 8,
        connectorDistance: 4,

        innerLabel: {
          fill: ColorToken.white3,
          fontSize: FontToken.fontSizeH5,
          fontWeight: FontToken.fontWeight,
          stroke: undefined,
          offset: 0,
        },
      },
    },

    slider: {
      animate: {},
      style: {
        trackSize: 16,
        trackFill: ColorToken.white1,
        selectionFill: PaletteToken.defaultColor,
        selectionFillOpacity: 0.15,
        handleIconSize: 10,
        handleIconFill: ColorToken.white8,
        handleIconStroke: ColorToken.white6,
        handleIconLineWidth: StyleToken.lineWidth2,
        handleIconRadius: StyleToken.radius2,
        handleLabelFill: ColorToken.white5,
        handleLabelFontSize: FontToken.fontSizeH5,
        handleLabelFontWeight: FontToken.fontWeight,
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
        thumbFill: ColorToken.white7,
        thumbHighlightedFill: ColorToken.white6,
      },
    },

    title: {
      animate: {},
      style: {
        titleFill: ColorToken.white3,
        titleFontSize: FontToken.fontSizeH4,
        titleFontWeight: FontToken.fontWeightStrong,
        titleTextBaseline: 'top',
        subtitleFill: ColorToken.white4,
        subtitleFontSize: FontToken.fontSizeH5,
        subtitleFontWeight: FontToken.fontWeight,
        subtitleTextBaseline: 'top',
      },
    },

    interaction: {
      tooltip: {},
      elementHighlight: {},
    },
  };
  return Object.assign({}, defaultOptions, options);
};

ClassicDark.props = {};

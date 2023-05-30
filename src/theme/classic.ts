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

  const defaultOptions: ClassicOptions = {
    palette: {
      defaultColor: PaletteToken.defaultColor,
      category10: PaletteToken.category10,
      category20: PaletteToken.category20,
    },
    animate: AnimateToken,

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
          lineWidth: 2,
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
          fill: ColorToken.dark5,
          fontSize: 12,
          strokeWidth: 0,
          connectorStroke: ColorToken.dark1,
          connectorStrokeOpacity: 0.45,
          connectorLineWidth: 1,
          backgroundFill: ColorToken.dark1,
          backgroundFillOpacity: 0.15,
          backgroundPadding: [2, 4],
          startMarkerSymbol: 'circle',
          startMarkerSize: 4,
          endMarkerSymbol: 'circle',
          endMarkerSize: 4,
        },
        badge: {
          fill: ColorToken.dark4,
          strokeWidth: 0,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          markerFill: ColorToken.dark6,
          markerStrokeOpacity: 0,
        },
      },
    },
    lineX: {
      animate: AnimateToken,
      style: {
        line: {
          stroke: ColorToken.dark5,
          lineWidth: StyleToken.lineWidth2,
        },
      },
    },
    lineY: {
      animate: AnimateToken,
      style: {
        line: {
          stroke: ColorToken.dark5,
          lineWidth: StyleToken.lineWidth2,
        },
      },
    },
    rangeX: {
      animate: AnimateToken,
      style: {
        range: {
          fill: ColorToken.dark7,
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
          stroke: ColorToken.dark5,
          lineWidth: StyleToken.lineWidth2,
          connectLength1: 12,
          endMarker: true,
          endMarkerSize: 6,
          endMarkerFill: ColorToken.dark2,
        },
      },
    },

    // Component Style
    axis: {
      animate: {},
      style: {
        arrow: false,
        line: false,
        gridLineDash: StyleToken.lineDashSolid,
        gridLineWidth: StyleToken.lineWidth1,
        gridStroke: ColorToken.dark8,
        labelAlign: 'horizontal',
        labelFill: ColorToken.dark4,
        labelFontSize: FontToken.fontSizeH5,
        labelFontWeight: FontToken.fontWeightLighter,
        labelSpacing: 8, // spacing between label and it's tick
        lineLineWidth: StyleToken.lineWidth2,
        lineStroke: ColorToken.dark4,
        tickLength: 4,
        tickLineWidth: 1,
        tickStroke: ColorToken.dark6,
        titleFill: ColorToken.dark4,
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
          // gridStrokeOpacity: 0.3,
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
        backgroundFill: ColorToken.transparent,
        itemBackgroundFill: ColorToken.transparent,
        itemLabelFill: ColorToken.dark4,
        itemLabelFontSize: 12,
        itemLabelFontWeight: FontToken.fontWeight,
        itemMarkerFillOpacity: 1,
        itemMarkerSize: 8,
        itemSpacing: [5, 8],
        itemValueFill: ColorToken.dark4,
        itemValueFontSize: FontToken.fontSizeH5,
        itemValueFontWeight: FontToken.fontWeight,
        navButtonFill: ColorToken.dark4,
        navPageNumFill: ColorToken.dark5,
        navPageNumFontSize: FontToken.fontSizeH5,
        padding: 8,
        title: false,
        titleFill: ColorToken.dark3,
        titleFontSize: FontToken.fontSizeH5,
        titleFontWeight: FontToken.fontWeight,
        titleSpacing: 4,
        continuousLegend: {
          handleHeight: FontToken.fontSizeH5,
          handleLabelFill: ColorToken.dark5,
          handleLabelFontSize: FontToken.fontSizeH5,
          handleLabelFontWeight: FontToken.fontWeight,
          handleMarkerFill: ColorToken.dark4,
          handleMarkerLineWidth: 1,
          handleMarkerStroke: ColorToken.dark6,
          handleWidth: 10,
          labelFill: ColorToken.dark5,
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
        fill: ColorToken.dark5,
        fontSize: FontToken.fontSizeH5,
        fontWeight: FontToken.fontWeight,
        stroke: undefined,
        offset: 12,
        connectorStroke: ColorToken.dark5,
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
      style: {
        trackSize: 16,
        trackFill: ColorToken.dark1,
        selectionFill: PaletteToken.defaultColor,
        selectionFillOpacity: 0.15,
        handleIconSize: 10,
        handleIconFill: ColorToken.dark8,
        handleIconStroke: ColorToken.dark6,
        handleIconLineWidth: StyleToken.lineWidth2,
        handleIconRadius: StyleToken.radius2,
        handleLabelFill: ColorToken.dark5,
        handleLabelFontSize: FontToken.fontSizeH5,
        handleLabelFontWeight: 'normal',
      },
    },

    scrollbar: {
      style: {
        padding: [2, 2, 2, 2],
        trackSize: 10,
        isRound: true,
        slidable: true,
        scrollable: true,
        trackFill: '#e5e5e5',
        trackFillOpacity: 0,
        thumbFill: ColorToken.dark7,
        thumbHighlightedFill: ColorToken.dark6,
      },
    },

    title: {
      style: {
        titleFill: ColorToken.dark3,
        titleFontSize: FontToken.fontSizeH4,
        titleFontWeight: FontToken.fontWeightStrong,
        titleTextBaseline: 'top',
        subtitleFill: ColorToken.dark4,
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

Classic.props = {};

import { ThemeComponent as TC, Theme } from '../runtime';

export type LightOptions = Theme;

/**
 * Default theme.
 * @todo deep mix
 */
export const Light: TC<LightOptions> = (options) => {
  const defaultOptions: Theme = {
    defaultColor: '#5B8FF9',
    defaultCategory10: 'category10',
    defaultCategory20: 'category20',
    defaultSize: 1,
    fontFamily: 'sans-serif',
    elementActiveStroke: 'black',
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },

    axis: {
      tickLineLength: 5,
      subTickLineLength: 4,
      subTickLineCount: 0,
      title: {
        fill: 'black',
        fillOpacity: 1,
        fontWeight: 'bold',
        fontSize: 10,
      },
      label: {
        fill: 'black',
        fillOpacity: 0.65,
        fontSize: 10,
      },
      line: {
        stroke: '#416180',
        strokeOpacity: 0,
        lineWidth: 0.5,
      },
      tickLine: {
        stroke: '#416180',
        strokeOpacity: 0.65,
        lineWidth: 0.5,
      },
      subTickLine: {
        stroke: '#416180',
        strokeOpacity: 0.45,
        lineWidth: 0.5,
      },
    },
    axisTop: {
      titlePadding: 2,
      titleRotate: 0,
      labelOffset: 4,
      titleAnchor: 'end',
    },
    axisBottom: {
      titlePadding: 2,
      titleRotate: 0,
      labelOffset: 8,
      titleAnchor: 'end',
    },
    axisLeft: {
      titlePadding: 6,
      titleRotate: -90,
      labelOffset: 4,
      titleAnchor: 'center',
    },
    axisCenterHorizontal: {
      titlePadding: 6,
      titleRotate: -90,
      labelOffset: 4,
      titleAnchor: 'center',
    },
    axisRight: {
      titlePadding: 16,
      titleRotate: -90,
      labelOffset: 4,
      titleAnchor: 'center',
    },

    legend: {
      title: {
        fill: 'black',
        fontSize: 10,
        fillOpacity: 1,
        fontWeight: 'bold',
      },
      itemMarker: {
        size: 8,
        symbol: 'circle',
      },
      itemName: {
        fontSize: 10,
        fillOpacity: 0.85,
        fill: 'black',
      },
      pager: {
        marker: {
          size: 12,
          fill: 'black',
          cursor: 'pointer',
        },
      },
      active: {
        itemName: {
          fill: 'red',
          fillOpacity: 1,
        },
      },
      inactive: {
        itemName: {
          fontSize: 10,
          fillOpacity: 0.5,
        },
      },
      disabled: {
        pager: {
          marker: {
            fill: '#d9d9d9',
            cursor: 'not-allowed',
          },
        },
      },
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Light.props = {};

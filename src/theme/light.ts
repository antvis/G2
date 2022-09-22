import { ThemeComponent as TC, Theme } from '../runtime';

export type LightOptions = Theme;

/**
 * Default theme.
 */
export const Light: TC<LightOptions> = (options) => {
  const DEFAULT_COLOR = '#1677FF';
  const defaultOptions: Theme = {
    defaultColor: DEFAULT_COLOR,
    defaultCategory10: 'category10',
    defaultCategory20: 'category20',
    defaultSize: 1,
    elementActiveStroke: 'black',
    label: {
      fill: '#424E66',
      fontSize: 12,
    },
    innerLabel: {
      fill: 'rgba(255,255,255,0.85)',
      fontSize: 12,
    },
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    title: {
      fill: '#1D2129',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      fill: '#424E66',
      fontSize: 10,
    },
    // --- Theme of mark shape
    line: {
      line: {
        stroke: DEFAULT_COLOR,
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    point: {
      point: {
        r: 2,
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
        lineWidth: 0,
      },
      hollow: {
        r: 2,
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
        fillOpacity: 0.25,
      },
    },
    polygon: {
      polygon: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
      },
    },
    grid: {
      rect: {
        fill: DEFAULT_COLOR,
        fillOpacity: 0.95,
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
  };
  return Object.assign({}, defaultOptions, options);
};

Light.props = {};

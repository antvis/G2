import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from './penguins-point-brush';

export function settleWeatherCellBrushFilter(): G2Spec {
  return {
    type: 'cell',
    height: 300,
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    transform: [{ type: 'group', color: 'max' }],
    encode: {
      x: (d) => new Date(d.date).getUTCDate(),
      y: (d) => new Date(d.date).getUTCMonth(),
      color: 'temp_max',
    },
    style: {
      inset: 0.5,
    },
    scale: {
      color: {
        palette: 'gnBu',
      },
    },
    interaction: {
      brushFilter: true,
    },
  };
}

settleWeatherCellBrushFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 10, 10, 20, 20);
      },
    },
    {
      changeState: () => {
        brush(plot, 10, 10, 20, 20);
      },
    },
  ];
};

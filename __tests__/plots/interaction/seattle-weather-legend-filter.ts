import { G2Spec } from '../../../src';
import { CONTINUOUS_LEGEND_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { dispatchValueChange } from './commits-point-legend-filter';

export function settleWeatherLegendFilter(): G2Spec {
  return {
    type: 'cell',
    height: 330,
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    encode: {
      x: (d) => new Date(d.date).getUTCDate(),
      y: (d) => new Date(d.date).getUTCMonth(),
      color: 'temp_max',
    },
    transform: [{ type: 'group', color: 'max' }],
    scale: {
      x: { compare: (a, b) => +a - +b },
      y: { compare: (a, b) => +a - +b },
    },
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    style: { inset: 0.5 },
  };
}

settleWeatherLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const [legend] = document.getElementsByClassName(
    CONTINUOUS_LEGEND_CLASS_NAME,
  );
  return [
    {
      changeState: () => {
        dispatchValueChange(legend, [10, 30]);
      },
    },
    {
      changeState: () => {
        dispatchValueChange(legend, [5, 36.4]);
      },
    },
  ];
};

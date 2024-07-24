import { G2Spec } from '../../../src';
import { weather } from '../../data/weather';

function syncTicksOfDomainsFromZero(scales) {
  scales.forEach((scale) => scale.update({ nice: true }));
  const normalize = (d) => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10));
  const maxes = scales.map((scale) => scale.getOptions().domain[1]);
  const normalized = maxes.map(normalize);
  const normalizedMax = Math.max(...normalized);
  for (let i = 0; i < scales.length; i++) {
    const scale = scales[i];
    const domain = scale.getOptions().domain;
    const t = maxes[i] / normalized[i];
    const newDomainMax = normalizedMax * t;
    scale.update({ domain: [domain[0], newDomainMax] });
  }
}

export function weatherLineMultiAxesSync(): G2Spec {
  return {
    type: 'view',
    data: weather,
    children: [
      {
        type: 'line',
        encode: {
          x: 'Month',
          y: 'Temperature',
          color: '#EE6666',
          shape: 'smooth',
        },
        scale: {
          y: { independent: true, groupTransform: syncTicksOfDomainsFromZero },
        },
        axis: {
          y: {
            title: 'Temperature (°C)',
            titleFill: '#EE6666',
            gridStroke: 'red',
            gridStrokeOpacity: 1,
          },
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'Month',
          y: 'Evaporation',
          color: '#5470C6',
          series: () => 'Evaporation',
        },
        scale: {
          y: { independent: true },
        },
        style: {
          fillOpacity: 0.8,
        },
        axis: {
          y: {
            position: 'right',
            title: 'Temperature (°C)',
            titleFill: '#5470C6',
            grid: false,
          },
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'Month',
          y: 'Precipitation',
          color: '#91CC75',
          series: () => 'Precipitation',
        },
        scale: {
          y: { independent: true },
        },
        axis: {
          y: {
            position: 'right',
            title: 'Precipitation (ml)',
            titleFill: '#91CC75',
            grid: false,
          },
        },
      },
    ],
  };
}

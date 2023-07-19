import { G2Spec } from '../../../src';
import { weather } from '../../data/weather';

export function weatherLineMultiAxes(): G2Spec {
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
          y: { independent: true, domainMax: 30 },
        },
        axis: {
          y: {
            title: 'Temperature (°C)',
            grid: false,
            titleFill: '#EE6666',
          },
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'Month',
          y: 'Evaporation',
          color: '#5470C6',
        },
        scale: {
          y: { independent: true, domainMax: 200 },
        },
        style: {
          fillOpacity: 0.8,
        },
        axis: {
          y: {
            title: 'Temperature (°C)',
            grid: null,
            titleFill: '#5470C6',
          },
        },
      },
      {
        type: 'line',
        encode: {
          x: 'Month',
          y: 'Precipitation',
          color: '#91CC75',
        },
        scale: {
          y: { independent: true },
        },
        style: {
          lineWidth: 2,
          lineDash: [2, 2],
        },
        axis: {
          y: {
            position: 'right',
            title: 'Precipitation (ml)',
            grid: false,
            titleFill: '#91CC75',
          },
        },
      },
    ],
  };
}

import { G2Spec } from '../../../src';
import { weather } from '../../data/weather';

export function weatherLineMultiAxesAutoPadding(): G2Spec {
  return {
    type: 'view',
    data: weather,
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
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
            labelFormatter: (d) => d + '00000',
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
            labelFormatter: (d) => d + '00000',
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
            labelFormatter: (d) => d + '00000',
            titleFill: '#91CC75',
          },
        },
      },
    ],
  };
}

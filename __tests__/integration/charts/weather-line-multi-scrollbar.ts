import { G2Spec } from '../../../src';
import { weather } from '../data/weather';

export function weatherLineMultiScrollbar(): G2Spec {
  return {
    type: 'view',
    data: weather,
    paddingLeft: 180,
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
            titleFill: '#EE6666',
            title: 'Temperature (°C)',
            grid: null,
          },
        },
        scrollbar: { y: {} },
      },
      {
        type: 'interval',
        encode: {
          x: 'Month',
          y: 'Evaporation',
          color: '#5470C6',
        },
        scale: {
          y: { domainMax: 200 },
        },
        style: {
          fillOpacity: 0.8,
        },
        axis: {
          y: {
            titleFill: '#5470C6',
            title: 'Temperature (°C)',
            grid: null,
          },
        },
        scrollbar: { y: { position: 'right' } },
      },
      {
        type: 'line',
        encode: {
          x: 'Month',
          y: 'Precipitation',
          color: '#91CC75',
        },
        style: {
          lineWidth: 2,
          lineDash: [2, 2],
        },
        axis: {
          y: {
            position: 'right',
            titleFill: '#91CC75',
            title: 'Precipitation (ml)',
            grid: null,
          },
        },
      },
    ],
  };
}

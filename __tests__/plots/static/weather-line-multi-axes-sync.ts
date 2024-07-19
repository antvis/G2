import { G2Spec } from '../../../src';
import { weather } from '../../data/weather';

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
          y: { independent: true, syncTicks: true },
        },
        axis: {
          y: {
            title: 'Temperature (°C)',
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
          },
        },
      },
    ],
  };
}

weatherLineMultiAxesSync.skip = true;

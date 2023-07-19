import { G2Spec } from '../../../src';
import { weather } from '../../data/weather';

export function weatherLineViewLabelTransform(): G2Spec {
  return {
    type: 'view',
    data: weather,
    labelTransform: [{ type: 'overlapDodgeY' }], // 声明调整
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
        labels: [{ text: 'Temperature' }],
        axis: {
          y: {
            title: 'Temperature (°C)',
            grid: false,
            titleFill: '#EE6666',
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
        labels: [{ text: 'Precipitation' }],
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

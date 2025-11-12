import { seriesTooltipSteps } from './utils';

export function multipleSeries() {
  return {
    type: 'view',
    autoFit: true,
    children: [
      {
        data: [
          { time: '10:10', waiting: 2, s: 'i1' },
          { time: '10:10', waiting: 2, s: 'i2' },
          { time: '10:15', waiting: 6, s: 'i1' },
          { time: '10:15', waiting: 6, s: 'i2' },
        ],
        type: 'interval',
        encode: { x: 'time', y: 'waiting', series: 's' },
        scale: { series: { key: 'interval' } },
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
      },
      {
        data: [
          { time: '10:10', people: 2, s: '1' },
          { time: '10:10', people: 2, s: '2' },
          { time: '10:15', people: 3, s: '1' },
          { time: '10:15', people: 3, s: '2' },
        ],
        type: 'line',
        encode: { x: 'time', y: 'people', shape: 'smooth', series: 's' },
        scale: { series: { key: 'line' } },
        style: { stroke: '#fdae6b', lineWidth: 2 },
        axis: {
          y: {
            position: 'right',
            grid: null,
            title: 'People',
            titleFill: '#fdae6b',
          },
        },
      },
    ],
  };
}

multipleSeries.steps = seriesTooltipSteps([100, 100]);

import { G2Spec } from '../../../src';

export function aaplLineMissingLabel(): G2Spec {
  return {
    type: 'line',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 },
    ],
    encode: {
      x: 'time',
      y: 'people',
    },
    labels: [
      {
        text: 'people',
        dy: -20,
        connector: true,
        connectorStroke: 'red',
        connectorLineWidth: 2,
      },
    ],
  };
}

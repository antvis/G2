import { G2Spec } from '../../../src';

export function mockLineSmallInterval(): G2Spec {
  const floatTimestamp = (s) => +new Date(s) + +`0.${s.slice(s.length - 3)}`;
  return {
    type: 'interval',
    data: [
      {
        task: 'task0',
        startTime: '2023-06-28 03:30:33.900123',
        endTime: '2023-06-28 03:30:33.900678',
        status: '0',
      },
      {
        task: 'task0',
        startTime: '2023-06-28 03:30:33.901123',
        endTime: '2023-06-28 03:30:33.902678',
        status: '1',
      },
    ],
    encode: {
      x: 'task',
      y: (d) => floatTimestamp(d.startTime),
      y1: (d) => floatTimestamp(d.endTime),
    },
    scale: {
      y: {
        type: 'time',
        domain: [
          new Date('2023-06-28 03:30:33.900'),
          new Date('2023-06-28 03:30:33.903'),
        ],
      },
    },
    coordinate: { transform: [{ type: 'transpose' }] },
  };
}

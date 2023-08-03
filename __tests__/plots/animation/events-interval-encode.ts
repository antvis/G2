import { G2Spec } from '../../../src';
import { events } from '../../data/events';

/**
 * @see https://canisjs.github.io/canis-editor/index.html?exmp=gantt_1
 */
export function eventsIntervalEncode(): G2Spec {
  return {
    type: 'interval',
    width: 720,
    data: events,
    coordinate: { transform: [{ type: 'transpose' }] },
    scale: {
      enterDuration: {
        zero: true,
        range: [0, 10000],
      },
    },
    encode: {
      x: 'name',
      y: ['endTime', 'startTime'],
      color: 'name',
      enterDuration: (d) => d.endTime - d.startTime,
      enterDelay: 'startTime',
    },
  };
}

eventsIntervalEncode.intervals = [[5000]];

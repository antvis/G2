import * as d3 from 'd3-random';
import { G2Spec } from '../../../src';

export function monthIntervalFacetRect(): G2Spec {
  const random = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
  const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
  const mockData = () => {
    const names = ['Eat', 'Play', 'Sleep'];
    const week = (date: Date) => {
      const currentDate = date.getDate();
      const newDate = new Date(date);
      const firstDay = new Date(newDate.setDate(1)).getDay();
      return Math.ceil((currentDate + firstDay) / 7);
    };
    const day = (date: Date) => date.getDay();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2022, 5, i + 1);
      return names.map((name) => ({
        activity: name,
        value: random(),
        week: `${week(date)}`,
        day: days[day(date)],
      }));
    }).flat(Infinity);
  };
  return {
    type: 'facetRect',
    width: 800,
    data: mockData(),
    encode: { x: 'day', y: 'week' },
    scale: { x: { domain: days } },
    legend: { color: { position: 'right', size: 50 } },
    paddingLeft: 40,
    paddingBottom: 40,
    children: [
      {
        type: 'interval',
        transform: [{ type: 'stackY' }],
        axis: { x: { labelAutoHide: false }, y: { labelAutoHide: false } },
        encode: {
          x: 'activity',
          y: 'value',
          color: 'activity',
        },
      },
    ],
  };
}

import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
});

const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
const mockData = () => {
  const names = ['Eat', 'Play', 'Sleep'];
  const week = (date) => {
    const currentDate = date.getDate();
    const newDate = new Date(date);
    const firstDay = new Date(newDate.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
  };
  const day = (date) => date.getDay();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2022, 5, i + 1);
    return names.map((name) => ({
      activity: name,
      value: Math.random(),
      week: `${week(date)}`,
      day: days[day(date)],
    }));
  }).flat(Infinity);
};

chart.options({
  type: 'facetRect',
  data: mockData(),
  encode: {
    x: 'day',
    y: 'week',
  },
  scale: {
    x: { domain: days },
  },
  legend: {
    color: { position: 'right', size: 50 },
  },
  paddingRight: 100,
  children: [
    {
      type: 'view',
      coordinate: { type: 'theta' },
      children: [
        {
          type: 'interval',
          transform: [{ type: 'stackY' }],
          scale: {
            y: { facet: false },
          },
          encode: {
            y: 'value',
            color: 'activity',
          },
        },
      ],
    },
  ],
});

chart.render();

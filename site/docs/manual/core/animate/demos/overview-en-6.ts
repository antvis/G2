import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ],
  encode: {
    x: 'name',
    y: ['endTime', 'startTime'],
    color: 'name',
    enterDuration: (d) => (d.endTime - d.startTime) * 300,
    enterDelay: (d) => d.startTime * 100,
  },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();

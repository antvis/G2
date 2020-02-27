import { Chart } from '@antv/g2';

const data = [
  { time: '9:00-10:00', value: 30 },
  { time: '10:00-11:00', value: 90 },
  { time: '11:00-12:00', value: 50 },
  { time: '12:00-13:00', value: 30 },
  { time: '13:00-14:00', value: 70 }
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
  nice: true,
});
chart.axis('time', {
  tickLine: null
});

chart.tooltip({
  showMarkers: false
});
chart.interaction('active-region');

chart.interval().position('time*value')
  .style('time', val => {
    if (val === '13:00-14:00') {
      return {
        fillOpacity: 0.4,
        lineWidth: 1,
        stroke: '#636363',
        lineDash: [3, 2]
      }
    }
    return {
      fillOpacity: 1,
      lineWidth: 0,
      stroke: '#636363',
      lineDash: [3, 2]
    };
  });

chart.render();

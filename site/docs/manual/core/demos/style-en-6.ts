import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  axis: {
    y: {
      grid: true,
      gridStroke: 'red',
      gridStrokeOpacity: 0.5,
      gridLineWidth: 2,
      gridLineDash: [2, 4],
    },
  },
});

chart.render();

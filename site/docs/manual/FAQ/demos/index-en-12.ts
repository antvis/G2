import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  viewStyle: {
    contentFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
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
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: { domainMin: 0, nice: true },
    x: {
      padding: 0,
    },
  },
});

chart.render();

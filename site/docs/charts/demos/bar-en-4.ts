import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { day: '2015/9/1', share: 10 },
    { day: '2015/9/2', share: 12 },
    { day: '2015/9/3', share: 11 },
    { day: '2015/9/4', share: 15 },
    { day: '2015/9/5', share: 20 },
    { day: '2015/9/6', share: 22 },
    { day: '2015/9/7', share: 21 },
    { day: '2015/9/8', share: 25 },
    { day: '2015/9/9', share: 31 },
    { day: '2015/9/10', share: 32 },
    { day: '2015/9/11', share: 28 },
    { day: '2015/9/12', share: 29 },
    { day: '2015/9/13', share: 40 },
    { day: '2015/9/14', share: 41 },
    { day: '2015/9/15', share: 45 },
    { day: '2015/9/16', share: 50 },
    { day: '2015/9/17', share: 65 },
    { day: '2015/9/18', share: 45 },
    { day: '2015/9/19', share: 50 },
    { day: '2015/9/20', share: 51 },
    { day: '2015/9/21', share: 65 },
    { day: '2015/9/22', share: 60 },
    { day: '2015/9/23', share: 62 },
    { day: '2015/9/24', share: 65 },
    { day: '2015/9/25', share: 45 },
    { day: '2015/9/26', share: 55 },
    { day: '2015/9/27', share: 59 },
    { day: '2015/9/28', share: 52 },
    { day: '2015/9/29', share: 53 },
    { day: '2015/9/30', share: 40 },
  ],
  encode: { x: 'day', y: 'share' },
  axis: {
    y: {
      title: null,
    },
    x: {
      title: null,
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();

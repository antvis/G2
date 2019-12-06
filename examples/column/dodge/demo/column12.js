import { Chart } from '@antv/g2';

const data = [
  { company: 'Apple', type: '整体', value: 30 },
  { company: 'Facebook', type: '整体', value: 35 },
  { company: 'Google', type: '整体', value: 28 },

  { company: 'Apple', type: '非技术岗', value: 40 },
  { company: 'Facebook', type: '非技术岗', value: 65 },
  { company: 'Google', type: '非技术岗', value: 47 },

  { company: 'Apple', type: '技术岗', value: 23 },
  { company: 'Facebook', type: '技术岗', value: 18 },
  { company: 'Google', type: '技术岗', value: 20 },

  { company: 'Apple', type: '技术岗', value: 35 },
  { company: 'Facebook', type: '技术岗', value: 30 },
  { company: 'Google', type: '技术岗', value: 25 },
];

const chart = new Chart({
  container: 'container',
  height: 500,
});
chart.data(data);
chart.scale('value', {
  alias: '占比（%）',
  max: 75,
  min: 0,
  tickCount: 4,
});

chart.legend({
  position: 'top',
});

chart
  .interval()
  .position('type*value')
  .color('company')
  .adjust([
    {
      type: 'dodge',
      marginRatio: 1 / 32,
    },
  ])
  .style({
    opacity: 1,
  });

chart.render();

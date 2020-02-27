import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const { DataView } = DataSet;
const data = [
  { item: 'Design', a: 70, b: 30 },
  { item: 'Development', a: 60, b: 70 },
  { item: 'Marketing', a: 50, b: 60 },
  { item: 'Users', a: 40, b: 50 },
  { item: 'Test', a: 60, b: 70 },
  { item: 'Language', a: 70, b: 50 },
  { item: 'Technology', a: 50, b: 40 },
  { item: 'Support', a: 30, b: 40 },
  { item: 'Sales', a: 60, b: 40 },
  { item: 'UX', a: 50, b: 60 },
];
const dv = new DataView().source(data);
dv.transform({
  type: 'fold',
  fields: ['a', 'b'], // 展开字段集
  key: 'user', // key字段
  value: 'score', // value字段
});
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(dv.rows);
chart.scale('score', {
  min: 0,
  max: 80,
});
chart.coordinate('polar', {
  radius: 0.8,
});
chart.axis('item', {
  line: null,
  tickLine: null,
});
chart.axis('score', {
  line: null,
  tickLine: null,
  grid: {
    line: {
      type: 'circle',
    },
  },
});

chart.tooltip({
  shared: true,
  showCrosshairs: true,
  crosshairs: {
    type: 'xy',
    line: {
      style: {
        stroke: '#565656',
        lineDash: [4],
      },
    },
    follow: true
  }
});

chart
  .line()
  .position('item*score')
  .color('user');
chart
  .point()
  .position('item*score')
  .color('user')
  .shape('circle');
chart.render();

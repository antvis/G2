import { Chart } from '@antv/g2';

const data = [
  { type: '硕士', value: 0.4 },
  { type: '本科', value: 0.21 },
  { type: '博士', value: 0.17 },
  { type: '初中', value: 0.009 },
  { type: '专科', value: 0.013 },
  { type: '未知', value: 0.08 },
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent',
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 14,
});
chart.data(dv.rows);
chart.legend(false);
chart.axis(false);
chart.coordinate('theta', {
  radius: 0.75,
});
chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('type', ['#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34'])
  .label('value', function(val) {
    const offset = val > 0.02 ? -30 : 30;
    return {
      offset,
      content: (data) => {
        const percent = String(parseInt(data.percent * 100)) + '%';
        return `${data.type} ${percent}`;
      },
    };
  });
chart.render();

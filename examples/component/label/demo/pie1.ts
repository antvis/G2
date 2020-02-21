import DataSet from '@antv/data-set';
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
});
chart.data(dv.rows);
chart.coordinate('theta', {
  radius: 0.75,
});
chart.tooltip({
  showMarkers: false
});
chart.legend(false);

chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('type', ['#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34'])
  .label('percent', function (val) {
    const offset = val > 0.02 ? -30 : 30;
    return {
      offset,
      content: (originData) => {
        const percent = (originData.percent * 100).toFixed(2) + '%';
        return `${originData.type} ${percent}`;
      },
    };
  });

chart.interaction('element-active');
chart.render();

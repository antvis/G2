import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

// 构造数据
const text = ['MIDNIGHT', '3 AM', '6 AM', '9 AM', 'NOON', '3 PM', '6 PM', '9 PM'];
const data = [];
for (let i = 0; i < 24; i++) {
  data.push({
    type: i + '',
    value: 10,
  });
}
const { DataView } = DataSet;
const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent',
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 40,
});
chart.legend(false);
chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

const bgView = chart.createView();
bgView.coordinate('theta', {
  innerRadius: 0.9,
});
bgView.data(dv.rows);
bgView
  .interval()
  .adjust('stack')
  .position('percent')
  .color('type', ['rgba(255, 255, 255, 0)'])
  .style({
    stroke: '#444',
    lineWidth: 1,
  })
  .tooltip(false);
bgView.annotation().text({
  position: ['50%', '50%'],
  content: '24 hours',
  style: {
    lineHeight: '240px',
    fontSize: '30',
    fill: '#262626',
    textAlign: 'center',
  },
});

const intervalView = chart.createView();
intervalView.data(data);
intervalView.coordinate('polar', {
  innerRadius: 0.9,
});
intervalView.axis(false);
intervalView
  .interval()
  .position('type*value')
  .size('type', (val) => {
    if (val % 3 === 0) {
      return 4;
    }
    return 1;
  })
  .color('#444')
  .tooltip(false)
  .label(
    'type',
    (val) => {
      return {
        content: val % 3 === 0 ? text[val / 3] : '',
      };
    },
    {
      offset: 15,
      style: {
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#bfbfbf',
      },
    }
  );

const userData = [
  { type: '睡眠', value: 70 },
  { type: '淡茶 & 烟斗 & 冥想', value: 10 },
  { type: '写作', value: 10 },
  { type: '教课', value: 40 },
  { type: '酒吧吃肉配白酒', value: 40 },
  { type: '散步', value: 10 },
  { type: '拜访马大大', value: 30 },
  { type: '阅读', value: 30 },
];
const userDv = new DataView();
userDv.source(userData).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent',
});
const pieView = chart.createView();
pieView.data(userDv.rows);
pieView.scale('percent', {
  formatter: (val) => {
    return (val * 100).toFixed(2) + '%';
  },
});
pieView.coordinate('theta', {
  innerRadius: 0.75,
});
pieView
  .interval()
  .adjust('stack')
  .position('percent')
  .color('type')
  .label('type', {
    offset: 40,
  });

chart.render();

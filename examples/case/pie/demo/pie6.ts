import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const data = [
  { name: '狮子', type: '火象星座', value: 11 },
  { name: '白羊', type: '火象星座', value: 10 },
  { name: '射手', type: '火象星座', value: 10 },
  { name: '水瓶', type: '风向星座', value: 14 },
  { name: '双子', type: '风向星座', value: 7 },
  { name: '天平', type: '风向星座', value: 7 },
  { name: '摩羯', type: '土象星座', value: 14 },
  { name: '金牛', type: '土象星座', value: 3 },
  { name: '处女', type: '土象星座', value: 3 },
  { name: '天蝎', type: '水象星座', value: 11 },
  { name: '巨蟹', type: '水象星座', value: 5 },
  { name: '双鱼', type: '水象星座', value: 5 },
];
const ds = new DataSet();
const dv = ds.createView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent',
});

const colorMap = {
  火象星座: '#1890ff',
  风向星座: '#13c2c2',
  土象星座: '#ffc53d',
  水象星座: '#73d13d',
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(dv.rows);
chart.legend(false);
chart.coordinate('theta', {
  radius: 0.5,
  innerRadius: 0.3,
});
chart.tooltip({
  showMarkers: false
});
chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('type', (val) => colorMap[val])
  .style({
    stroke: 'white',
    lineWidth: 1,
  })
  .label('type', {
    offset: -5,
    style: {
      fill: 'white',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)',
    },
  });

const ds2 = new DataSet();
const dv2 = ds2.createView();
dv2.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent',
});
const outterView = chart.createView();
outterView.data(dv2.rows);
outterView.coordinate('theta', {
  innerRadius: 0.5 / 0.8,
  radius: 0.8,
});
outterView
  .interval()
  .adjust('stack')
  .position('percent')
  .color('type*name', (type, name) => colorMap[type])
  .style({
    stroke: 'white',
    lineWidth: 1,
  })
  .label('name', {
    offset: -10,
    style: {
      fill: 'white',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)',
    },
  });

chart.interaction('element-active')

chart.render();

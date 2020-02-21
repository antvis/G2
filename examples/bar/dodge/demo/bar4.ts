import { Chart } from '@antv/g2';

const data = [
  { city: '石家庄', type: '水果', value: 14500 },
  { city: '石家庄', type: '米面', value: 8500 },
  { city: '石家庄', type: '特产零食', value: 10000 },
  { city: '石家庄', type: '茶叶', value: 7000 },
  { city: '深圳', type: '水果', value: 9000 },
  { city: '深圳', type: '米面', value: 8500 },
  { city: '深圳', type: '特产零食', value: 11000 },
  { city: '深圳', type: '茶叶', value: 6000 },
  { city: '温州', type: '水果', value: 16000 },
  { city: '温州', type: '米面', value: 5000 },
  { city: '温州', type: '特产零食', value: 6000 },
  { city: '温州', type: '茶叶', value: 10000 },
  { city: '宁波', type: '水果', value: 14000 },
  { city: '宁波', type: '米面', value: 9000 },
  { city: '宁波', type: '特产零食', value: 10000 },
  { city: '宁波', type: '茶叶', value: 9000 },
  { city: '无锡', type: '水果', value: 14000 },
  { city: '无锡', type: '米面', value: 9000 },
  { city: '无锡', type: '特产零食', value: 10000 },
  { city: '无锡', type: '茶叶', value: 6000 },
  { city: '杭州', type: '水果', value: 9000 },
  { city: '杭州', type: '米面', value: 8500 },
  { city: '杭州', type: '特产零食', value: 10000 },
  { city: '杭州', type: '茶叶', value: 6000 },
  { city: '北京', type: '水果', value: 17000 },
  { city: '北京', type: '米面', value: 6000 },
  { city: '北京', type: '特产零食', value: 7000 },
  { city: '北京', type: '茶叶', value: 10000 },
  { city: '上海', type: '水果', value: 18000 },
  { city: '上海', type: '米面', value: 11000 },
  { city: '上海', type: '特产零食', value: 15000 },
  { city: '上海', type: '茶叶', value: 14000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.coordinate().transpose().scale(1, -1);

chart.data(data);

chart.scale({
  value: {
    max: 20000,
    min: 0,
    alias: '销售额（万）',
  },
});

chart.axis('city', {
  label: {
    style: {
      fill: '#aaaaaa',
      fontSize: 12,
    },
  },
  tickLine: null,
  title: null,
});
chart.axis('value', {
  label: {
    style: {
      fill: '#aaaaaa',
      fontSize: 12,
    },
  },
  title: {
    style: {
      fontSize: 12,
      fontWeight: 300,
    },
    position: 'end'
  },
});

chart.legend({
  position: 'right-bottom',
});

chart.tooltip({
  shared: true,
  showMarkers: false,
});

chart
  .interval()
  .position('city*value')
  .color('type')
  .adjust([
    {
      type: 'dodge',
      marginRatio: 0.3,
    },
  ]);

chart.interaction('active-region');
chart.interaction('legend-highlight');

chart.render();

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: 'Other', value: 5 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 40, 0 ]
});

chart.source(data);
chart.coord('theta', {
  startAngle: Math.PI, // 起始角度
  endAngle: Math.PI * (3 / 2) // 结束角度
});
chart.intervalStack()
  .position('value')
  .color('type')
  .label('type');

chart.render();

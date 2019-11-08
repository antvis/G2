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
chart.coord('polar', {
  startAngle: Math.PI, // 起始角度
  endAngle: Math.PI * (3 / 2) // 结束角度
});
chart.interval()
  .position('type*value')
  .color('type', 'rgb(252,143,72)-rgb(255,215,135)')
  .label('value', {
    offset: -15,
    label: {
      textAlign: 'center',
      fill: '#000'
    }
  })
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });

chart.render();

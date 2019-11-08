const expectData = [
  { value: 100, name: '展现' },
  { value: 80, name: '点击' },
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 30, name: '订单' }
];
const actualData = [
  { value: 80, name: '展现' },
  { value: 50, name: '点击' },
  { value: 30, name: '访问' },
  { value: 10, name: '咨询' },
  { value: 5, name: '订单' }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 120, 95 ]
});
chart.coord('rect').transpose().scale(1, -1);
chart.axis(false);
chart.legend(false);
chart.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});

const expectView = chart.view();
expectView.source(expectData);
expectView.intervalSymmetric()
  .position('name*value')
  .color('name', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
  .shape('pyramid')
  .tooltip('name*value', (name, value) => {
    return {
      name: '预期' + name,
      value
    };
  })
  .label('name', {
    offset: 35,
    labelLine: {
      lineWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.15)'
    }
  })
  .opacity(0.65);

const actualView = chart.view();
actualView.source(actualData);
actualView.intervalSymmetric()
  .position('name*value')
  .color('name', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
  .shape('pyramid')
  .tooltip('name*value', (name, value) => {
    return {
      name: '实际' + name,
      value
    };
  })
  .opacity(1)
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });

chart.render();

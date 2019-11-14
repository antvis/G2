const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});

chart.source(data);
chart.coord('theta', {
  radius: 0.8
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('sold')
  .label('sex')
  .style('sex', {
    fill: sex => {
      if (sex === '男') {
        return 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg';
      }
      return 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg';
    }
  });

chart.render();

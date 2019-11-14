fetch('../data/top2000.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView('test')
      .source(data)
      .transform({
        as: [ 'count' ],
        groupBy: [ 'release' ],
        operations: [ 'count' ],
        type: 'aggregate'
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(dv);
    chart.scale({
      count: {
        alias: 'top2000 唱片总量'
      },
      release: {
        tickInterval: 5,
        alias: '唱片发行年份'
      }
    });
    chart.interval()
      .position('release*count')
      .color('#e50000');

    chart.render();

    chart.interact('brush', {
      type: 'X',
      onBrushstart() {
        chart.hideTooltip();
      },
      onBrushmove() {
        chart.hideTooltip();
      }
    });
  });


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
    chart.source(dv.rows);
    chart.scale({
      count: {
        alias: 'top2000 唱片总量'
      },
      release: {
        tickInterval: 5,
        alias: '唱片发行年份'
      }
    });
    chart.tooltip({
      type: 'mini'
    });
    chart.interval()
      .position('release*count')
      .color('#1890ff')
      .opacity(0.96);

    chart.render();
  });

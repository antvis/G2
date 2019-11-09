
fetch('../data/baby-names.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView('demo').source(data)
      .transform({
        type: 'fill-rows',
        groupBy: [ 'name' ],
        orderBy: [ 'year' ]
      })
      .transform({
        type: 'impute',
        field: 'n',
        method: 'value',
        value: 0
      })
      .transform({
        type: 'aggregate',
        fields: [ 'n' ],
        operations: [ 'sum' ],
        groupBy: [ 'year', 'name' ],
        orderBy: [ 'year' ],
        as: [ 'count' ]
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 180, 50, 50 ],
      plotBackground: {
        stroke: '#ccc'
      }
    });
    chart.source(dv, {
      year: {
        tickInterval: 10,
        nice: false
      },
      count: {
        nice: false
      }
    });
    chart.legend({
      useHtml: true,
      flipPage: true,
      position: 'right',
      title: {
        text: '图例可滚动'
      },
      'g2-legend-marker': {
        borderRadius: 'none'
      },
      'g2-legend-title': {
        fontSize: '12px',
        fontWeight: 500,
        margin: 0,
        color: '#ff8800'
      }
    });
    chart.tooltip({
      shared: false,
      crosshairs: false
    });
    chart.axis('year', {
      title: null,
      line: null,
      tickLine: null
    });
    chart.axis('count', {
      title: null,
      line: null,
      tickLine: {
        length: 8
      },
      subTickCount: 10,
      subTickLine: {
        lineWidth: 1, // 子刻度线宽
        stroke: '#ddd', // 子刻度线颜色
        length: 5
      },
      grid: null
    });
    chart.area()
      .position('year*count')
      .adjust([ 'stack', 'symmetric' ])
      .color('name')
      .shape('smooth')
      .opacity(1);
    chart.render();
  });

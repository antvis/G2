fetch('../data/baby-names.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView().source(data)
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
      animate: false,
      padding: [ 20, 140, 60, 50 ]
    });
    chart.source(dv, {
      year: {
        tickInterval: 10
      }
    });
    chart.legend({
      useHtml: true,
      flipPage: true,
      position: 'right',
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
      crosshairs: false,
      inPlot: false
    });
    chart.axis('count', {
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF'
      },
      tickLine: {
        length: 8,
        stroke: '#ddd'
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

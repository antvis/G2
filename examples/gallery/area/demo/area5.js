fetch('../data/area.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto'
    });
    chart.source(data);
    const ds = new DataSet();
    const dv = ds.createView()
      .source(data)
      .transform({
        type: 'fold',
        fields: [ 'Democracy', 'Colony', 'No Data', 'Open Anocracy', 'Closed Anocracy', 'Monarchy' ],
        key: 'type',
        value: 'value',
        retains: [ 'Year' ]
      })
      .transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        groupBy: [ 'Year' ],
        as: 'percent'
      });

    chart.source(dv, {
      percent: {
        max: 1.0,
        min: 0.0,
        nice: false,
        formatter: function formatter(value) {
          value = value || 0;
          value = value * 100;
          return parseInt(value) + '%';
        }
      }
    });

    chart.scale('Year', {
      tickCount: 10,
      nice: false
    });

    chart.axis('Year', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('percent', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });

    chart.legend({
      position: 'top-center'
    });

    chart
      .areaStack()
      .position('Year*percent')
      .color('type')
      .opacity(0.8);

    chart.render();
  });

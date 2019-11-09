fetch('../data/avg-temp.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'fold',
        key: 'city',
        value: 'value',
        fields: [ 'New York', 'San Francisco', 'Austin' ]
      });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 60, 30, 30 ]
    });
    chart.source(dv, {
      date: {
        type: 'time'
      },
      value: {
        alias: 'Temperature, ºF'
      }
    });
    chart.legend({
      position: 'top'
    });
    chart.axis('date', {
      line: {
        stroke: '#000'
      },
      tickLine: {
        stroke: '#000',
        value: 6 // 刻度线长度
      },
      label: {
        textStyle: {
          textAlign: 'start'
        }
      }
    });
    chart.axis('value', {
      tickLine: {
        stroke: '#000',
        value: 6 // 刻度线长度
      },
      label: {
        textStyle: {
          fill: '#000'
        }
      },
      line: {
        stroke: '#000'
      },
      grid: null
    });
    chart.line()
      .position('date*value')
      .color('city')
      .shape('spline')
      .size(2);
    chart.render();

    chart.interact('brush');
  });

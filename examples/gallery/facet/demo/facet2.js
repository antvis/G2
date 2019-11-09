fetch('../data/fertility.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'sort',
      callback(a, b) {
        return a.year - b.year;
      }
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 50, 20, 50, 100 ]
    });
    chart.source(dv, {
      value: {
        max: 9,
        min: 1
      }
    });

    chart.scale('year', {
      range: [ 0, 1 ]
    });

    chart.scale('value', {
      tickCount: 2,
      sync: true,
      formatter: value => {
        return value + '%';
      }
    });

    chart.axis('value', {
      grid: null,
      label: {
        textStyle: {
          fontSize: 10,
          fill: '#aaaaaa'
        }
      }
    });

    chart.axis('year', {
      tickLine: {
        length: 0
      },
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });

    chart.facet('rect', {
      rowTitle: {
        offsetX: -500,
        style: {
          fontSize: 12,
          textAlign: 'end',
          rotate: 0,
          fontWeight: 300,
          fill: '#8d8d8d'
        }
      },
      fields: [ null, 'country' ],
      padding: 10,
      eachView: function eachView(view) {
        view.line().position('year*value');
      }
    });
    chart.render();
  });

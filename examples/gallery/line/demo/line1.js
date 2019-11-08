fetch('../data/terrorism.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv1 = ds.createView().source(data);
    dv1.transform({
      type: 'map',
      callback: function callback(row) {
        if (typeof (row.Deaths) === 'string') {
          row.Deaths = row.Deaths.replace(',', '');
        }
        row.Deaths = parseInt(row.Deaths);
        row.death = row.Deaths;
        row.year = row.Year;
        return row;
      }
    });
    const dv2 = ds.createView().source(dv1.rows);
    dv2.transform({
      type: 'regression',
      method: 'polynomial',
      fields: [ 'year', 'death' ],
      bandwidth: 0.1,
      as: [ 'year', 'death' ]
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 20, 50, 50 ]
    });
    chart.tooltip({
      crosshairs: false
    });
    const view1 = chart.view();
    view1.source(dv1);
    view1.axis('Year', {
      subTickCount: 3,
      subTickLine: {
        length: 3,
        stroke: '#bfbfbf',
        lineWidth: 1
      },
      tickLine: {
        length: 6,
        lineWidth: 1,
        stroke: '#bfbfbf'
      },
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    view1.axis('Deaths', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        },
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      }
    });
    view1.line().position('Year*Deaths');
    const view2 = chart.view();
    view2.axis(false);
    view2.source(dv2);
    view2.line().position('year*death').style({
      stroke: '#969696',
      lineDash: [ 3, 3 ]
    })
    .tooltip(false);
    // add guide
    view1.guide().text({
      content: '趋势线',
      position: [ '1970', 2500 ],
      style: {
        fill: '#8c8c8c',
        fontSize: 14,
        fontWeight: 300
      },
      offsetY: -70
    });
    chart.render();
  });

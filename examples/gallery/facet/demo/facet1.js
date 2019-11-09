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
      padding: [ 50, 20, 50, 50 ]
    });
    chart.source(dv, {
      value: {
        max: 9,
        min: 1
      }
    });
    chart.scale('year', {
      range: [ 0, 1 ],
      tickCount: 2
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('year', {
      grid: {
        lineStyle: {
          lineDash: [ 0, 0 ],
          lineWidth: 1,
          stroke: '#e9e9e9'
        }
      },
      label: {
        textStyle: text => {
          if (text === '1950') {
            return {
              textAlign: 'start',
              fontSize: 14,
              fill: '#aaaaaa'
            };
          }
          return {
            textAlign: 'start',
            fontSize: 14,
            fill: '#aaaaaa'
          };

        }
      }
    });

    chart.facet('rect', {
      fields: [ 'country' ],
      colTitle: {
        offsetY: -15,
        style: {
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 300,
          fill: '#8d8d8d'
        }
      },
      padding: 5,
      eachView: function eachView(view) {
        view.line().position('year*value').shape('smooth')
          .opacity(0.8);
      }
    });
    chart.render();
  });

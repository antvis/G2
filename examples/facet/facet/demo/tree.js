const { DataView } = DataSet;
fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 80 ]
    });
    chart.source(data, {
      cut: {
        sync: true
      },
      mean: {
        sync: true,
        tickCount: 5
      }
    });
    chart.legend('cut', {
      position: 'top'
    });
    chart.axis('cut', {
      label: null,
      tickLine: null
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.facet('tree', {
      fields: [ 'clarity' ],
      line: {
        stroke: '#c0d0e0'
      },
      lineSmooth: true,
      // padding: 0,
      eachView: (view, facet) => {
        const data = facet.data;
        const dv = new DataView();
        dv.source(data)
          .transform({
            type: 'aggregate',
            fields: [ 'price' ],
            operations: [ 'mean' ],
            as: [ 'mean' ],
            groupBy: [ 'cut' ]
          });
        view.source(dv);
        view.interval()
          .position('cut*mean')
          .color('cut');
      }
    });
    chart.render();
  });

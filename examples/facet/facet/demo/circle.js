const { DataView } = DataSet;
fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 30, 90, 80, 80 ]
    });
    chart.source(data, {
      mean: {
        sync: true
      },
      cut: {
        sync: true
      }
    });
    chart.coord('polar');
    chart.axis(false);
    chart.facet('circle', {
      fields: [ 'clarity' ],
      eachView(view, facet) {
        const data = facet.data;
        const dv = new DataView();
        dv.source(data).transform({
          type: 'aggregate',
          fields: [ 'price' ],
          operations: [ 'mean' ],
          as: [ 'mean' ],
          groupBy: [ 'cut' ]
        });
        view.source(dv);
        view.interval().position('cut*mean').color('cut');
      }
    }); // 分面设置
    chart.render();
  });

const { DataView } = DataSet;
fetch('../data/iris.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    chart.source(data, {
      Species: {
        sync: true
      }
    });
    chart.facet('matrix', {
      fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
      eachView(view, facet) {
        if (facet.rowIndex === facet.colIndex) {
          const dv = new DataView();
          dv.source(facet.data)
            .transform({
              type: 'bin.histogram',
              field: facet.colField,  // 对应数轴上的一个点
              bins: 30,               // 分箱个数
              as: [ facet.colField, 'count' ],
              groupBy: [ 'Species' ]
            });
          view.source(dv.rows);
          view.intervalStack()
            .position(facet.colField + '*count')
            .color('Species')
            .opacity(0.85);
        } else {
          view.point()
            .position([ facet.colField, facet.rowField ])
            .color('Species')
            .shape('circle')
            .opacity(0.3)
            .size(3);
        }
      }
    });
    chart.render();
  });

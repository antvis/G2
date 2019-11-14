fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'kernel-smooth.density',
      fields: [ 'carat', 'price' ],
      as: [ 'carat', 'price', 'density' ]
    });

    chart.source(data);
    chart.legend({
      offset: 45
    });
    chart.point()
      .position('carat*price');

    const view = chart.view();
    view.axis(false);
    view.source(dv);
    view.heatmap()
      .position('carat*price')
      .color('density', 'blue-cyan-lime-yellow-red');

    chart.render();
  });

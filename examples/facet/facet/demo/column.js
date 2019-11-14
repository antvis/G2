fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 40, 80, 80, 80 ]
    });
    chart.source(data, {
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      clarity: {
        sync: true
      }
    });
    chart.facet('rect', {
      fields: [ 'cut' ],
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('clarity')
          .shape('circle')
          .opacity(0.3)
          .size(3);
      }
    });
    chart.render();
  });

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
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      cut: {
        sync: true
      }
    });
    chart.facet('list', {
      fields: [ 'cut' ],
      cols: 3, // 超过3个换行
      padding: 30,
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .opacity(0.3)
          .size(3);
      }
    });
    chart.render();
  });

fetch('../data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.source(data);
    chart.tooltip({
      showTitle: false,
      crosshairs: {
        type: 'cross'
      }
    });
    chart.point().position('height*weight')
      .color('gender')
      .size(4)
      .opacity(0.65)
      .shape('gender', [ 'circle', 'square' ])
      .tooltip('gender*height*weight');
    chart.render();
  });

fetch('../data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 50,
      limitInPlot: true
    });
    chart.source(data);
    chart.tooltip({
      type: 'mini'
    });
    chart.point()
      .position('height*weight')
      .size(4)
      .shape('circle')
      .opacity(0.65);
    chart.render();
    chart
      .interact('drag', {
        type: 'XY'
      })
      .interact('zoom', {
        type: 'XY'
      });
  });

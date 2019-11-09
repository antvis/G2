
fetch('../data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto'
    });
    chart.source(data);
    chart.tooltip({
      type: 'mini'
    });
    chart.point().position('height*weight').size(4)
      .shape('circle')
      .opacity(0.65)
      .label('weight', {
        type: 'scatter',
        offset: 0,
        textStyle: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: '#fff',
          lineWidth: 2
        }
      });
    chart.render();
  });

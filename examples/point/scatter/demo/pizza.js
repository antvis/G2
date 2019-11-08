fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(obj => {
      obj.type = '1';
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 40, 100, 80, 80 ]
    });
    chart.source(data, {
      type: {
        range: [ 0, 1 ]
      }
    });
    chart.coord('polar');
    chart.legend(false);
    chart.axis('clarity', {
      grid: {
        align: 'center',
        lineStyle: {
          lineDash: [ 0, 0 ]
        }
      }
    });
    chart.pointJitter()
      .position('clarity*type')
      .color('clarity')
      .shape('circle')
      .opacity(0.65);
    chart.render();
  });

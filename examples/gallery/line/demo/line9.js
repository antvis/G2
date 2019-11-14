fetch('../data/oil-price.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 110, 70, 35 ]
    });
    chart.source(data);
    chart.scale('date', {
      range: [ 0, 1 ],
      tickCount: 10,
      type: 'timeCat'
    });
    chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('price', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.tooltip({
      crosshairs: 'y',
      share: true
    });
    chart.legend({
      attachLast: true
    });
    chart.line().position('date*price').shape('hv')
      .color('country');

    chart.render();
  });

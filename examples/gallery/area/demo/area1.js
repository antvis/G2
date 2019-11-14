fetch('../data/fireworks-sales.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 40, 50, 50 ]
    });
    chart.source(data);
    chart.scale('Data', {
      range: [ 0, 1 ],
      tickCount: 10,
      type: 'timeCat'
    });
    chart.axis('Data', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('sales', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        },
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
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
    chart.guide().dataMarker({
      top: true,
      content: '因政策调整导致销量下滑',
      position: [ '2014-01', 1750 ],
      style: {
        text: {
          fontSize: 13
        }
      },
      lineLength: 30
    });

    chart.line().position('Data*sales');
    chart.area().position('Data*sales');
    chart.render();
  });

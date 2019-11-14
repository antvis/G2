fetch('../data/us-states.hex.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data, {
      type: 'hex',
      width: 100,
      height: 100
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 500 / 24
    });
    chart.scale({
      x: {
        nice: false,
        sync: true
      },
      y: {
        nice: false,
        sync: true
      }
    });
    chart.coord().reflect(); // 视数据而定要不要翻转 Y 轴。
    chart.tooltip({
      showTitle: false
    });
    chart.axis(false);

    const bgView = chart.view();
    bgView.source(dv._gridRows);
    bgView.polygon()
      .position('x*y')
      .color('grey')
      .opacity(0.5)
      .style({
        stroke: 'white',
        lineWidth: 1
      })
      .tooltip('key');

    const mapView = chart.view();
    mapView.source(dv);
    mapView.polygon()
      .position('x*y')
      .color(G2.Global.colors[1])
      .style({
        stroke: 'white',
        lineWidth: 5
      })
      .label('key', {
        offset: 0,
        textStyle: {
          fontSize: 500 / 18,
          fontWeight: 500
        }
      })
      .tooltip('capital');

    chart.render();
  });

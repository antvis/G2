fetch('../data/gaussion-distribution.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data)
      .transform({
        sizeByCount: true, // calculate bin size by binning count
        type: 'bin.hexagon',
        fields: [ 'x', 'y' ], // 对应坐标轴上的一个点
        bins: [ 10, 5 ]
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(dv);
    chart.tooltip({
      showTitle: false,
      crosshairs: false
    });
    chart.legend({
      offset: 40
    });
    chart.axis('x', {
      grid: {
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    chart.polygon().position('x*y')
      .color('count', '#BAE7FF-#1890FF-#0050B3')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  });

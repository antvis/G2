fetch('../data/dv-grades.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(data);
    chart.tooltip({
      crosshairs: {
        type: 'cross'
      }
    });
    chart.legend({
      reversed: true // 图例项逆序显示
    });
    chart.axis('Score', {
      grid: null
    });
    // x轴的栅格线居中
    chart.axis('Class', {
      tickLine: null,
      subTickCount: 1, // 次刻度线个数
      subTickLine: {
        lineWidth: 1,
        stroke: '#BFBFBF',
        length: 4
      },
      grid: {
        align: 'center', // 网格顶点从两个刻度中间开始
        lineStyle: {
          stroke: '#8C8C8C',
          lineWidth: 1,
          lineDash: [ 3, 3 ]
        }
      }
    });
    chart.point().position('Class*Score')
      .color('Grade')
      .adjust('jitter')
      .shape('circle')
      .opacity(0.65)
      .size(4);
    chart.render();
  });

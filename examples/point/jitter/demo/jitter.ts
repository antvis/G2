import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/dv-grades.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });
    chart.data(data);
    chart.scale('Score', {
      nice: true,
    });
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
      },
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
      subTickLine: {
        count: 1,
        length: 4,
        style: {
          lineWidth: 1,
          stroke: '#BFBFBF',
        }
      },
      grid: {
        line: {
          style: {
            stroke: '#8C8C8C',
            lineWidth: 1,
            lineDash: [3, 3]
          }
        }
      }
    });
    chart.point().position('Class*Score')
      .color('Grade')
      .adjust('jitter')
      .shape('circle')
      .style({
        opacity: 0.65,
      })
    chart.render();
  });

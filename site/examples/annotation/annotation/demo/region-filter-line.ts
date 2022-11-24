/**
 * A recreation of this demo: https://g2-v4.antv.vision/zh/examples/case/line#line8
 */
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/cpu-data.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart
      .data(data)
      .scale('y', { domain: [0, 100] })
      .axis('x', { title: false })
      .legend('color', { title: false })
      .scale('color', { range: ['#ced4d9', '#5B8FF9'] });

    chart
      .line()
      .encode('x', 'time')
      .encode('y', 'cpu')
      .encode('color', 'date')
      .style('lineWidth', 2);

    chart
      .lineY()
      .data([85])
      .style('stroke', '#ff4d4f')
      .style('lineDash', [4, 4])
      .label({ text: '预警线 85%', position: 'left', dy: -12 });

    chart
      .call(breathPoint(4))
      .call(breathPoint(8, { fillOpacity: 0.75 }))
      .call(breathPoint(14, { fillOpacity: 0.4 }))
      .call(breathPoint(18, { fillOpacity: 0.2 }));

    chart.render();

    function breathPoint(size, style = {}) {
      return (node) => {
        node
          .point()
          .data({
            transform: [
              {
                type: 'filter',
                callback: (d) => d.time === '14.20' && d.date === 'today',
              },
            ],
          })
          .encode('x', 'time')
          .encode('y', 'cpu')
          .encode('shape', 'point')
          .encode('size', size)
          .animate('enterType', 'zoomIn')
          .animate('enterRepeat', 'repeat')
          .style(style);
      };
    }
  });

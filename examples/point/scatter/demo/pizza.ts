import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(obj => {
      obj.type = '1';
    });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [40, 100, 80, 80]
    });
    chart.data(data);
    chart.scale('type', {
      range: [0, 1]
    });
    chart.coordinate('polar');
    chart.legend(false);
    chart.axis('clarity', {
      grid: {
        // align: 'center',
        line: {
          style: {
            lineDash: [0, 0]
          },
        },
      },
    });
    chart
      .point()
      .adjust('jitter')
      .position('clarity*type')
      .color('clarity')
      .shape('circle')
      .style({
        fillOpacity: 0.65,
      })
    chart.render();
  });

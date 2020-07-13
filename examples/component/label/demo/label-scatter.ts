import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    chart.scale({
      height: { nice: true },
      weight: { nice: true },
    });
    chart.tooltip(false);

    chart
      .point()
      .position('height*weight')
      .size(4)
      .shape('circle')
      .label('weight', {
        layout: {
          type: 'overlap',
        },
        offset: 0,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: '#fff',
          lineWidth: 2,
        },
      });
    chart.render();
  });

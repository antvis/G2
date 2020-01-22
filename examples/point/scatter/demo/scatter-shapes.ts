import { Chart } from '@antv/g2';

fetch('../data/scatter.json')
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
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
      },
    });

    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('gender', ['circle', 'square'])
      .tooltip('gender*height*weight')
      .style({
        fillOpacity: 0.6
      });

    chart.render();
  });

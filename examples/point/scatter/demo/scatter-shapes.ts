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

    chart
      .point()
      .position('height*weight')
      .color('gender')
      .size(4)
      .shape('gender', ['circle', 'square'])
      .tooltip('gender*height*weight');

    chart.render();
  });

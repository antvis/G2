import { Chart } from '@antv/g2';

fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      forceFit: true,
      height: 500,
    });

    chart.data(data);

    chart
      .point()
      .position('height*weight')
      .size(4)
      .shape('circle')
      .style({
        opacity: 0.65,
      })
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)',
        };
      });

    chart.render();
  });

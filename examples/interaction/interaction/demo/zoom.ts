import { Chart, registerInteraction } from '@antv/g2';
fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.data(data);
    chart.interaction('view-zoom');
    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)',
        };
      });
    chart.render();
  });

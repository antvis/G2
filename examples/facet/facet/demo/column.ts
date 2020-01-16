import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [32, 8, 48, 48]
    });
    chart.data(data);

    chart.scale({
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      clarity: {
        sync: true
      }
    });

    chart.facet('rect', {
      fields: [ 'cut' ],
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('clarity')
          .shape('circle')
          .style({ opacity: 0.3 })
          .size(3);
      }
    });
    chart.render();
  });

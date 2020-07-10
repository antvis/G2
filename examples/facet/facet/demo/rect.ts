import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: 48
    });
    chart.data(data);

    chart.scale({
      carat: {
        sync: true
      },
      price: {
        sync: true,
        tickCount: 3,
        nice: true,
      },
      cut: {
        sync: true
      }
    });

    chart.facet('rect', {
      fields: [ 'cut', 'clarity' ],
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .style({ fillOpacity: 0.3, stroke: null })
          .size(3);
      }
    });
    chart.render();
  });

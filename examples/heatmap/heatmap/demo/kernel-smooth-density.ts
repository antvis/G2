import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });

    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'kernel-smooth.density',
      fields: ['carat', 'price'],
      as: ['carat', 'price', 'density']
    });

    chart.data(data);
    chart.scale({
      price: { nice: true },
      carat: { nice: true },
      density: { nice: true },
    });

    chart.point()
      .position('carat*price');

    const view = chart.createView({
      padding: 0,
    });
    view.axis(false);
    view.data(dv.rows);
    view.heatmap()
      .position('carat*price')
      .color('density', 'blue-cyan-lime-yellow-red');

    chart.render();
  });

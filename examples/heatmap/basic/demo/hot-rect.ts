import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'bin.rectangle',
        fields: ['carat', 'price']
      });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [20, 20, 50, 80]
    });
    chart.data(dv.rows);
    chart.scale({
      y: { nice: true },
      count: { nice: true },
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart.polygon()
      .position('x*y')
      .color('count', ['#BAE7FF', '#1890FF', '#0050B3']);

    chart.interaction('element-active');

    chart.render();
  });

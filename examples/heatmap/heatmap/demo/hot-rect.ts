import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
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
      padding: [20, 80, 120, 85]
    });
    chart.data(dv.rows);
    chart.tooltip({
      showTitle: false,
      showTooltipMarkers: false,
    });
    chart.polygon()
      .position('x*y')
      .color('count', ['#BAE7FF', '#1890FF', '#0050B3']);
    chart.render();
  });

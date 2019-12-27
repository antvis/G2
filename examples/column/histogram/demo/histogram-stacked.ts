import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 1,
      groupBy: ['cut'],
      as: ['depth', 'count'],
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(dv.rows);

    chart.tooltip({
      position: 'top',
      shared: true,
      showTooltipMarkers: false,
    });

    chart
      .interval()
      .position('depth*count')
      .color('cut')
      .adjust('stack');

    chart.render();
  });

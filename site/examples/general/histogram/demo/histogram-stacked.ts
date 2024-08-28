import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
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

    chart
      .interval()
      .encode('x', 'depth')
      .encode('y', 'count')
      .encode('color', 'cut')
      .data(dv.rows)
      .scale({
        depth: {
          tickInterval: 1,
        },
        count: {
          nice: true,
        },
      });

    chart.render();
  });

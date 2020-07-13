import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/top2000.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView('test')
      .source(data)
      .transform({
        as: ['count'],
        groupBy: ['release'],
        operations: ['count'],
        type: 'aggregate'
      });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });
    chart.data(dv.rows);
    chart.scale({
      count: {
        alias: 'top2000 唱片总量',
        nice: true
      },
      release: {
        tickInterval: 5,
        alias: '唱片发行年份'
      }
    });
    chart
      .interval()
      .position('release*count');

    chart.interaction('element-range-highlight');
    chart.render();
  });

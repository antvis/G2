import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/gaussion-distribution.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet({
      state: {
        sizeEncoding: false
      }
    });
    const dv = ds.createView('diamond').source(data);
    dv.transform({
      sizeByCount: '$state.sizeEncoding', // calculate bin size by binning count
      type: 'bin.rectangle',
      fields: ['x', 'y'], // 对应坐标轴上的一个点
      bins: [20, 10]
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [32, 32, 48, 32],
    });
    chart.data(dv.rows);
    chart.scale({
      y: { nice: true },
      count: { nice: true },
    });

    chart.tooltip({
      showMarkers: false,
      showTitle: false,
    });
    chart.polygon()
      .position('x*y')
      .color('count', '#BAE7FF-#1890FF-#0050B3');

    chart.interaction('element-active');

    chart.render();
  });

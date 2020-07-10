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
    const dv = ds.createView().source(data)
      .transform({
        sizeByCount: '$state.sizeEncoding', // calculate bin size by binning count
        type: 'bin.hexagon',
        fields: ['x', 'y'], // 对应坐标轴上的一个点
        bins: [10, 5]
      });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [40, 40, 50, 40],
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

    chart.axis('x', {
      grid: {
        line: {
          style: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [2, 2]
          }
        }
      }
    });
    chart
      .polygon()
      .position('x*y')
      .color('count', '#BAE7FF-#1890FF-#0050B3')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });

    chart.interaction('element-active');

    chart.render();
  });

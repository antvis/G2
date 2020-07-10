import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'diagram.voronoi',
      fields: ['x', 'y'],
      size: [800, 600],
      as: ['_x', '_y'],
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart.data(dv.rows);
    chart.scale({
      _x: {
        nice: true,
      },
      _y: {
        nice: true,
      },
    });

    chart
      .polygon()
      .position('_x*_y')
      .color('value')
      .label('value', {
        offset: 0,
        style: {
          fill: '#fff',
          fontSize: 12,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      });
    chart.interaction('element-active');

    chart.render();
  });

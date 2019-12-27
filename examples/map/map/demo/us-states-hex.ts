import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/us-states.hex.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data, {
      type: 'hex',
      width: 100,
      height: 100
    });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: 500 / 24
    });
    chart.scale({
      x: {
        nice: false,
        sync: true
      },
      y: {
        nice: false,
        sync: true
      }
    });
    chart.coordinate('rect').reflect('y'); // 视数据而定要不要翻转 Y 轴。
    chart.tooltip({
      showTitle: false
    });
    chart.axis(false);

    const bgView = chart.createView();
    bgView.data(dv._gridRows);
    bgView.polygon()
      .position('x*y')
      .color('grey')
      .style({
        stroke: 'white',
        lineWidth: 1,
        opacity: 0.5,
      })
      .tooltip('key');

    const mapView = chart.createView();
    mapView.data(dv.rows);
    mapView.polygon()
      .position('x*y')
      .color('#5B8FF9')
      .style({
        stroke: 'white',
        lineWidth: 5
      })
      .label('key', {
        offset: 0,
        style: {
          fontSize: 500 / 18,
          fontWeight: 500
        }
      })
      .tooltip('capital');

    chart.render();
  });

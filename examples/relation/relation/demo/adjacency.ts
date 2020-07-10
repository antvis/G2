import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'hierarchy',
    });
    dv.transform({
      type: 'hierarchy.partition',
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: 0,
    });
    chart.data(
      dv.getAllNodes().map((node) => ({
        name: node.data.name,
        value: node.value,
        depth: node.depth,
        x: node.x,
        y: node.y,
      }))
    );
    chart.scale({
      x: { nice: true },
      y: { nice: true },
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart.axis(false);
    chart.legend(false);
    chart
      .polygon()
      .position('x*y')
      .color('name');
    chart.interaction('element-active');
    chart.render();
  });

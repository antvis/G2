import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relationship-with-weight.json')
  .then(res => res.json())
  .then(data => {
    // arc diagram layout
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: d => d.links
    });
    dv.transform({
      type: 'diagram.arc',
      marginRatio: 0.5
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [20, 20, 95],
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart.scale({
      x: {
        sync: true,
        nice: true,
      },
      y: {
        sync: true,
        nice: true,
        max: 1,
      }
    });

    const edgeView = chart.createView();
    edgeView.data(dv.edges);
    edgeView.axis(false);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('source')
      .tooltip('source*target');

    const nodeView = chart.createView();
    nodeView.data(dv.nodes);
    nodeView.axis(false);
    nodeView.point()
      .position('x*y')
      .shape('circle')
      .size('value')
      .color('id')
      .style({
        stroke: 'grey'
      })
      .label('name', { // label configuration for non-polar coord
        offset: -10,
        style: {
          textAlign: 'left',
        },
        rotate: Math.PI / 2,
      });
    chart.interaction('element-active');

    chart.render();
  });

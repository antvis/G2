import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/relationship-with-weight.json')
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
      padding: [20, 20, 95, 80],
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });
    chart.scale('y', {
      max: 1,    // FIXME: 待 scale 改造后删除
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

    chart.render();
  });

import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relationship-with-weight.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: d => d.links
    });
    dv.transform({
      type: 'diagram.arc',
      sourceWeight: e => e.sourceWeight,
      targetWeight: e => e.targetWeight,
      weight: true,
      marginRatio: 0.3
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: 30,
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
    edgeView.coordinate('polar').reflect('y');
    edgeView.axis(false);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('source')
      .tooltip('source*target*value')
      .style({
        fillOpacity: 0.5
      });

    const nodeView = chart.createView();
    nodeView.data(dv.nodes);
    nodeView.coordinate('polar').reflect('y');
    nodeView.axis(false);
    nodeView.polygon()
      .position('x*y')
      .color('id')
      .label('name', {
        labelEmit: true,
        style: {
          fill: '#8c8c8c',
        },
      })
      .style({
        fillOpacity: 0.5
      });
    chart.interaction('element-active');

    chart.render();
  });

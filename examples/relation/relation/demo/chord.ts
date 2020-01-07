import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/relationship-with-weight.json')
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
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });
    chart.scale({
      x: {
        sync: true
      },
      y: {
        sync: true,
        max: 1, // FIXME: 待 scale 改造后删除
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

    chart.render();
    chart.render(); // FIXME: 初次加载时，scale 同步没有生效，调用两次 chart.render() 才生效
  });

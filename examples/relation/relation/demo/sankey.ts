// FIX: dataset 数据处理
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/energy.json')
  .then(res => res.json())
  .then(data => {
    // arc diagram layout
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: d => d.links
    });
    dv.transform({
      type: 'diagram.sankey'
    });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [40, 80]
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });
    chart.axis(false);
    chart.scale({
      x: { sync: true },
      y: { sync: true }
    });

    // edge view
    const edges = dv.edges.map((edge) => {
      return {
        source: edge.source.name,
        target: edge.target.name,
        x: edge.x,
        y: edge.y,
        value: edge.value,
      };
    });
    const edgeView = chart.createView();
    edgeView.data(edges);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('#bbb')
      .tooltip('target*source*value', (target, source, value) => {
        return {
          name: source + ' to ' + target + '</span>',
          value
        };
      })
      .style({
        fillOpacity: 0.6,
      });

    // node view
    const nodes = dv.nodes.map((node) => {
      return {
        x: node.x,
        y: node.y,
        name: node.name,
      };
    });
    const nodeView = chart.createView();
    nodeView.data(nodes);
    nodeView.polygon()
      .position('x*y') // nodes数据的x、y由layout方法计算得出
      .color('name')
      .label('name', {
        style: {
          fill: '#545454',
          textAlign: 'start'
        },
        offset: 0,
        content: (obj) => {
          return '  ' + obj.name;
        }
      })
      .tooltip(false)
      .style({
        stroke: '#ccc'
      });
    chart.render();
    chart.render();// FIXME: 初次加载时，scale 同步没有生效，调用两次 chart.render() 才生效

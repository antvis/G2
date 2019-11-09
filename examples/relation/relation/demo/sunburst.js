fetch('../data/sunburst.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data, {
      type: 'hierarchy'
    }).transform({
      type: 'hierarchy.partition', // 根据树形数据生成相邻层次图 Adjacency Diagram 布局
      field: 'sum',
      as: [ 'x', 'y' ]
    });
    const source = [];
    const nodes = dv.getAllNodes();
    nodes.map(node => {
      if (node.depth === 0) { // 父节点不展示
        return null;
      }
      const obj = {};
      obj.label = node.data.label;
      obj.sum = node.data.sum;
      obj.uv = node.data.uv;
      obj.value = node.value;
      obj.x = node.x;
      obj.y = node.y;
      source.push(obj);
      return node;
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 0
    });
    chart.source(source);
    chart.coord('polar', {
      innerRadius: 0.3
    });
    chart.tooltip({
      showTitle: false
    });
    chart.axis(false);
    chart.legend(false);

    chart.polygon()
      .position('x*y')
      .color('value', '#BAE7FF-#1890FF-#0050B3')
      .active(false)
      .style({
        stroke: '#FFF',
        lineWidth: 1
      })
      .tooltip('label*sum');
    chart.render();
  });

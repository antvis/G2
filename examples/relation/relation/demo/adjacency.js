fetch('../data/flare.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'hierarchy'
    });
    dv.transform({
      type: 'hierarchy.partition'
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 0
    });
    chart.source(dv.getAllNodes().map(node => ({
      name: node.data.name,
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y
    })));
    chart.tooltip({ showTitle: false });
    chart.axis(false);
    chart.legend(false);
    chart.polygon()
      .position('x*y')
      .color('name');

    chart.render();
  });

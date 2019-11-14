fetch('../data/flare.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data, {
      type: 'hierarchy'
    });
    dv.transform({
      type: 'hierarchy.tree'
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 50, 0, 20, 0 ]
    });
    chart.axis(false);
    chart.legend(false);
    chart.coord('polar');

    const edgeView = chart.view();
    edgeView.source(dv.getAllLinks().map(link => ({
      x: [ link.source.x, link.target.x ],
      y: [ link.source.y, link.target.y ],
      source: link.source.id,
      target: link.target.id
    })));
    edgeView.edge()
      .position('x*y')
      .shape('smooth') // vhv
      .color('grey')
      .opacity(0.5)
      .tooltip('source*target');

    const nodeView = chart.view();
    nodeView.source(dv.getAllNodes().map(node => ({
      hasChildren: !!(node.data.children && node.data.children.length),
      name: node.data.name,
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y
    })));
    nodeView.point()
      .position('x*y')
      .color('hasChildren')
      .label('name', {
        offset: 0,
        labelEmit: true,
        textStyle: (text, item) => {
          let textAlign = item.textAlign;
          if (item.hasChildren) {
            textAlign = textAlign === 'left' ? 'right' : 'left';
          }
          return {
            fill: 'grey',
            fontSize: 9,
            textAlign
          };
        }
      });

    chart.render();
  });

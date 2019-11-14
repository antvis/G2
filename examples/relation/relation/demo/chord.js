
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

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
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
        sync: true
      }
    });

    const edgeView = chart.view();
    edgeView.source(dv.edges);
    edgeView.coord('polar').reflect('y');
    edgeView.axis(false);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('source')
      .opacity(0.5)
      .tooltip('source*target*value');

    const nodeView = chart.view();
    nodeView.source(dv.nodes);
    nodeView.coord('polar').reflect('y');
    nodeView.axis(false);
    nodeView.polygon()
      .position('x*y')
      .color('id')
      .label('name', {
        labelEmit: true,
        textStyle: {
          fill: '#8c8c8c'
        }
      });

    chart.render();
  });

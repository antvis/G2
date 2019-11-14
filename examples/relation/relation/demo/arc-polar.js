
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

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 120
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });

    const edgeView = chart.view();
    edgeView.coord('polar').reflect('y');
    edgeView.source(dv.edges);
    edgeView.axis(false);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('source')
      .opacity(0.5)
      .tooltip('source*target');

    const nodeView = chart.view();
    nodeView.coord('polar').reflect('y');
    nodeView.source(dv.nodes);
    nodeView.axis(false);
    nodeView.point()
      .position('x*y')
      .shape('circle')
      .size('value')
      .color('id')
      .opacity(0.5)
      .style({
        stroke: 'grey'
      })
      .label('name', {
        labelEmit: true
      });

    chart.render();
  });

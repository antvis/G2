fetch('../data/cars.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    const view1 = chart.view({
      end: {
        x: 0.45,
        y: 1
      }
    });
    view1.source(data);
    view1.tooltip(false);
    view1.point().position('Horsepower*Miles_per_Gallon');

    const view2 = chart.view({
      start: {
        x: 0.55,
        y: 0
      }
    });

    view2.source(data);
    view2.point().position('Acceleration*Displacement');

    chart.render();

    chart.interact('brush', {
      draggable: true,
      inPlot: false,
      onBrushstart(ev) {
        const { x, y } = ev;
        const views = chart.getViewsByPoint({ x, y });
        if (views.length > 1) {
          this.chart = views[1];
          const coord = views[1].get('coord');
          this.plot = {
            start: coord.start,
            end: coord.end
          };
          this.xScale = views[1].getXScale();
          this.yScale = views[1].getYScales()[0];
        }
      },
      onBrushmove(ev) {
        const { data } = ev;
        view2.filterShape(obj => {
          return data.indexOf(obj) > -1;
        });
      },
      onDragmove(ev) {
        const { data } = ev;
        view2.filterShape(obj => {
          return data.indexOf(obj) > -1;
        });
      }
    });
  });

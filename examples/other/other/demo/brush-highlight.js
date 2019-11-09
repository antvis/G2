fetch('../data/iris.json')
  .then(res => res.json())
  .then(data => {
    const Util = G2.Util;
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    chart.source(data, {
      Species: {
        sync: true
      }
    });
    chart.legend({
      hoverable: false
    });
    chart.facet('matrix', {
      fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
      eachView(view, facet) {
        view.axis(facet.colField, {
          label: null,
          line: {
            lineWidth: 1,
            stroke: '#000'
          },
          tickLine: {
            lineWidth: 1,
            stroke: '#000',
            length: 4
          }
        });
        view.axis(facet.rowField, {
          label: null,
          line: {
            lineWidth: 1,
            stroke: '#000'
          },
          tickLine: {
            lineWidth: 1,
            stroke: '#000',
            length: 4
          }
        });
        if (facet.rowIndex === facet.colIndex) {
          view.point()
            .position(facet.colField + '*' + facet.colField)
            .color('Species', [ '#880000', '#008800', '#000088' ])
            .opacity(0.5)
            .shape('circle')
            .size(3)
            .active(false);
        } else {
          view.point()
            .position([ facet.colField, facet.rowField ])
            .color('Species', [ '#880000', '#008800', '#000088' ])
            .opacity(0.5)
            .shape('circle')
            .size(3)
            .active(false);
        }
        if ([ 0, 1, 2, 3 ].indexOf(facet.rowIndex) > -1 && facet.colIndex === 0) {
          view.guide().text({
            position: [ 3.7, 'median' ],
            content: facet.rowValue,
            style: {
              rotate: -90,
              fontSize: 12,
              fill: '#999',
              textAlign: 'center'
            }
          });
        }
        if ([ 0, 1, 2, 3 ].indexOf(facet.colIndex) > -1 && facet.rowIndex === 3) {
          view.guide().text({
            position: [ 'median', 'min' ],
            content: facet.colValue,
            style: {
              fontSize: 12,
              fill: '#999',
              textAlign: 'center'
            },
            offsetY: 20
          });
        }
      }
    });
    chart.render();

    chart.interact('brush', {
      draggable: true,
      type: 'xy',
      inPlot: false,
      onBrushstart(ev) {
        chart.hideTooltip();
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
        chart.hideTooltip();

        const { data } = ev;
        chart.eachShape((record, shape) => {
          if (!shape.get('_originAttrs')) {
            shape.set('_originAttrs', Util.cloneDeep(shape._attrs)); // 缓存原来的属性
          }
          if (data.indexOf(record) === -1) {
            shape.attr('fill', '#ccc');
          } else {
            const originAttrs = shape.get('_originAttrs');
            shape._attrs = Util.cloneDeep(originAttrs);
          }
        });
      },
      onDragmove(ev) {
        chart.hideTooltip();

        const { data } = ev;
        chart.eachShape((record, shape) => {
          if (!shape.get('_originAttrs')) {
            shape.set('_originAttrs', Util.cloneDeep(shape._attrs)); // 缓存原来的属性
          }
          if (data.indexOf(record) === -1) {
            shape.attr('fill', '#ccc');
          } else {
            const originAttrs = shape.get('_originAttrs');
            shape._attrs = Util.cloneDeep(originAttrs);
          }
        });
      },
      onReset() {
        chart.eachShape((record, shape) => {
          if (shape.get('_originAttrs')) {
            shape._attrs = Util.cloneDeep(shape.get('_originAttrs'));
          }
        });
        chart.repaint();
      }
    });

  });

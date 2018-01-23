// const expect = require('chai').expect;
const G2 = require('../../src/index');
const diamonds = require('../../demos/data/diamond.json');
const DataSet = require('@antv/data-set');
const DataView = DataSet.View;

describe('#361', () => {
  it('facet title error', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540
    });

    chart.source(diamonds, {
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      cut: {
        sync: true
      },
      mean: {
        sync: true,
        tickCount: 3
      }
    });
    chart.facet('rect', {
      fields: [ null, 'clarity' ],
      cols: 3, // 超过3个换行
      padding: 10,
      eachView(view, facet) {
        const data = facet.data;
        const dv = new DataView();
        dv.source(data).transform({
          type: 'aggregate',
          fields: [ 'price' ],
          operations: [ 'mean' ],
          as: [ 'mean' ],
          groupBy: [ 'cut' ]
        });
        view.source(dv);
        view.interval().position('cut*mean').color('cut');
      }
    });
    chart.render();

  });
});

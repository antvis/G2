const DataSet = require('@antv/data-set');
const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#318', () => {
  it('when show tooltip, throw error', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const ds = new DataSet();
    const dv = ds.createView('tt');
    dv.source(data);
    dv.transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent'
    });

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      padding: [ 20, 80, 30, 20 ],
      plotBackground: {
        stroke: '#eee',
        fill: '#fbfffb'
      }
    });

    chart.source(dv);

    chart.interval()
      .position('genre*percent')
      .color('genre')
      .size('percent');

    chart.render();
    expect(() => {
      chart.showTooltip({ x: 328, y: 100 });
    }).not.to.throw();
  });
});

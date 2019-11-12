const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
document.body.appendChild(div);

describe('test schema', () => {
  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    animate: false,
    padding: [ 20, 80, 60, 80 ]
  });

  it('test candle', () => {
    const data = [{ x: 'a', y: [ 10, 20, 15, 25 ] }, { x: 'b', y: [ 20, 10, 30, 18 ] }];
    chart.source(data);
    chart.schema().position('x*y').shape('candle');
    chart.render();
    const firstPath = chart.get('viewContainer')
      .getFirst()
      .getFirst()
      .attr('path');
    expect(firstPath.length).equal(9);
  });

  it('test box', () => {
    chart.clear();
    const data = [{ x: 'a', y: [ 10, 15, 20, 25, 40 ] }, { x: 'b', y: [ 10, 18, 20, 30, 42 ] }];
    chart.source(data);
    chart.schema().position('x*y').shape('box');
    chart.render();
    const firstPath = chart.get('viewContainer').getFirst()
      .getFirst()
      .attr('path');
    expect(firstPath.length).equal(16);
  });

  it('test dodge', () => {
    chart.clear();
    const data = [
      { x: 'a', y: [ 10, 20, 15, 25 ], type: '1' },
      { x: 'b', y: [ 20, 10, 30, 18 ], type: '1' },

      { x: 'a', y: [ 15, 20, 25, 45 ], type: '2' },
      { x: 'b', y: [ 10, 30, 20, 58 ], type: '2' }
    ];

    chart.source(data);
    const geom = chart.schemaDodge().position('x*y')
      .shape('candle')
      .color('type');
    chart.render();

    expect(geom.getSize()).equal(42.5);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
document.body.appendChild(div);

describe('test point chart', () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      x: parseInt(Math.random() * 100),
      y: Math.random() * 100,
      type: parseInt(Math.random() * 10).toString()
    });
  }

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    animate: false
  });

  chart.source(data, {
    '..y': {
      type: 'linear',
      min: 0,
      max: 0
    }
  });
  it('multiple points', () => {
    chart.point().position('x*y').color('type');
    chart.render();
  });

  it('stack points', () => {
    chart.clear();
    chart.pointStack().position('x*y')
      .color('type');
    chart.render();
    expect(chart.get('viewContainer').getFirst().getCount()).equal(data.length);
  });

  it('has null', () => {
    chart.clear();
    const arr = [
      { x: 1, y: 1 },
      { x: 1, y: null }
    ];
    chart.source(arr);
    chart.point().position('x*y');
    chart.render();
    expect(chart.get('viewContainer').getFirst().getCount()).equal(1);
  });

  it('one dim', () => {
    chart.clear();
    chart.point().position('type*..y').color('type');
    chart.render();
  });
  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });

});

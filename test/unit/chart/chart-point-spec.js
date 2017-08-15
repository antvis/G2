const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
document.body.appendChild(div);

describe('test point chart', function() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      x: Math.random() * 100,
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
  xit('multiple points', function() {
    chart.point().position('x*y').color('type');
    chart.render();
  });
  xit('one dim', function() {
    chart.clear();
    chart.point().position('type*..y').color('type');
    chart.render();
  });
  it('destroy', function() {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });

});

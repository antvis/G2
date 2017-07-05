const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
div.id = 'cchart';
document.body.appendChild(div);

describe('test chart', function() {
  const chart = new Chart({
    container: div,
    width: 800,
    height: 500,
    padding: [ 0, 50, 20, 50 ]
  });
  chart.scale({
    b: {
      min: 0,
      max: 10
    }
  });
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];
  it('init', function() {
    expect(chart.get('width')).equal(800);
    expect(chart.get('height')).equal(500);
  });

  it('plot test', function() {
    expect(chart.get('plotRange').tl).eqls({ x: 50, y: 0 });
    expect(chart.get('plotRange').br).eqls({ x: 750, y: 480 });
  });

  it('method', function() {
    chart.source(data);
    expect(chart.get('data').length).equal(6);
    const point = chart.point().position('a*b').color('c');
    expect(point.get('attrOptions').position.field).equal('a*b');
  });

  it('render', function() {
    chart.render();
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(6);
  });

  it('change data', function() {

  });

  it('clear', function() {
    chart.clear();
    expect(chart.get('geoms').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
  });

  it('forceFit', function() {

  });

  it('destroy', function() {
    chart.destroy();
    expect(div.childNodes.length).equal(0);
  });

});

describe('test chart with views', function() {

});

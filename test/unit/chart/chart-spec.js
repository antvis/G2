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
    const data = [
      { a: 1, b: 2, c: '1' },
      { a: 3, b: 2, c: '2' }
    ];
    chart.changeData(data);
    expect(chart.get('data').length).equal(2);
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(2);
  });

  it('clear', function() {
    chart.clear();
    expect(chart.get('geoms').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
  });

  it('forceFit', function() {

  });

  it('changeSize', function() {

  });

  it('destroy', function() {
    chart.destroy();
    expect(div.childNodes.length).equal(0);
  });

});

describe('test chart with views', function() {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },
      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];
  it('init', function() {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: 'cchart'
    });
    expect(div.childNodes.length).equal(1);
  });
  it('add view', function() {
    const v1 = chart.view();
    v1.source(data);
    v1.line().position('a*b').color('c');
    expect(chart.get('views').length).equal(1);
    expect(chart.get('viewContainer').getCount()).equal(1);
  });
  it('render', function() {
    chart.render();
    const v1 = chart.get('views')[0];
    expect(v1.get('viewContainer').getFirst().getCount()).equal(2);
  });

  it('clear', function() {
    chart.clear();
    expect(chart.get('views').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('test chart width filter', function() {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' }
  ];
  let chart;
  it('init filter', function() {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: 'cchart'
    });

    chart.filter('genre', function(genre) {
      return genre === 'Sports';
    });

    const rst = chart.execFilter(data);
    expect(rst.length).equal(1);
  });
  it('change fitler', function() {
    chart.filter('genre', function(genre) {
      return genre !== 'Sports';
    });
    const rst = chart.execFilter(data);
    expect(rst.length).equal(data.length - 1);
  });

  it('combine', function() {
    chart.filter('sold', function(sold) {
      return sold > 200;
    });
    const rst = chart.execFilter(data);
    expect(rst.length).equal(1);
  });

  it('clear', function() {
    chart.clear();
    const rst = chart.execFilter(data);
    expect(rst.length).equal(data.length);
  });

});

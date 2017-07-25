const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const { DomUtil } = require('@ali/g');

const div = document.createElement('div');
div.id = 'cchart';
document.body.appendChild(div);

describe('test chart', function() {
  const chart = new Chart({
    container: div,
    width: 800,
    height: 500,
    padding: [ 0, 50, 20, 50 ],
    animate: false
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

  it('changeSize', function() {
    chart.changeSize(500, 500);
    expect(chart.get('plotRange').tl).eqls({ x: 50, y: 0 });
    expect(chart.get('plotRange').br).eqls({ x: 450, y: 480 });
    expect(chart.get('canvas').get('width')).equal(500);
  });

  it('forceFit', function() {
    chart.forceFit();
    expect(chart.get('canvas').get('width')).equal(DomUtil.getWidth(div));
  });

  it('clear', function() {
    chart.clear();
    expect(chart.get('geoms').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
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
      padding: 50,
      container: 'cchart',
      animate: false
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

  it('change size', function() {
    const v1 = chart.get('views')[0];
    let viewRange = v1.getViewRegion();
    expect(viewRange.start).eqls({ x: 50, y: 450 });
    expect(viewRange.end).eqls({ x: DomUtil.getWidth(div) - 50, y: 50 });

    chart.changeSize(500, 500);
    viewRange = v1.getViewRegion();
    expect(viewRange.end).eqls({ x: 450, y: 50 });
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
      container: 'cchart',
      animate: false
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

describe('chart forceFit', function() {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  it('init filter', function() {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: 'cchart',
      animate: false
    });
    expect(chart.get('canvas').get('width')).equal(DomUtil.getWidth(div));
    chart.source(data);
    chart.line().position('a*b').color('c');
    chart.render();
  });

  it('window resize', function(done) {
    div.style.width = '500px';
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    setTimeout(function() {
      expect(chart.get('canvas').get('width')).equal(500);
      done();
    }, 300);
  });

  it('multiple views', function() {
    div.style.width = 'auto';
    chart.clear();
    const v1 = chart.view({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0.5,
        y: 0.5
      }
    });
    v1.source(data);
    v1.line().position('a*b').color('c');

    const v2 = chart.view({
      start: {
        x: 0.5,
        y: 0.5
      },
      end: {
        x: 1,
        y: 1
      }
    });
    v2.source(data);
    v2.line().position('a*b').color('c');
    chart.render();
    const viewRange1 = v1.getViewRegion();
    expect(viewRange1.end).eqls({ x: 250, y: 20 });

  });
});

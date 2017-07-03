const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const View = require('../../../src/chart/view');
const Coord = require('../../../src/coord/index');

const div = document.createElement('div');
div.id = 'cview';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'cview',
  width: 500,
  height: 500
});

const coord = new Coord.Rect({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});

describe('test view', function() {
  const view = new View({
    viewContainer: canvas,
    coord,
    options: {
      scales: {
        e: {
          type: 'cat',
          values: [ 'a', 'b', 'c' ]
        }
      }
    }
  });

  it('init', function() {
    expect(view.get('scaleController')).not.equal(null);
  });

  it('options', function() {
    expect(view.get('options').scales).not.equal(undefined);
  });

  xit('geom method', function() {
    expect(view.line).to.be.a('function');
    expect(view.point).to.be.a('function');
  });

  it('scale', function() {
    view.scale('a', {
      type: 'linear',
      min: 0
    });
    expect(view.get('options').scales.a.min).equal(0);
  });

  it('source', function() {
    const data = [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 }
    ];
    view.source(data);
    expect(view.get('data')).equal(data);
  });

  it('render', function() {

  });

  it('clear', function() {

  });

  it('change data', function() {

  });
});

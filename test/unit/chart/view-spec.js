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
  const group = canvas.addGroup();
  const view = new View({
    viewContainer: group,
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

  it('geom method', function() {
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
      { a: 2, b: 5 },
      { a: 3, b: 4 }
    ];
    view.source(data);
    expect(view.get('data')).equal(data);
  });

  it('add geom', function() {
    const line = view.line().position('a*b');
    expect(view.get('geoms').length).equal(1);
    expect(view.get('geoms')[0]).equal(line);
  });

  it('render', function() {
    view.render();
    expect(group.getCount()).equal(1);
    const ascale = view.get('scales').a;
    expect(ascale.max).equal(3);
    const path = group.getFirst().getFirst();
    expect(path.get('type')).equal('path');
    expect(path.attr('path').length).eqls(3);
    canvas.draw();
  });

  it('change data', function() {
    const data = [
      { a: 1, b: 2 },
      { a: 2, b: 5 },
      { a: 3, b: 2 },
      { a: 4, b: 1 }
    ];

    view.changeData(data);
    const ascale = view.get('scales').a;
    expect(ascale.max).equal(4);
    expect(group.getCount()).equal(1);
    const path = group.getFirst().getFirst();
    expect(path.get('type')).equal('path');
    expect(path.attr('path').length).eqls(4);
    canvas.draw();
  });

  xit('clear', function() {
    view.clear();
    expect(view.get('geoms').length).equal(0);
    expect(group.getCount()).equal(0);
  });

});

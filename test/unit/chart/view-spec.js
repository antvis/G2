const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const View = require('../../../src/chart/view');

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
    x: 80,
    y: 420
  },
  end: {
    x: 420,
    y: 80
  }
});

describe('test view', function() {
  const group = canvas.addGroup();
  const view = new View({
    viewContainer: group,
    canvas: canvas,
    coord,
    options: {
      scales: {
        e: {
          type: 'cat',
          values: [ 'a', 'b', 'c' ]
        }
      },
      axes: {
        a: {
          title: null
        },
        b: {
          label: {
            autoRotate: false
          },
          title: {
            offset: -1,
            position: 'end',
            autoRotate: false,
            textStyle: {
              fontSize: 16,
              fill: 'red',
              textBaseline: 'bottom'
            }
          }
        }
      }
    }
  });

  it('init', function() {
    expect(view.get('scaleController')).not.equal(null);
    expect(view.get('axisController')).not.equal(null);
  });

  it('options', function() {
    expect(view.get('options').scales).not.equal(undefined);
    expect(view.get('options').axes).not.equal(undefined);
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

  it('axis', function() {
    view.axis('a', {
      title: {
        textStyle: {
          fill: 'red'
        }
      }
    });
    expect(view.get('options').axes.a.title).not.to.be.null;
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

  it('clear', function() {
    view.clear();
    expect(view.get('geoms').length).equal(0);
    expect(group.getCount()).equal(0);
  });

  it('destroy', function() {
    view.destroy();
    expect(view.destroyed).equal(true);
    group.remove();
    canvas.draw();
  });
});

describe('test view all options', function() {
  const group = canvas.addGroup();
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];
  const view = new View({
    viewContainer: group,
    start: {
      x: 0,
      y: 500
    },
    end: {
      x: 500,
      y: 0
    },
    data,
    options: {
      coord: {
        type: 'rect',
        actions: [
          [ 'transpose' ]
        ]
      },
      geoms: [
        { type: 'line', position: 'a*b', color: 'c' },
        { type: 'point', position: 'a*b', color: 'c' }
      ]
    }
  });
  it('init', function() {
    expect(view.get('coordController').actions.length).equal(1);
  });
  it('render', function() {
    view.render();
    expect(view.get('geoms').length).equal(2);
    const line = view.get('geoms')[0];
    expect(line.get('attrOptions').position.field).eqls('a*b');
    canvas.draw();
  });
  it('clear', function() {
    view.clear();
    expect(view.get('geoms').length).equal(0);
  });
  it('change', function() {
    view.changeOptions({
      coord: {
        type: 'rect'
      },
      geoms: [
        { type: 'line', position: 'a*b', color: 'c' }
      ]
    });
    expect(view.get('geoms').length).equal(1);
    view.render();
    canvas.draw();
  });

});

const expect = require('chai').expect;
const Animate = require('../../../src/animate/index');
const Coord = require('@antv/coord/lib/index');
const View = require('../../../src/chart/view');
const { Canvas } = require('../../../src/renderer');

const div = document.createElement('div');
div.id = 'animateCanvas';
document.body.appendChild(div);

const coord = new Coord.Cartesian({
  start: {
    x: 0,
    y: 300
  },
  end: {
    x: 600,
    y: 0
  }
});

function addElements(count, container, backContainer) {
  for (let i = 0; i < count; i++) {
    const shape = container.addShape('circle', {
      attrs: {
        x: 300 * Math.random(),
        y: 300 * Math.random(),
        r: 30 * Math.random(),
        fill: 'red'
      }
    });

    shape._id = 'view1-circle' + i;
    shape.name = 'point';
    shape.set('coord', coord);
  }
  for (let j = 0; j < count; j++) {
    const shape = backContainer.addShape('path', {
      attrs: {
        path: [
          [ 'M', 300 * Math.random(), 300 * Math.random() ],
          [ 'L', 100, 0 ],
          [ 'C', 213, 323, 22, 10, 34, 90 ]
        ],
        fill: 'red'
      }
    });
    shape._id = 'view1-path' + j;
    shape.name = 'axis-label';
    shape.set('coord', coord);
  }
}

describe('Aniamte', () => {
  const canvas = new Canvas({
    containerId: 'animateCanvas',
    width: 600,
    height: 300
  });
  let container = canvas.addGroup();
  let backContainer = canvas.addGroup();
  const view = new View({
    middlePlot: container,
    canvas,
    backPlot: backContainer,
    _id: 'view1'
  });

  it('count', () => {
    addElements(10, container, backContainer);
    expect(canvas.get('children').length).eql(2);
    Animate.execAnimation(view);
    expect(Object.keys(canvas.get('view1caches')).length).eql(20);
    canvas.clear();
    expect(canvas.get('children').length).eql(0);
    container = canvas.addGroup();
    backContainer = canvas.addGroup();
    addElements(5, container, backContainer);
    view.set('middlePlot', container);
    view.set('backPlot', backContainer);
    expect(canvas.get('children').length).eql(2);
    Animate.execAnimation(view, true);
    expect(Object.keys(canvas.get('view1caches')).length).eql(10);
  });
});

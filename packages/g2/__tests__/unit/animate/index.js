import { expect } from 'chai';
import { getCoordinate } from '@antv/coord';
import { Canvas } from '@antv/g';
import Animate from '../../../src/animate/index';
import { View } from '../../../src/';

const div = document.createElement('div');
div.id = 'animateCanvas';
document.body.appendChild(div);

const Cartesian = getCoordinate('cartesian');
const coord = new Cartesian({
  start: {
    x: 0,
    y: 300,
  },
  end: {
    x: 600,
    y: 0,
  },
});

function addElements(count, container, backContainer) {
  for (let i = 0; i < count; i++) {
    const shape = container.addShape('circle', {
      attrs: {
        x: 300 * Math.random(),
        y: 300 * Math.random(),
        r: 30 * Math.random(),
        fill: 'red',
      },
    });
    shape.id = 'view1-circle' + i;
    shape.name = 'point';
    shape.set('coord', coord);
  }
  for (let j = 0; j < count; j++) {
    const shape = backContainer.addShape('path', {
      attrs: {
        path: [['M', 300 * Math.random(), 300 * Math.random()], ['L', 100, 0], ['C', 213, 323, 22, 10, 34, 90]],
        fill: 'red',
      },
    });
    shape.id = 'view1-path' + j;
    shape.name = 'axis-label';
    shape.set('coord', coord);
  }
}

describe('Aniamte', function() {
  const canvas = new Canvas({
    containerId: 'animateCanvas',
    width: 600,
    height: 300,
  });
  let container = canvas.addGroup();

  const view = new View({
    canvas,
    container,
    width: 200,
    height: 200,
    id: 'view1',
  });
  it('count', function() {
    addElements(10, view.get('panelGroup'), view.get('backgroundGroup'));
    expect(canvas.get('children').length).eql(1); // container|
    expect(container.get('children').length).eql(3); // backgroundGroup / panelGroup / frontgroundGroup
    Animate.execAnimation(view);
    expect(Object.keys(canvas.get('view1caches')).length).eql(20);

    canvas.clear();
    container = canvas.addGroup();
    view.set('container', container);
    view.init();

    expect(canvas.get('children').length).eql(1);
    addElements(5, view.get('panelGroup'), view.get('backgroundGroup'));
    expect(canvas.get('children').length).eql(1);
    Animate.execAnimation(view, true);
    expect(Object.keys(canvas.get('view1caches')).length).eql(10);
  });
});

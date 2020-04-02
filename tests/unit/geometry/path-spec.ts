import { getCoordinate } from '@antv/coord';
import Path from '../../../src/geometry/path';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Path', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 300,
    height: 300,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });

  let path;

  it('connectNulls is false.', () => {
    const data = [
      { x: 'Jan.', y: 18.9 },
      { x: 'Feb.', y: 28.8 },
      { x: 'Mar.', y: 39.3 },
      { x: 'Apr.' },
      { x: 'Jun.', y: 20.3 },
      { x: 'Jul.', y: 24 },
      { x: 'Aug.', y: 35.6 },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
    };
    path = new Path({
      coordinate: rectCoord,
      data,
      scales,
      container: canvas.addGroup(),
    });

    path.position('x*y').size(4);
    path.init({
      theme: Theme,
    });
    path.paint();
    canvas.draw();

    expect(path.shapeType).toBe('line');
    expect(path.connectNulls).toBe(false);

    expect(path.container.get('children').length).toBe(1);

    const elements = path.elements;
    expect(elements.length).toBe(1);

    const model = elements[0].model;
    expect(model.points.length).toBe(7);

    const elementData = elements[0].data;
    expect(elementData).toEqual([
      { x: 'Jan.', y: 18.9 },
      { x: 'Feb.', y: 28.8 },
      { x: 'Mar.', y: 39.3 },
      { x: 'Apr.' },
      { x: 'Jun.', y: 20.3 },
      { x: 'Jul.', y: 24 },
      { x: 'Aug.', y: 35.6 },
    ]);
  });

  it('connectNulls is true,', () => {
    canvas.clear();

    const data = [
      { x: 'Jan.', y: 18.9 },
      { x: 'Feb.', y: 28.8 },
      { x: 'Mar.', y: 39.3 },
      { x: 'Apr.' },
      { x: 'Jun.' },
      { x: 'Jul.', y: 24 },
      { x: 'Aug.', y: 35.6 },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
    };
    path = new Path({
      coordinate: rectCoord,
      data,
      scales,
      container: canvas.addGroup(),
      connectNulls: true,
    });

    path.position('x*y').size(4);
    path.init({
      theme: Theme,
    });
    path.paint();
    canvas.draw();

    expect(path.connectNulls).toBe(true);
    expect(path.container.get('children').length).toBe(1);

    const elements = path.elements;
    expect(elements.length).toBe(1);

    const model = elements[0].model;
    expect(model.points.length).toBe(7);
  });

  it('update', () => {
    const prePath = path.elements[0].shape.attr('path');
    path.update({
      coordinate: new CartesianCoordinate({
        start: { x: 0, y: 300 },
        end: { x: 200, y: 0 },
      }),
    });

    path.animate(false).paint();
    canvas.draw();

    const curPath = path.elements[0].shape.attr('path');
    expect(prePath.toString()).not.toBe(curPath.toString());
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

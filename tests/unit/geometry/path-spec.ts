import { getCoordinate } from '@antv/coord';
import Path from '../../../src/geometry/path';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import Theme from '../../util/theme';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');

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
    path = new Path({
      coordinate: rectCoord,
      data: [
        { x: 'Jan.', y: 18.9 },
        { x: 'Feb.', y: 28.8 },
        { x: 'Mar.', y: 39.3 },
        { x: 'Apr.' },
        { x: 'Jun.', y: 20.3 },
        { x: 'Jul.', y: 24 },
        { x: 'Aug.', y: 35.6 },
      ],
      container: canvas.addGroup(),
      theme: Theme,
    });

    path.position('x*y').size(4);
    path.initial();
    path.paint();
    canvas.draw();

    expect(path.shapeType).toBe('line');
    expect(path.connectNulls).toBe(false);

    expect(path.container.get('children').length).toBe(1);

    const elements = path.elements;
    expect(elements.length).toBe(1);

    const model = elements[0].model;
    expect(model.points.length).toBe(2);

    const data = elements[0].data;
    expect(data).toEqual([
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
    path.connectNulls = true;
    path.updateData([
      { x: 'Jan.', y: 18.9 },
      { x: 'Feb.', y: 28.8 },
      { x: 'Mar.', y: 39.3 },
      { x: 'Apr.' },
      { x: 'Jun.' },
      { x: 'Jul.', y: 24 },
      { x: 'Aug.', y: 35.6 },
    ]);

    path.paint();
    canvas.draw();
    expect(path.container.get('children').length).toBe(1);

    const elements = path.elements;
    expect(elements.length).toBe(1);

    const model = elements[0].model;
    expect(model.points.length).toBe(1);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

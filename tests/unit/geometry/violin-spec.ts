import { getCoordinate } from '@antv/coord';
import Violin from '../../../src/geometry/violin';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale } from '../../util/scale';
import data from '../../data/violin';
import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Violin', () => {
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
  const scales = {
    x: createScale('x', data),
    y: createScale('y', data),
    type: createScale('type', data),
    size: createScale('size', data),
  };

  it('draw violin', () => {
    const violin = new Violin({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
    });

    violin.position('x*y');

    violin.init({ theme: Theme });

    violin.color('type');
    violin
      .adjust({
        type: 'dodge',
        marginRatio: 1 / 32,
      })
      .size('size');

    violin.paint();
    canvas.draw();
    expect(violin.shapeType).toBe('violin');
    // @ts-ignore
    expect(violin.generatePoints).toBe(true);

    /**
     * 关键点，大致如下:
     *    *
     *  *   *
     *  *   *
     *    *
     */
    expect(violin.elements[0].getModel().points.length).toBe(data[0].y.length * 2);
    expect(violin.elements[1].getModel().points.length).toBe(data[1].y.length * 2);

    violin.destroy();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Schema from '../../../src/geometry/schema';
import '../../../src/geometry/shape/schema/box';
import '../../../src/geometry/shape/schema/candle';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const LinearScale = getScale('linear');
const Theme = getTheme('default');

describe('Schema', () => {
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

  it('draw box', () => {
    const data = [
      {
        x: 'x',
        y: [1, 9, 16, 22, 24],
      },
    ];

    const scaleDefs = {
      x: {
        range: [0.5, 0.75],
      },
    };
    const scales = {
      x: createScale('x', data, scaleDefs),
      y: createScale('y', data, scaleDefs),
      box: createScale('box', data, scaleDefs),
    };
    const schema = new Schema({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
      scaleDefs,
    });

    schema.position('x*y').shape('box');
    schema.init({
      theme: Theme,
    });
    schema.paint();
    canvas.draw();

    expect(schema.shapeType).toBe('schema');
    // @ts-ignore
    expect(schema.generatePoints).toBe(true);

    const elements = schema.elements;
    expect(elements.length).toBe(1);

    expect(schema.dataArray[0][0].points.length).toBe(14);
    // @ts-ignore
    expect(schema.defaultSize).toBe(0.5);
  });

  it('draw candle', () => {
    canvas.clear();
    const data = [
      { x: 1, y: [0, 1, 2, 3] },
      { x: 2, y: [1, 2, 3, 4] },
      { x: 3, y: [0, 4] },
    ];

    const scales = {
      x: new LinearScale({
        field: 'x',
        min: 0,
        values: [0, 1, 2, 3, 4, 5],
        max: 10,
      }),
      y: createScale('y', data),
      candle: createScale('candle', data),
    };
    const schema = new Schema({
      data,
      container: canvas.addGroup(),
      coordinate: rectCoord,
      scales,
    });

    schema.position('x*y').shape('candle');
    schema.init({
      theme: Theme,
    });
    schema.paint();
    canvas.draw();

    expect(schema.elements.length).toBe(3);
    expect(schema.dataArray[0][0].points.length).toBe(8);
    // @ts-ignore
    expect(schema.defaultSize).toBe(1 / 10 / 2);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

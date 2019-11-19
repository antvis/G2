import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Schema from '../../../src/geometry/schema';
import Theme from '../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');
const LinearScale = getScale('linear');

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
  const data = [
    {
      x: 'x',
      y: [1, 9, 16, 22, 24],
    },
  ];

  it('draw box', () => {
    const schema = new Schema({
      data,
      container: canvas.addGroup(),
      theme: Theme,
      coordinate: rectCoord,
      scaleDefs: {
        x: {
          range: [0.5, 0.75],
        },
      },
    });

    schema.position('x*y').shape('box');
    schema.init();
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
    const scaleX = new LinearScale({
      field: 'x',
      min: 0,
      values: [0, 1, 2, 3, 4, 5],
      max: 10,
    });
    const schema = new Schema({
      data: [
        { x: 1, y: [0, 1, 2, 3] },
        { x: 2, y: [1, 2, 3, 4] },
        { x: 3, y: [0, 4] },
      ],
      container: canvas.addGroup(),
      theme: Theme,
      coordinate: rectCoord,
      scales: {
        x: scaleX,
      },
    });

    schema.position('x*y').shape('candle');
    schema.init();
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

import { getCoordinate } from '@antv/coord';
import Polygon from '../../../src/geometry/polygon';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Polygon', () => {
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
    { city: '杭州', sale: 100, category: '电脑' },
    { city: '广州', sale: 30, category: '电脑' },
    { city: '上海', sale: 200, category: '鼠标' },
    { city: '呼和浩特', sale: 10, category: '鼠标' },
  ];

  const scales = {
    city: createScale('city', data),
    sale: createScale('sale', data),
    category: createScale('category', data),
  };

  it('draw polygon', () => {
    const polygon = new Polygon({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
    });

    polygon.position('city*category').color('sale');
    polygon.init({
      theme: Theme,
    });
    polygon.paint();
    canvas.draw();

    expect(polygon.shapeType).toBe('polygon');
    // @ts-ignore
    expect(polygon.generatePoints).toBe(true);

    const elements = polygon.elements;
    expect(elements.length).toBe(4);

    expect(polygon.dataArray[0][0].points.length).toBe(4);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

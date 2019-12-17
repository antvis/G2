import { getCoordinate } from '@antv/coord';
import Area from '../../../src/geometry/area';
import Theme from '../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale } from '../../util/scale';

import 'jest-extended';
import Geometry from '../../../src/geometry/base';

const CartesianCoordinate = getCoordinate('rect');

describe('Area', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });
  const data = [
    { year: '1994', value: 100, type: 'a' },
    { year: '1995', value: 90, type: 'a' },
    { year: '1996', value: 120, type: 'a' },
    { year: '1994', value: 120, type: 'b' },
    { year: '1995', value: 65, type: 'b' },
    { year: '1996', value: 10, type: 'b' },
  ];
  const scales = {
    year: createScale('year', data),
    value: createScale('value', data),
    type: createScale('type', data),
  };

  let area: Geometry;

  it('constructor', () => {
    area = new Area({
      data,
      scales,
      container: canvas.addGroup(),
      theme: Theme,
      coordinate: rectCoord,
    });

    // @ts-ignore
    expect(area.generatePoints).toBe(true);
    expect(area.sortable).toBe(true);
    // @ts-ignore
    expect(area.connectNulls).toBe(false);
  });

  it('draw', () => {
    area
      .position('year*value')
      .color('type')
      .adjust('stack');

    area.init();
    area.paint();

    const elements = area.elements;
    expect(elements.length).toBe(2);
    // check shape point
    // @ts-ignore
    expect(elements[0].model.points[0]).toBeArrayOfSize(2);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

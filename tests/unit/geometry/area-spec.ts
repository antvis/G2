import { getCoordinate } from '@antv/coord';
import Area from '../../../src/geometry/area';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale } from '../../util/scale';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

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

  let area: Area;

  it('constructor', () => {
    area = new Area({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
    });

    // @ts-ignore
    expect(area.generatePoints).toBe(true);
    expect(area.sortable).toBe(true);
    expect(area.startOnZero).toBe(true);
    // @ts-ignore
    expect(area.connectNulls).toBe(false);
  });

  it('draw', () => {
    area
      .position('year*value')
      .color('type')
      .adjust('stack');

    area.init({
      theme: Theme,
    });
    area.paint();

    const elements = area.elements;
    expect(elements.length).toBe(2);
    // check shape point
    // @ts-ignore
    expect(elements[0].model.points[0]).toBeArrayOfSize(2);
  });

  it('startOnZero = false', () => {
    const newData = [
      { month: 'Jan.', value: 6.06 },
      { month: 'Feb.', value: 82.2 },
      { month: 'Mar.', value: -22.11 },
      { month: 'Apr.', value: 21.53 },
      { month: 'May.', value: -21.74 },
      { month: 'Jun.', value: 73.61 },
      { month: 'Jul.', value: 53.75 },
      { month: 'Aug.', value: 60.32 },
    ];
    const newScales = {
      month: createScale('month', newData),
      value: createScale('value', newData),
    };
    area = new Area({
      data: newData,
      scales: newScales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
      startOnZero: false,
      sortable: false,
    });

    area
      .position('month*value');
    area.init({
      theme: Theme,
    });
    area.paint();

    canvas.draw()
    expect(area.sortable).toBe(false);
    expect(area.startOnZero).toBe(false);
    expect(area.elements[0].shape.attr('path')[15][2]).toBe(180);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

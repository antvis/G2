import { flatten } from '@antv/util';

import { getCoordinate } from '@antv/coord';
import IntervalLabel from '../../../../../src/geometry/label/interval';
import Polygon from '../../../../../src/geometry/polygon';
import { getTheme } from '../../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../../util/dom';

import 'jest-extended';
import { createScale } from '../../../../util/scale';

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
    city: createScale('city', data, {
      city: {
        range: [0.125, 0.875],
      },
    }),
    sale: createScale('sale', data),
    category: createScale('category', data, {
      category: {
        range: [0.25, 0.75],
      },
    }),
  };

  const polygon = new Polygon({
    data,
    scales,
    container: canvas.addGroup(),
    labelsContainer: canvas.addGroup(),
    coordinate: rectCoord,
  });

  polygon.position('city*category').color('sale').label('sale', {
    offset: 0,
  });
  polygon.init({
    theme: Theme,
  });
  polygon.paint();
  // 生成映射数据
  // @ts-ignore
  const beforeMappingData = polygon.beforeMappingData;
  // @ts-ignore
  const dataArray = polygon.beforeMapping(beforeMappingData);

  let mappingArray = [];
  for (const eachGroup of dataArray) {
    // @ts-ignore
    const mappingData = polygon.mapping(eachGroup);
    mappingArray.push(mappingData);
  }
  mappingArray = flatten(mappingArray);

  it('labels', () => {
    const gLabels = new IntervalLabel(polygon);
    const labelItems = gLabels.getLabelItems(mappingArray);
    expect(labelItems[0].x).toBe(37.5);
    expect(labelItems[0].y).toBe(225);

    expect(labelItems[1].x).toBe(112.5);
    expect(labelItems[1].y).toBe(225);

    expect(labelItems[2].x).toBe(187.5);
    expect(labelItems[2].y).toBe(75);

    expect(labelItems[3].x).toBe(262.5);
    expect(labelItems[3].y).toBe(75);
  });
});

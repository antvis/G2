import { Color, Shape } from '@antv/attr';
import { getScale } from '@antv/scale';
import { getMappingValue } from '../../../src/util/attr';

const Category = getScale('category');
const Linear = getScale('linear');

const scaleCat = new Category({
  field: 'type',
  values: ['a', 'b', 'c', 'd'],
});

const scaleLinear = new Linear({
  field: 'age',
  min: 0,
  max: 10,
});

const color = new Color({
  names: [],
  scales: [scaleCat, scaleLinear],
  callback(v1) {
    return v1;
  },
});

const shape = new Shape({
  names: [],
  scales: [scaleCat],
  values: ['s1', 's2'],
});

describe('util attr', () => {
  it('getMappingValue', () => {
    expect(getMappingValue(color, 'a', 'def')).toBe('a');
    expect(getMappingValue(color, 'xxx', 'def')).toBe('xxx');

    expect(getMappingValue(shape, 'b', 'def')).toBe('s2');
    expect(getMappingValue(shape, 'xxx', 'def')).toBe('def');

    expect(getMappingValue(undefined, 'a', 'def')).toBe('def');
  });
});

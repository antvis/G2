import { getScale } from '../../../src/dependents';
import { getNormalizedValue } from '../../../src/util/annotation';
import { near } from '../../util/math';

const Linear = getScale('linear');
const Category = getScale('cat');

describe('util annotation', () => {
  it('getNormalizedValue cat', () => {
    const scale = new Category({
      values: ['东北', '华北', '华东', '华中', '华南', '西部'],
    });

    expect(getNormalizedValue('start', scale)).toEqual(0);
    expect(getNormalizedValue('end', scale)).toEqual(1);
    expect(getNormalizedValue('mean', scale)).toEqual(0.5);
    expect(getNormalizedValue('median', scale)).toEqual(0.5);
    expect(getNormalizedValue('min', scale)).toEqual(0);
    expect(getNormalizedValue('max', scale)).toEqual(1);
    expect(getNormalizedValue('华东', scale)).toEqual(0.4);
  });

  it('getNormalizedValue linear', () => {
    const scale = new Linear({
      min: 0,
      max: 100,
      values: [0, 1, 2, 3, 10, 10, 6, 7, 8, 9],
    });

    expect(getNormalizedValue('start', scale)).toEqual(0);
    expect(getNormalizedValue('end', scale)).toEqual(1);
    expect(near(getNormalizedValue('mean', scale), 0.055999999999999994)).toBe(true);
    expect(getNormalizedValue('median', scale)).toEqual(0.065);
    expect(getNormalizedValue('min', scale)).toEqual(0);
    expect(getNormalizedValue('max', scale)).toEqual(1);
    expect(getNormalizedValue(2, scale)).toEqual(0.02);
  });
});

import { group } from '../../../../src/geometry/util/group-data';
import { CITY_SALE } from '../../../util/data';

describe('Group', () => {
  it('group by fields', () => {
    const result = group(CITY_SALE, [ 'category' ]);
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(4);
    expect(result[1].length).toBe(4);
    expect(result[0][0].category).toBe('电脑');
    expect(result[1][0].category).toBe('鼠标');

  });

  it('group with appendConditions', () => {
    const result = group(CITY_SALE, ['category'], { category: [ '鼠标', '电脑' ] });
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(4);
    expect(result[1].length).toBe(4);
    expect(result[0][0].category).toBe('鼠标');
    expect(result[1][0].category).toBe('电脑');
  });
});

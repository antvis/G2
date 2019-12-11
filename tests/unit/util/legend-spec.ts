import { DIRECTION } from '../../../src';
import { getLegendLayout } from '../../../src/util/legend';

describe('util legend', () => {
  it('getLegendLayout', () => {
    expect(getLegendLayout(DIRECTION.TOP)).toBe('horizontal');
    expect(getLegendLayout(DIRECTION.TOP_LEFT)).toBe('horizontal');
    expect(getLegendLayout(DIRECTION.TOP_RIGHT)).toBe('horizontal');
    expect(getLegendLayout(DIRECTION.BOTTOM)).toBe('horizontal');
    expect(getLegendLayout(DIRECTION.BOTTOM_LEFT)).toBe('horizontal');
    expect(getLegendLayout(DIRECTION.BOTTOM_RIGHT)).toBe('horizontal');

    expect(getLegendLayout(DIRECTION.LEFT)).toBe('vertical');
    expect(getLegendLayout(DIRECTION.LEFT_TOP)).toBe('vertical');
    expect(getLegendLayout(DIRECTION.LEFT_BOTTOM)).toBe('vertical');
    expect(getLegendLayout(DIRECTION.RIGHT)).toBe('vertical');
    expect(getLegendLayout(DIRECTION.RIGHT_TOP)).toBe('vertical');
    expect(getLegendLayout(DIRECTION.RIGHT_BOTTOM)).toBe('vertical');
  });
});

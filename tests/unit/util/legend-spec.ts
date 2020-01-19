import { DIRECTION } from '../../../src';
import { getLegendItems, getLegendLayout } from '../../../src/util/legend';
import View from '../../../src/chart/view';
import Geometry from '../../../src/geometry/base';
import { Attribute } from '../../../src/dependents';
import { LegendItem } from '../../../src/chart/interface';

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

    // typo
    // @ts-ignore
    expect(getLegendLayout('xxx')).toBe('horizontal');
  });

  it('getLegendItems custom', () => {
    const themeMarker = { spacing: 8, symbol: 'circle', style: { r: 4, fill: 'red' } };
    const userMarker = { style: { r: 5 } };
    const customItems = [
      { name: 'a', value: 'aa', marker: { style: { fill: 'green' } } },
      // @ts-ignore
      { name: 'b', value: 'bb', marker: { symbol: 'square', style: { r: 6 } } },
    ] as LegendItem[];

    const items = getLegendItems(
      undefined, undefined, undefined,
      themeMarker, userMarker, customItems,
    );

    expect(items).toEqual([
      { name: 'a', value: 'aa', marker: { symbol: 'circle', spacing: 8, style: { fill: 'green', r: 5 } } },
      { name: 'b', value: 'bb', marker: { symbol: 'square', spacing: 8, style: { fill: 'red', r: 6 } } },
    ])
  })
});

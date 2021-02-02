import { deepMix } from '@antv/util';
import { Chart, DIRECTION } from '../../../src';
import { LegendItem } from '../../../src/interface';
import { getCustomLegendItems, getLegendItems, getLegendLayout } from '../../../src/util/legend';
import { createDiv } from '../../util/dom';

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

    const items = getCustomLegendItems(themeMarker, userMarker, customItems);

    expect(items).toEqual([
      { name: 'a', value: 'aa', marker: { symbol: 'circle', spacing: 8, style: { fill: 'green', r: 5 } } },
      { name: 'b', value: 'bb', marker: { symbol: 'square', spacing: 8, style: { fill: 'red', r: 6 } } },
    ]);
  });

  it('getLegendItems, userMarker style works', () => {
    const chart = new Chart({
      container: createDiv(),
    });
    chart.data([
      { city: '杭州', value: 10 },
      { city: '广州', value: 10 },
    ]);
    chart.interval().position('city*value').color('city');
    chart.render();

    const geometry = chart.geometries[0];
    const attr = geometry.getGroupAttributes()[0];
    let items = getLegendItems(chart, geometry, attr, {}, {});
    expect(items.length).toBe(2);
    expect(items[0].marker.style.fill).toBe(chart.getTheme().colors10[0]);

    chart.render();
    items = getLegendItems(
      chart,
      geometry,
      attr,
      {},
      {
        symbol: 'hyphen',
        style: {
          lineWidth: 2,
          stroke: 'red',
        },
      }
    );
    expect(items[0].marker.style.stroke).toBe('red');
    expect(items[0].marker.style.lineWidth).toBe(2);
  });

  it('getLegendItems, callback to set color', () => {
    const chart = new Chart({
      container: createDiv(),
    });
    chart.data([
      { city: '杭州', value: 10 },
      { city: '广州', value: 10 },
    ]);
    chart.interval().position('city*value').color('city');
    chart.render();

    const geometry = chart.geometries[0];
    const attr = geometry.getGroupAttributes()[0];
    let items = getLegendItems(chart, geometry, attr, {}, {});
    expect(items.length).toBe(2);
    expect(items[0].marker.style.fill).toBe(chart.getTheme().colors10[0]);

    chart.render();
    items = getLegendItems(
      chart,
      geometry,
      attr,
      {
        style: {
          lineWidth: 4,
        },
      },
      {
        symbol: 'hyphen',
        style: (s) =>
          deepMix({}, s, {
            stroke: 'red',
          }),
      }
    );
    expect(items[0].marker.style.stroke).toBe('red');
    expect(items[0].marker.style.lineWidth).toBe(4);
  });
});

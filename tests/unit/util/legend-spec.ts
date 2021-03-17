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
  it('legend selected', () => {
    const data = [
      { city: '杭州', value: 1654, type: 'year' },
      { city: '杭州', value: 654, type: 'month' },
      { city: '杭州', value: 154, type: 'week' },
      { city: '上海', value: 4400, type: 'year' },
      { city: '上海', value: 400, type: 'month' },
      { city: '上海', value: 100, type: 'week' },
      { city: '深圳', value: 5300, type: 'year' },
      { city: '深圳', value: 2300, type: 'month' },
      { city: '深圳', value: 300, type: 'week' },
    ];
    const chart = new Chart({
      container: createDiv(),
    });
    chart.data(data);
    chart.interval().position('city*value').color('type', ['green', 'yellow', 'red']).adjust('stack');
    chart.legend('type', {
      selected: {
        year: true,
        month: false,
      },
    });
    chart.render();
    const geometry = chart.geometries[0];
    const { filters } = chart.getOptions();
    const attr = geometry.getGroupAttributes()[0];
    let items = getLegendItems(chart, geometry, attr, {}, {});
    expect(filters.type).toBeDefined();
    expect(items.length).toBe(3);
    expect(items[0].unchecked).toBeFalsy();
    expect(items[0].marker.style.fill).toBe('green');
    expect(items[1].unchecked).toBeTruthy();
    expect(items[1].marker.style.fill).toBe('yellow');
    expect(items[2].unchecked).toBeFalsy();
    expect(items[2].marker.style.fill).toBe('red');
    expect(chart.getData().length).toBe(6);
  });
});

import { DIRECTION } from '../../../src';
import { getCoordinate, getScale } from '../../../src/dependents';
import { getCircleGridItems, getGridThemeCfg, getLineGridItems, showGrid } from '../../../src/util/grid';

describe('util grid', () => {
  it('getGridThemeCfg', () => {
    expect(getGridThemeCfg({ components: { axis: { left: { grid: 'test' } } } }, DIRECTION.LEFT)).toBe('test');
    expect(getGridThemeCfg({ components: { axis: { left: { grid: 'test' } } } }, DIRECTION.RIGHT)).toEqual({});
  });

  it('showGrid', () => {
    expect(showGrid({}, { grid: null })).toBe(false);
    expect(showGrid({ grid: null }, { grid: {} })).toBe(true);
    expect(showGrid({}, { grid: {} })).toBe(true);

    expect(showGrid({}, {})).toBe(true);
    expect(showGrid({ grid: null }, {})).toBe(false);
  });

  it('getLineGridItems', () => {
    const Rect = getCoordinate('rect');

    const coordinate = new Rect({
      start: { x: 0, y: 100 },
      end: { x: 100, y: 0 },
    });

    const Linear = getScale('linear');

    const scale = new Linear({
      min: 0,
      max: 100,
    });

    const xItems = getLineGridItems(coordinate, scale, 'x', true);
    const yItems = getLineGridItems(coordinate, scale, 'y', false);
    expect(xItems.length).toBe(scale.getTicks().length);
    expect(yItems.length).toBe(scale.getTicks().length - 1);

    expect(xItems[1].points).toEqual([
      { x: 25, y: 100 },
      { x: 25, y: 0 },
    ]);
    expect(yItems[1].points).toEqual([
      { x: 0, y: 62.5 },
      { x: 100, y: 62.5 },
    ]);
  });

  it('getCircleGridItems', () => {
    const Polar = getCoordinate('polar');

    const coordinate = new Polar({
      start: { x: 0, y: 100 },
      end: { x: 100, y: 0 },
    });

    const Linear = getScale('linear');
    const Category = getScale('cat');

    const xScale = new Category({
      values: ['东北', '华北', '华东', '华中', '华南', '西部'],
    });

    const yScale = new Linear({
      min: 0,
      max: 100,
    });

    const items1 = getCircleGridItems(coordinate, xScale, yScale, false, 'y');
    const items2 = getCircleGridItems(coordinate, xScale, yScale, true, 'y');
    expect(items1.length).toBe(xScale.values.length - 1);
    expect(items2.length).toBe(yScale.getTicks().length);

    expect(items1[2].points[0]).toEqual({ x: 50, y: 31.25 });
    expect(items2[2].points[0]).toEqual({ x: 50, y: 25 });
  });
});

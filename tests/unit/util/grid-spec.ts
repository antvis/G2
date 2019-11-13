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

    const xItems = getLineGridItems(coordinate, scale, 'x');
    const yItems = getLineGridItems(coordinate, scale, 'y');

    expect(xItems.length).toBe(scale.getTicks().length);
    expect(yItems.length).toBe(scale.getTicks().length);

    expect(xItems[1].points).toEqual([
      { x: 25, y: 100 },
      { x: 25, y: 0 },
    ]);
    expect(yItems[1].points).toEqual([
      { x: 0, y: 75 },
      { x: 100, y: 75 },
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

    const xItems = getCircleGridItems(coordinate, xScale, yScale, 'x');
    const yItems = getCircleGridItems(coordinate, xScale, yScale, 'y');

    expect(xItems.length).toBe(xScale.values.length);
    expect(yItems.length).toBe(yScale.getTicks().length);

    expect(xItems[2].points[0]).toEqual({ x: 50, y: 50 });

    expect(yItems[2].points[0]).toEqual({ x: 50, y: 25 });

    expect(getCircleGridItems(coordinate, xScale, yScale, 'z')).toEqual([]);
  });
});

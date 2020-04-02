import { getCoordinate } from '@antv/coord';
import Interval from '../../../src/geometry/interval';
import Line from '../../../src/geometry/line';
import Point from '../../../src/geometry/point';
import { MappingDatum } from '../../../src/interface';
import { getTheme } from '../../../src/theme/';
import { findDataByPoint, getTooltipItems } from '../../../src/util/tooltip';
import { CITY_SALE, DIAMOND } from '../../util/data';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Tooltip functions', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });

  describe('x is category', () => {
    const scaleDefs = {
      city: {
        range: [0.25, 0.75],
      },
      sale: {
        nice: true,
      },
    };
    const scales = {
      city: createScale('city', CITY_SALE, scaleDefs),
      sale: createScale('sale', CITY_SALE, scaleDefs),
      category: createScale('category', CITY_SALE, scaleDefs),
    };

    const interval = new Interval({
      data: CITY_SALE,
      coordinate: rectCoord,
      scaleDefs,
      scales,
      container: canvas.addGroup(),
    });

    interval
      .position('city*sale')
      .color('category')
      .adjust('stack');
    interval.init({
      theme: Theme,
    });
    interval.paint();

    it('findDataByPoint', () => {
      expect(findDataByPoint({ x: 100, y: 200 }, [], interval)).toBe(null);

      const point = { x: 100, y: 30 };
      const data = interval.dataArray[0];
      const result = findDataByPoint(point, data as MappingDatum[], interval);
      expect(result._origin).toEqual({ city: '上海', sale: 110, category: '电脑' });
    });

    it('getTooltipItems', () => {
      const data = findDataByPoint({ x: 100, y: 30 }, interval.dataArray[0] as MappingDatum[], interval);
      const tooltipItems = getTooltipItems(data, interval);
      expect(tooltipItems.length).toBe(1);

      const { color, name, value, mappingData, title } = tooltipItems[0];
      expect(color).toBe('#5B8FF9');
      expect(name).toBe('电脑');
      expect(value).toBe('110');
      expect(title).toBe('上海');
      expect(mappingData).toBeDefined();

      interval.destroy();
    });
  });

  describe('geometry is point', () => {
    const scales = {
      carat: createScale('carat', DIAMOND, {}),
      price: createScale('price', DIAMOND, {
        price: {
          nice: true,
        },
      }),
      cut: createScale('cut', DIAMOND, {}),
    };

    const point = new Point({
      data: DIAMOND,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });

    point.position('carat*price').color('cut');
    point.init({
      theme: Theme,
    });
    point.paint();

    it('findDataByPoint', () => {
      const data = point.dataArray[0];
      const result = findDataByPoint({ x: 100, y: 90 }, data as MappingDatum[], point);
      expect(result._origin.carat).toBe(1.5);
      expect(result._origin.price).toBe(9996);
      expect(result._origin.cut).toBe('Ideal');
    });

    it('getTooltipItems', () => {
      const data = findDataByPoint({ x: 100, y: 90 }, point.dataArray[0] as MappingDatum[], point);
      const tooltipItems = getTooltipItems(data, point, 'price');
      expect(tooltipItems.length).toBe(1);

      const { color, name, value, mappingData, title } = tooltipItems[0];
      expect(color).toBe('#5B8FF9');
      expect(name).toBe('Ideal');
      expect(value).toBe('9996');
      expect(title).toBe('9996');
      expect(mappingData).toBeDefined();

      expect(getTooltipItems(data, point, 'clarity')[0].title).toBe('SI2');
      expect(getTooltipItems(data, point, 'hahaha')[0].title).toBe('hahaha');
    });
  });

  describe('x is linear', () => {
    const DATA = [
      { year: 1991, value: 15468 },
      { year: 1992, value: 16100 },
      { year: 1993, value: 15900 },
      { year: 1994, value: 20000 },
      { year: 1995, value: 17000 },
      { year: 1996, value: 31056 },
      { year: 1997, value: 31982 },
      { year: 1998, value: 32040 },
      { year: 1999, value: 33233 },
    ];
    const scales = {
      year: createScale('year', DATA, {
        year: { nice: true },
      }),
      value: createScale('value', DATA, {
        value: { nice: true },
      }),
    };

    const line = new Line({
      data: DATA,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });

    line.position('year*value');
    line.init({
      theme: Theme,
    });
    line.paint();

    it('findDataByPoint', () => {
      const data = line.dataArray[0];
      const result = findDataByPoint({ x: 100, y: 90 }, data as MappingDatum[], line);
      expect(result._origin).toEqual({ year: 1995, value: 17000 });
    });

    it('getTooltipItems', () => {
      const data = findDataByPoint({ x: 100, y: 90 }, line.dataArray[0] as MappingDatum[], line);
      const tooltipItems = getTooltipItems(data, line);
      const { color, name, value, title, mappingData } = tooltipItems[0];
      expect(color).toBe('#5B8FF9');
      expect(name).toBe('value');
      expect(value).toBe('17000');
      expect(title).toBe('1995');
      expect(mappingData).toBeDefined();
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

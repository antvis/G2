import { getCoordinate } from '@antv/coord';
import Interval from '../../../src/geometry/interval';
import Line from '../../../src/geometry/line';
import Point from '../../../src/geometry/point';
import Theme from '../../../src/theme/antv';
import { findDataByPoint, getTooltipItems } from '../../../src/util/tooltip';
import { CITY_SALE, DIAMOND } from '../../util/data';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

const CartesianCoordinate = getCoordinate('rect');

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
    const interval = new Interval({
      data: CITY_SALE,
      theme: Theme,
      coordinate: rectCoord,
      scaleDefs: {
        city: {
          range: [0.25, 0.75],
        },
      },
      container: canvas.addGroup(),
    });

    interval
      .position('city*sale')
      .color('category')
      .adjust('stack');
    interval.init();
    interval.paint();

    it('findDataByPoint', () => {
      expect(findDataByPoint({ x: 100, y: 200 }, [], interval)).toBe(null);

      const point = { x: 100, y: 30 };
      const data = interval.dataArray[0];
      const result = findDataByPoint(point, data, interval);
      expect(result._origin).toEqual({ city: '上海', sale: 110, category: '电脑' });
    });

    it('getTooltipItems', () => {
      const data = findDataByPoint({ x: 100, y: 30 }, interval.dataArray[0], interval);
      const tooltipItems = getTooltipItems(data, interval);
      expect(tooltipItems.length).toBe(1);
      expect(tooltipItems[0]).toEqual({
        title: '上海',
        data: { city: '上海', sale: 110, category: '电脑' },
        name: '电脑',
        value: '110',
        color: '#5B8FF9',
        marker: true,
      });

      interval.destroy();
    });
  });

  describe('geometry is point', () => {
    const point = new Point({
      data: DIAMOND,
      theme: Theme,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });

    point.position('carat*price').color('cut');
    point.init();
    point.paint();

    it('findDataByPoint', () => {
      const data = point.dataArray[0];
      const result = findDataByPoint({ x: 100, y: 90 }, data, point);
      expect(result._origin.carat).toBe(1.5);
      expect(result._origin.price).toBe(9996);
      expect(result._origin.cut).toBe('Ideal');

      point.destroy();
    });
  });

  describe('x is linear', () => {
    const line = new Line({
      data: [
        { year: 1991, value: 15468 },
        { year: 1992, value: 16100 },
        { year: 1993, value: 15900 },
        { year: 1994, value: 20000 },
        { year: 1995, value: 17000 },
        { year: 1996, value: 31056 },
        { year: 1997, value: 31982 },
        { year: 1998, value: 32040 },
        { year: 1999, value: 33233 },
      ],
      theme: Theme,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });

    line.position('year*value');
    line.init();
    line.paint();

    it('findDataByPoint', () => {
      const data = line.dataArray[0];
      const result = findDataByPoint({ x: 100, y: 90 }, data, line);
      expect(result._origin).toEqual({ year: 1995, value: 17000 });
    });

    it('getTooltipItems', () => {
      const data = findDataByPoint({ x: 100, y: 90 }, line.dataArray[0], line);
      const tooltipItems = getTooltipItems(data, line);
      expect(tooltipItems[0]).toEqual({
        title: '1995',
        data: { year: 1995, value: 17000 },
        name: 'value',
        value: '17000',
        color: '#1890FF',
        marker: true,
      });
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

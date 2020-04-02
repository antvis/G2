import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Interval from '../../../../src/geometry/interval';
import { getDefaultSize } from '../../../../src/geometry/util/shape-size';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

import 'jest-extended';
import { createScale } from '../../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');
const Theme = getTheme('default');
const CatScale = getScale('cat');
const IdentityScale = getScale('identity');

describe('Calculate shape size', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });
  const polarCoord = new PolarCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });

  describe('Column chart', () => {
    const data = [
      { a: 'A', b: 10 },
      { a: 'B', b: 12 },
      { a: 'C', b: 8 },
    ];
    const scales = {
      a: createScale('a', data),
      b: createScale('b', data),
    };
    let interval = new Interval({
      data,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
      theme: {
        maxColumnWidth: 50,
        minColumnWidth: 10,
      },
    });

    interval.position('a*b').color('a');
    interval.init({
      theme: Theme,
    });

    test('default', () => {
      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(1 / 6);
    });

    test('can not be greater than maxColumnWidth', () => {
      // 扩大坐标系
      rectCoord.update({
        start: { x: 0, y: 360 },
        end: { x: 360, y: 0 },
      });

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(50 / 360);
    });

    test('can not be smaller than minColumnWidth', () => {
      // 缩小坐标系
      rectCoord.update({
        start: { x: 0, y: 54 },
        end: { x: 54, y: 0 },
      });

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(10 / 54);
    });

    test('xScale is linear and min and max defined', () => {
      // 实际个数比 ((max - min) / 最小区间) 小
      const data1 = [
        { a: 3, b: 23 },
        { a: 4, b: 15 },
        { a: 6, b: 9 },
      ];
      const scaleDefs1 = {
        a: {
          min: 0,
          max: 10,
          nice: false,
        },
      };
      const scales1 = {
        a: createScale('a', data1, scaleDefs1),
        b: createScale('b', data1, scaleDefs1),
      };
      interval = new Interval({
        data: data1,
        scales: scales1,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        scaleDefs: scaleDefs1,
      });
      interval.position('a*b');
      interval.init({
        theme: Theme,
      });
      // interval.paint();
      // canvas.draw();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.05);

      const data2 = [
        { a: 2, b: 15 },
        { a: 6, b: 9 },
      ];
      const scaleDefs = {
        a: {
          min: 2,
          max: 7,
          nice: false,
          range: [0.25, 0.75],
        },
      };
      const scales2 = {
        a: createScale('a', data2, scaleDefs),
        b: createScale('b', data2, scaleDefs),
      };
      // 实际个数比 ((max - min) / 最小区间) 大
      interval = new Interval({
        data: data2,
        scales: scales2,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        scaleDefs,
      });
      interval.position('a*b');
      interval.init({
        theme: Theme,
      });
      // interval.paint();
      // canvas.draw();
      expect(getDefaultSize(interval)).toBe(0.125);
    });

    afterAll(() => {
      interval.destroy();
      rectCoord.update({
        start: { x: 0, y: 180 },
        end: { x: 180, y: 0 },
      });
    });
  });

  describe('Group Column Chart.', () => {
    const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },
      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' },
    ];
    const scaleDefs = {
      a: {
        range: [0.2, 0.8],
      },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
      c: createScale('c', data, scaleDefs),
    };
    const interval = new Interval({
      coordinate: rectCoord,
      data,
      scales,
      scaleDefs,
      container: canvas.addGroup(),
    });

    interval.position('a*b').color('c');

    test('calculate size with dodge ajust', () => {
      interval.adjust({
        type: 'dodge',
      });

      interval.init({
        theme: Theme,
      });

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(1 / 12);
    });

    test('dodgeBy', () => {
      interval.clear();
      interval.adjust({
        type: 'dodge',
        dodgeBy: 'a',
      });
      interval.scales = scales;
      interval.init();
      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(1 / 18);
    });

    afterAll(() => {
      interval.destroy();
    });
  });

  describe('Interval in polar coordinate', () => {
    const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },
    ];
    const scaleDefs = {
      a: {
        range: [1 / 6, 1 - 1 / 6],
      },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
    };
    let interval = new Interval({
      data,
      coordinate: polarCoord,
      container: canvas.addGroup(),
      scaleDefs,
      scales,
    });
    interval.position('a*b');
    interval.init({
      theme: Theme,
    });

    test('polar interval', () => {
      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.3333333);
    });

    test('pie chart', () => {
      // 构造 theta 坐标系
      const thetaCoord = new PolarCoordinate({
        start: {
          x: 0,
          y: 180,
        },
        end: {
          x: 180,
          y: 0,
        },
      });
      thetaCoord.transpose();
      // @ts-ignore
      thetaCoord.type = 'theta';

      const identityScale = new IdentityScale({
        field: '1',
        values: [1],
        range: [0.5, 1],
      });
      const pieData = [
        { a: '1', percent: 0.2 },
        { a: '2', percent: 0.5 },
        { a: '3', percent: 0.3 },
      ];
      const pieScales = {
        percent: createScale('percent', pieData),
        a: createScale('a', pieData),
        '1': identityScale,
      };
      interval = new Interval({
        data: pieData,
        scales: pieScales,
        coordinate: thetaCoord,
        container: canvas.addGroup(),
      });
      interval
        .position('1*percent')
        .color('a')
        .adjust('stack');

      interval.init({
        theme: Theme,
      });

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.9999999);
    });

    test('polar dodge interval', () => {
      const data1 = [
        { a: '1', b: 2, c: '1' },
        { a: '2', b: 5, c: '1' },
        { a: '3', b: 4, c: '1' },
        { a: '1', b: 3, c: '2' },
        { a: '2', b: 1, c: '2' },
        { a: '3', b: 2, c: '2' },
      ];
      const scaleDefs1 = {
        a: {
          range: [0, 1 - 1 / 3],
        },
      };
      const scales1 = {
        a: createScale('a', data1, scaleDefs1),
        b: createScale('b', data1, scaleDefs1),
        c: createScale('c', data1, scaleDefs1),
      };
      interval = new Interval({
        data: data1,
        coordinate: polarCoord,
        container: canvas.addGroup(),
        scaleDefs: scaleDefs1,
        scales: scales1,
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .adjust({
          type: 'dodge',
        })
        .color({
          fields: ['c'],
        });

      interval.init({
        theme: Theme,
      });

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe((1 / 6) * Theme.roseWidthRatio);
    });

    test('dodge interval, polar coordinate with transposed', () => {
      const aScale = new CatScale({
        field: 'a',
        values: ['1', '2', '3'],
        range: [(1 / 6) * Theme.multiplePieWidthRatio, 1 - (1 / 6) * Theme.multiplePieWidthRatio],
      });
      polarCoord.isTransposed = true;

      const data1 = [
        { a: '1', b: 2, c: '1' },
        { a: '2', b: 5, c: '1' },
        { a: '3', b: 4, c: '1' },
        { a: '1', b: 3, c: '2' },
        { a: '2', b: 1, c: '2' },
        { a: '3', b: 2, c: '2' },
      ];
      const scales1 = {
        a: aScale,
        b: createScale('b', data1),
        c: createScale('c', data1),
      };

      interval = new Interval({
        data: data1,
        coordinate: polarCoord,
        scales: scales1,
        container: canvas.addGroup(),
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .adjust({
          type: 'dodge',
        })
        .color({
          fields: ['c'],
        });

      interval.init({
        theme: Theme,
      });
      // interval.paint();
      // canvas.draw();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe((1 / 6) * Theme.multiplePieWidthRatio);
    });

    afterAll(() => {
      interval.destroy();
    });
  });

  afterAll(() => {
    removeDom(div);
  });
});

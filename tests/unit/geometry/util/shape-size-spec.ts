import { getCoordinate } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { isNumberEqual, mix } from '@antv/util';
import Interval from '../../../../src/geometry/interval';
import { getDefaultSize } from '../../../../src/geometry/util/shape-size';
import { createDiv, removeDom } from '../../../util/dom';
import Theme from '../../../util/theme';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');

const LinearScale = getScale('linear');
const CatScale = getScale('cat');
const IdentityScale = getScale('identity');

describe('Calculate shape size', () => {
  const div = createDiv();
  const canvas = new Canvas({
    containerDOM: div,
    renderer: 'canvas',
    width: 600,
    height: 600,
    pixelRatio: 2,
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
    let interval = new Interval({
      data: [{ a: 'A', b: 10 }, { a: 'B', b: 12 }, { a: 'C', b: 8 }],
      coordinate: rectCoord,
      container: canvas.addGroup(),
      theme: {
        ...Theme,
        maxColumnWidth: 50,
        minColumnWidth: 10,
      },
    });

    interval.position('a*b').color('a');
    interval.initial();

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

    it('xScale is linear and min and max defined', () => {
      // 实际个数比 ((max - min) / 最小区间) 小
      interval = new Interval({
        data: [{ a: 3, b: 23 }, { a: 4, b: 15 }, { a: 6, b: 9 }],
        coordinate: rectCoord,
        container: canvas.addGroup(),
        scaleDefs: {
          a: {
            min: 0,
            max: 10,
            nice: false,
          },
        },
        theme: Theme,
      });
      interval.position('a*b');
      interval.initial();
      // interval.paint();
      // canvas.draw();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.05);

      // 实际个数比 ((max - min) / 最小区间) 大
      interval = new Interval({
        data: [{ a: 2, b: 15 }, { a: 6, b: 9 }],
        coordinate: rectCoord,
        container: canvas.addGroup(),
        scaleDefs: {
          a: {
            min: 2,
            max: 7,
            nice: false,
            range: [0.25, 0.75],
          },
        },
        theme: Theme,
      });
      interval.position('a*b');
      interval.initial();
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
    const interval = new Interval({
      coordinate: rectCoord,
      data: [
        { a: '1', b: 2, c: '1' },
        { a: '2', b: 5, c: '1' },
        { a: '3', b: 4, c: '1' },
        { a: '1', b: 3, c: '2' },
        { a: '2', b: 1, c: '2' },
        { a: '3', b: 2, c: '2' },
      ],
      scaleDefs: {
        a: {
          range: [0.2, 0.8],
        },
      },
      container: canvas.addGroup(),
      theme: Theme,
    });

    interval.position('a*b').color('c');

    test('calculate size with dodge ajust', () => {
      interval.adjust({
        type: 'dodge',
      });

      interval.initial();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(1 / 12);
    });

    test('dodgeBy', () => {
      interval.clear();
      interval.adjust({
        type: 'dodge',
        dodgeBy: 'a',
      });

      interval.initial();
      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(1 / 18);
    });

    afterAll(() => {
      interval.destroy();
    });
  });

  describe('Interval in polar coordinate', () => {
    const data = [{ a: '1', b: 2, c: '1' }, { a: '2', b: 5, c: '1' }, { a: '3', b: 4, c: '1' }];
    let interval = new Interval({
      data,
      coordinate: polarCoord,
      container: canvas.addGroup(),
      theme: Theme,
      scaleDefs: {
        a: {
          range: [1 / 6, 1 - 1 / 6],
        },
      },
    });
    interval.position('a*b');
    interval.initial();

    it('polar interval', () => {
      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.3333333);
    });

    it('pie chart', () => {
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
      interval = new Interval({
        data: [{ a: '1', percent: 0.2 }, { a: '2', percent: 0.5 }, { a: '3', percent: 0.3 }],
        coordinate: thetaCoord,
        container: canvas.addGroup(),
        scales: {
          1: identityScale,
        },
        theme: Theme,
      });
      interval
        .position('1*percent')
        .color('a')
        .adjust('stack');

      interval.initial();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe(0.9999999);
    });

    it('polar dodge interval', () => {
      interval = new Interval({
        data: [
          { a: '1', b: 2, c: '1' },
          { a: '2', b: 5, c: '1' },
          { a: '3', b: 4, c: '1' },
          { a: '1', b: 3, c: '2' },
          { a: '2', b: 1, c: '2' },
          { a: '3', b: 2, c: '2' },
        ],
        coordinate: polarCoord,
        container: canvas.addGroup(),
        theme: Theme,
        scaleDefs: {
          a: {
            range: [0, 1 - 1 / 3],
          },
        },
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

      interval.initial();

      const normalizedSize = getDefaultSize(interval);
      expect(normalizedSize).toBe((1 / 6) * Theme.roseWidthRatio);
    });

    it('dodge interval, polar coordinate with transposed', () => {
      const aScale = new CatScale({
        field: 'a',
        values: ['1', '2', '3'],
        range: [(1 / 6) * Theme.multiplePieWidthRatio, 1 - (1 / 6) * Theme.multiplePieWidthRatio],
      });
      polarCoord.isTransposed = true;

      interval = new Interval({
        data: [
          { a: '1', b: 2, c: '1' },
          { a: '2', b: 5, c: '1' },
          { a: '3', b: 4, c: '1' },
          { a: '1', b: 3, c: '2' },
          { a: '2', b: 1, c: '2' },
          { a: '3', b: 2, c: '2' },
        ],
        coordinate: polarCoord,
        scales: {
          a: aScale,
        },
        container: canvas.addGroup(),
        theme: Theme,
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

      interval.initial();
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
    // removeDom(div);
  });
});

import { getCoordinate } from '@antv/coord';
import { isNumberEqual } from '@antv/util';
import Interval from '../../../src/geometry/interval';
import Theme from '../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale, updateScales } from '../../util/scale';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');

describe('Interval', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });

  describe('Default', () => {
    let interval;
    const data = [
      { a: 'A', b: 10 },
      { a: 'B', b: 12 },
      { a: 'C', b: 8 },
    ];
    const scaleDefs = {
      a: { range: [0.25, 0.75] },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
      20: createScale(20, data, scaleDefs),
    };

    let dataArray;

    test('Instantiate with empty config', () => {
      interval = new Interval({
        container: canvas.addGroup(),
      });
      expect(interval.type).toBe('interval');
      expect(interval.shapeType).toBe('interval');
      expect(interval.generatePoints).toBe(true);
      expect(interval.visible).toBe(true);
    });

    test('init()', () => {
      interval = new Interval({
        data,
        scaleDefs,
        scales,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        theme: Theme,
      });

      interval
        .position('a*b')
        .color('a')
        .style({
          fill: 'red',
        });
      interval.init();

      const attributes = interval.attributes;
      expect(attributes).toContainKeys(['position', 'color']);

      dataArray = interval.beforeMappingData;
      expect(dataArray.length).toBe(3);
      expect(dataArray[0][0].a).toBe(0);
      expect(dataArray[1][0].a).toBe(1);
      expect(dataArray[2][0].a).toBe(2);
    });

    test('yScale min adjust', () => {
      // 柱状图 Y 轴应该从 0 开始生长
      const yScale = interval.getYScale();
      expect(yScale.min).toBe(0);
    });

    test('createShapePointsCfg', () => {
      const result = interval.createShapePointsCfg(dataArray[0][0]);
      expect(result.size).toBe(1 / 6);
      expect(interval.defaultSize).toBe(1 / 6);
    });

    test('beforeMapping', () => {
      dataArray = interval.beforeMapping(dataArray);

      // 会生成 nextPoints
      expect(dataArray[0][0].points).not.toBe(undefined);
      expect(dataArray[0][0].nextPoints).not.toBe(undefined);
      expect(dataArray[1][0].points).not.toBe(undefined);
      expect(dataArray[1][0].nextPoints).not.toBe(undefined);
      expect(dataArray[2][0].points).not.toBe(undefined);
      expect(dataArray[2][0].nextPoints).toBe(undefined);
    });

    test('paint()', () => {
      interval.paint();
      canvas.draw();

      const elements = interval.elements;
      expect(elements.length).toBe(3);

      expect(interval.container.get('children').length).toBe(3);
      expect(interval.container.get('children')[0].attr('fill')).toBe('red');
    });

    test('clear()', () => {
      interval.clear();
      expect(interval.defaultSize).toBe(undefined);
    });

    test('interval.size(20)', () => {
      interval.size(20); // 指定 interval 的宽度

      // 需要传入 scales
      interval.scales = scales;
      interval.init();

      interval.paint();

      expect(interval.defaultSize).toBe(undefined);
      const intervalShape = interval.elements[0].shape;
      const intervalShapeBBox = intervalShape.getBBox();
      expect(isNumberEqual(intervalShapeBBox.width, 20)).toBe(true);
    });

    test('limit the width with minColumnWidth', () => {
      interval.clear();
      interval.theme.minColumnWidth = 40;

      interval.size(null);
      interval.scales = scales;

      interval.init();
      interval.paint();

      canvas.draw();

      const elements = interval.elements;
      expect(isNumberEqual(elements[0].shape.getBBox().width, 40)).toBe(true);
      expect(isNumberEqual(elements[1].shape.getBBox().width, 40)).toBe(true);
      expect(isNumberEqual(elements[2].shape.getBBox().width, 40)).toBe(true);
    });

    test('limit the width with maxColumnWidth', () => {
      interval.clear();
      interval.theme.maxColumnWidth = 10;
      interval.theme.minColumnWidth = null;
      interval.scales = scales;

      interval.init();
      interval.paint();

      canvas.draw();

      const elements = interval.elements;
      expect(isNumberEqual(elements[0].shape.getBBox().width, 10)).toBe(true);
      expect(isNumberEqual(elements[1].shape.getBBox().width, 10)).toBe(true);
      expect(isNumberEqual(elements[2].shape.getBBox().width, 10)).toBe(true);
    });

    test('destroy()', () => {
      interval.destroy();

      expect(interval.container.destroyed).toBe(true);
    });
  });

  describe('yScale adjust', () => {
    const data = [
      { a: 'A', b: 10 },
      { a: 'B', b: 12 },
      { a: 'C', b: 8 },
    ];
    const scaleDefs = {
      a: { range: [0.25, 0.75] },
      b: { min: 7 },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
    };
    const interval = new Interval({
      data,
      scaleDefs,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
      theme: Theme,
    });

    interval.position('a*b');

    it('yScale min adjust when user define min', () => {
      interval.init();
      // 为了观察最终的绘制结果
      interval.paint();
      canvas.draw();

      const yScale = interval.getYScale();
      expect(yScale.min).not.toBe(0);
    });

    test('yScale max adjust when user do not define max', () => {
      const newData = [
        { a: 'A', b: -10 },
        { a: 'B', b: -12 },
        { a: 'C', b: -8 },
      ];
      const newScaleDefs = {
        a: { range: [0.25, 0.75] },
      };
      const newScales = {
        a: createScale('a', newData, newScaleDefs),
        b: createScale('b', newData, newScaleDefs),
      };
      updateScales(interval.scales, newScales);

      interval.update({
        data: newData,
        scaleDefs: newScaleDefs,
      });
      // 为了观察最终的绘制结果
      interval.paint();
      canvas.draw();

      expect(interval.getYScale().max).toBe(0);
    });

    test('yScale max adjust when user define max', () => {
      const newData = [
        { a: 'A', b: -10 },
        { a: 'B', b: -12 },
        { a: 'C', b: -8 },
      ];
      const newScaleDefs = {
        a: { range: [0.25, 0.75] },
        b: {
          max: 5,
        },
      };
      const newScales = {
        a: createScale('a', newData, newScaleDefs),
        b: createScale('b', newData, newScaleDefs),
      };
      updateScales(interval.scales, newScales);

      interval.update({
        data: newData,
        scaleDefs: newScaleDefs,
      });

      // 为了观察最终的绘制结果
      interval.paint();
      canvas.draw();

      expect(interval.getYScale().max).toBe(5);
    });

    test('yScale will not be adjusted when type is time', () => {
      const newData = [
        { a: 'A', b: '2019-10-01' },
        { a: 'B', b: '2019-10-02' },
        { a: 'C', b: '2019-10-03' },
      ];
      const newScaleDefs = {
        a: { range: [0.25, 0.75] },
        b: null,
      };
      const newScales = {
        a: createScale('a', newData, newScaleDefs),
        b: createScale('b', newData, newScaleDefs),
      };
      updateScales(interval.scales, newScales);

      interval.update({
        data: newData,
        scaleDefs: newScaleDefs,
      });

      const yScale = interval.getYScale();
      expect(yScale.type).toBe('time');
      expect(yScale.min).not.toBe(0);
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

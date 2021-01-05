import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import { ScaleType } from '../../../src/interface';
import { isNumberEqual } from '@antv/util';
import Interval from '../../../src/geometry/interval';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale, updateScales } from '../../util/scale';

import 'jest-extended';
import { syncScale } from '../../../src/util/scale';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');
const IdentityScale = getScale('identity');
const Theme = getTheme('default');

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
      });

      interval.position('a*b').color('a').style({
        fill: 'red',
      });
      interval.init({
        theme: Theme,
      });

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

    test('pixel interval padding', () => {
      interval.clear();
      interval.intervalPadding = 0;

      interval.size(null);
      interval.scales = scales;

      interval.init();
      interval.paint();

      canvas.draw();

      const elements = interval.elements;
      expect(elements[0].shape.getBBox().width).toBeCloseTo(60);
      expect(elements[1].shape.getBBox().width).toBeCloseTo(60);
      expect(elements[2].shape.getBBox().width).toBeCloseTo(60);
    });

    test('limit the width with minColumnWidth', () => {
      interval.clear();
      interval.intervalPadding = null;
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
    });

    interval.position('a*b');

    it('yScale min adjust when user define min', () => {
      interval.init({
        theme: Theme,
      });
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
        b: { type: 'time' as ScaleType },
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

    test('pie chart', () => {
      const thetaCoord = new PolarCoordinate({
        start: { x: 0, y: 180 },
        end: { x: 180, y: 0 },
      });
      thetaCoord.transpose();
      // @ts-ignore
      thetaCoord.type = 'theta';
      const pieData = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: 'Other', value: 5 },
      ];
      const pieScales = {
        type: createScale('type', pieData),
        value: createScale('value', pieData),
        '1': new IdentityScale({
          field: '1',
          values: [1],
          range: [0.5, 1],
        }),
      };

      const pie = new Interval({
        data: pieData,
        scales: pieScales,
        coordinate: thetaCoord,
        container: canvas.addGroup(),
      });

      pie.position('value').color('type').adjust('stack');
      pie.init({
        theme: Theme,
      });

      expect(pie.getYScale().min).toBe(0);
      expect(pie.getYScale().max).toBe(100);

      syncScale(pie.getYScale(), createScale('value', pieData));

      expect(pie.getYScale().min).toBe(5);
      expect(pie.getYScale().max).toBe(27);

      pie.update();
      expect(pie.getYScale().min).toBe(0);
      expect(pie.getYScale().max).toBe(100);

      const colorAttr = pie.getAttribute('color');
      expect(colorAttr.values).toEqual(Theme.colors10);
    });

    test('paletteQualitative20', () => {
      const thetaCoord = new PolarCoordinate({
        start: { x: 0, y: 180 },
        end: { x: 180, y: 0 },
      });
      thetaCoord.transpose();
      // @ts-ignore
      thetaCoord.type = 'theta';
      const pieData = [
        { type: '分类一', value: 45 },
        { type: '分类二', value: 5 },
        { type: '分类三', value: 5 },
        { type: '分类四', value: 5 },
        { type: '分类五', value: 5 },
        { type: '分类六', value: 5 },
        { type: '分类七', value: 5 },
        { type: '分类八', value: 5 },
        { type: '分类九', value: 5 },
        { type: '分类十', value: 10 },
        { type: 'Other', value: 5 },
      ];
      const pieScales = {
        type: createScale('type', pieData),
        value: createScale('value', pieData),
        '1': new IdentityScale({
          field: '1',
          values: [1],
          range: [0.5, 1],
        }),
      };

      const pie = new Interval({
        data: pieData,
        scales: pieScales,
        coordinate: thetaCoord,
        container: canvas.addGroup(),
      });

      pie.position('value').color('type').adjust('stack');
      pie.init({
        theme: Theme,
      });

      const colorAttr = pie.getAttribute('color');
      expect(colorAttr.values).toEqual(Theme.colors20);
    });
  });

  describe('element shape 支持 background', () => {
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

    let interval;

    test('paint with background', () => {
      interval = new Interval({
        data,
        scaleDefs,
        scales,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        background: { style: { fill: 'red' } },
      });
      interval.position('a*b').color('a').style({
        fill: 'red',
      });
      interval.init({ theme: Theme });
      interval.paint();

      const intervalShape = interval.elements[0].shape;
      // @ts-ignore
      expect(intervalShape.getChildren().length).toBe(2);
    });

    test('getDrawCfg of interval', () => {
      // @ts-ignore
      const dataArray = interval.mapping(interval.beforeMapping(interval.beforeMappingData)[0]);
      // @ts-ignore
      const result = interval.getDrawCfg(dataArray[0]);
      expect((result.background as any).style.fill).toBe('red');
    });

    test('paint without background', () => {
      interval = new Interval({
        data,
        scaleDefs,
        scales,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        background: false,
      });
      interval.position('a*b').color('a').style({
        fill: 'red',
      });
      interval.init({ theme: Theme });
      interval.paint();

      const intervalShape = interval.elements[0].shape;
      // @ts-ignore
      expect(intervalShape.isGroup()).toBe(false);
    });

    test('paint interval in rect-shape', () => {
      interval = new Interval({
        data,
        scaleDefs,
        scales,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        background: {},
      });

      interval.position('a*b');
      interval.shape('a', ['rect']);
      interval.init({ theme: Theme });
      interval.paint();
      const intervalShape = interval.elements[0].shape;
      // @ts-ignore
      expect(intervalShape.isGroup()).not.toBe(false);
    });

    test('paint interval in line-shape', () => {
      interval = new Interval({
        data,
        scaleDefs,
        scales,
        coordinate: rectCoord,
        container: canvas.addGroup(),
        background: {},
      });
      interval.position('a*b');
      interval.shape('a', ['line']);
      interval.init({ theme: Theme });
      interval.paint();
      const intervalShape = interval.elements[0].shape;
      // @ts-ignore
      expect(intervalShape.isGroup()).toBe(false);
    });

    afterAll(() => {
      interval.destroy();
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});

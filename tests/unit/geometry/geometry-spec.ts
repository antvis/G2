import * as _ from '@antv/util';
import 'jest-extended';
import { getCoordinate, Group } from '../../../src/dependents';
import Geometry from '../../../src/geometry/geometry';
import * as Shape from '../../../src/geometry/shape';
import { LooseObject } from '../../../src/interface';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import Theme from '../../util/theme';

const Rect = getCoordinate('rect');

describe('Geometry', () => {
  describe('Instantiation and setting', () => {
    let geometry;

    it('Instantiation', () => {
      const data = [
        { month: '一月', temperature: 5, day: 1 },
        { month: '一月', temperature: 6, day: 2 },
        { month: '一月', temperature: 10, day: 3 },
        { month: '二月', temperature: 10, day: 1 },
        { month: '二月', temperature: 9, day: 2 },
        { month: '二月', temperature: 8, day: 3 },
      ];

      const coordinate = new Rect({
        start: { x: 0, y: 200 },
        end: { x: 200, y: 0 },
      });
      geometry = new Geometry({
        data,
        coordinate,
        container: new Group({}),
        theme: Theme, // 测试用主题
        scaleDefs: {
          month: {
            range: [0.25, 0.75],
          },
        },
        generatePoints: true,
      });
      // @ts-ignore
      geometry.type = 'myInterval';

      expect(geometry.type).toBe('myInterval');
      expect(geometry.attributes).toEqual({});
      expect(geometry.scales).toEqual({});
      expect(geometry.elements).toEqual([]);
      expect(geometry.data).not.toBe(undefined);
      expect(geometry.coordinate).not.toBe(undefined);
      expect(geometry.container).not.toBe(undefined);
      expect(geometry.theme).not.toBe(undefined);
      expect(geometry.scaleDefs).not.toBe(undefined);
      expect(geometry.generatePoints).toBe(true);
    });

    it('position()', () => {
      geometry.position('month*temperature');
      expect(geometry.attributeOption.position).toEqual({
        fields: ['month', 'temperature'],
      });

      geometry.position({
        fields: ['month', 'temperature'],
      });
      expect(geometry.attributeOption.position).toEqual({
        fields: ['month', 'temperature'],
      });
    });

    it('color()', () => {
      geometry.color('red'); // 颜色常量
      expect(geometry.attributeOption.color).toEqual({
        fields: ['red'],
      });

      geometry.color('month'); // 字段
      expect(geometry.attributeOption.color).toEqual({
        fields: ['month'],
      });

      geometry.color('month', ['red', 'blue']);
      expect(geometry.attributeOption.color).toEqual({
        fields: ['month'],
        values: ['red', 'blue'],
      });

      geometry.color('month', () => {
        return 'red';
      });
      expect(geometry.attributeOption.color).toContainKeys(['fields', 'callback']);
    });

    it('shape()', () => {
      geometry.shape('circle');
      expect(geometry.attributeOption.shape).toEqual({
        fields: ['circle'],
      });

      geometry.shape('month', ['circle', 'square']);
      expect(geometry.attributeOption.shape).toEqual({
        fields: ['month'],
        values: ['circle', 'square'],
      });

      geometry.shape('month', () => {
        return 'circle';
      });

      expect(geometry.attributeOption.shape).toContainKeys(['fields', 'callback']);
      expect(geometry.attributeOption.shape.fields).toEqual(['month']);
    });

    it('size()', () => {
      geometry.size(3);
      expect(geometry.attributeOption.size).toEqual({
        values: [3],
      });

      geometry.size('temperature');
      expect(geometry.attributeOption.size).toEqual({
        fields: ['temperature'],
      });

      geometry.size('temperature', [2, 10]);
      expect(geometry.attributeOption.size).toEqual({
        fields: ['temperature'],
        values: [2, 10],
      });

      geometry.size('temperature', () => {
        return 0;
      });
      expect(geometry.attributeOption.size).toContainKeys(['fields', 'callback']);
      expect(geometry.attributeOption.size.fields).toEqual(['temperature']);
    });

    it('adjust()', () => {
      // 传入 object 类型
      geometry.adjust({
        type: 'stack',
      });
      expect(geometry.adjustOption).toEqual([{ type: 'stack' }]);

      // 传入数组
      geometry.adjust([
        {
          type: 'stack',
        },
      ]);

      expect(geometry.adjustOption).toEqual([{ type: 'stack' }]);

      geometry.adjust('stack');
      expect(geometry.adjustOption).toEqual([{ type: 'stack' }]);

      geometry.adjust(['stack']);
      expect(geometry.adjustOption).toEqual([{ type: 'stack' }]);
    });

    it('style()', () => {
      geometry.style({
        callback() {
          return {
            lineWidth: 1,
            stroke: '#1890ff',
          };
        },
      });

      expect(geometry.styleOption.callback).toBeInstanceOf(Function);

      geometry.style({
        lineWidth: 1,
      });
      expect(geometry.styleOption).toEqual({
        cfg: {
          lineWidth: 1,
        },
      });

      geometry.style('month', () => {
        return {
          lineWidth: 1,
        };
      });
      expect(geometry.styleOption.fields).toEqual(['month']);
      expect(geometry.styleOption.callback).toBeInstanceOf(Function);
    });

    it('tooltip()', () => {
      geometry.tooltip(false); // 关闭 geometry 上的 tooltip
      expect(geometry.tooltipOption).toBe(false);

      geometry.tooltip(true); // 开启 geometry 上的 tooltip
      expect(geometry.tooltipOption).toBe(true);

      geometry.tooltip('month*temperature');
      expect(geometry.tooltipOption).toEqual({
        fields: ['month', 'temperature'],
        callback: undefined,
      });

      geometry.tooltip('month*temperature', (month, temperature) => {
        return {
          name: month,
          value: temperature,
        };
      });
      expect(geometry.tooltipOption.fields).toEqual(['month', 'temperature']);
      expect(geometry.tooltipOption.callback).toBeInstanceOf(Function);

      geometry.tooltip({
        fields: ['month', 'temperature'],
      });

      const tooltipOptions = geometry.tooltipOption;
      expect(tooltipOptions.fields).toEqual(['month', 'temperature']);
    });

    it('animate', () => {
      // todo
    });
  });

  describe('Data mapping', () => {
    let geometry;
    let canvas;
    let div;
    beforeAll(() => {
      div = createDiv();

      canvas = createCanvas({
        container: div,
      });
      const data = [
        { month: '一月', temperature: 5, city: '北京', year: '2018' },
        { month: '二月', temperature: 10, city: '北京', year: '2018' },
        { month: '一月', temperature: 8, city: '南京', year: '2018' },
        { month: '二月', temperature: 14, city: '南京', year: '2018' },
      ];
      const coordinate = new Rect({
        start: { x: 0, y: 200 },
        end: { x: 200, y: 0 },
      });
      const container = canvas.addGroup();
      geometry = new Geometry({
        data,
        coordinate,
        container,
        theme: Theme, // 测试用主题
        generatePoints: true,
        scaleDefs: {
          month: {
            range: [0.25, 0.75],
          },
          temperature: {
            min: 0,
          },
        },
      });

      // @ts-ignore
      geometry.type = 'interval';
      // @ts-ignore
      geometry.shapeType = 'myInterval';

      function getPath(points) {
        const path = [];
        const firstPoint = points[0];
        path.push(['M', firstPoint.x, firstPoint.y]);
        for (let i = 1, len = points.length; i < len; i++) {
          path.push(['L', points[i].x, points[i].y]);
        }
        path.push(['L', firstPoint.x, firstPoint.y]);
        path.push(['z']);

        return path;
      }
      // 注册 ShapeFactory
      Shape.registerShapeFactory('myInterval', {
        defaultShapeType: 'tick',
        getDefaultPoints(pointCfg) {
          const { x, y, y0 } = pointCfg;
          const yMin = y0;
          const yMax = y as number;

          return [{ x: x as number, y: yMin }, { x: x as number, y: yMax }];
        },
      });

      Shape.registerShape('myInterval', 'tick', {
        draw(cfg, element) {
          const { style, points, color } = cfg;
          const path = this.parsePath(getPath(points));
          return element.container.addShape('path', {
            attrs: {
              ...style,
              path,
              stroke: color,
            },
          });
        },
        update(cfg, element) {
          const { style, points, color } = cfg;
          const path = this.parsePath(getPath(points));
          const shape = element.shape;
          shape.attr({
            ...style,
            path,
            stroke: color,
          });
        },
      });
    });

    it('attribute mapping', () => {
      geometry
        .position('month*temperature')
        .color('city', ['#1890FF', '#FACC14'])
        .adjust('dodge')
        .tooltip('year')
        .size(3);
      expect(geometry.attributeOption).toContainKeys(['position', 'color', 'size']);
      expect(geometry.tooltipOption).toEqual({ fields: ['year'], callback: undefined });
      expect(geometry.adjustOption).toEqual([{ type: 'dodge' }]);
    });

    it('init()', () => {
      geometry.initial();

      // attrs 的生成
      const attrs = geometry.attributes;
      expect(attrs).toContainKeys(['position', 'color', 'size']);

      // scales 的生成
      const scales = geometry.scales;
      expect(scales).toContainKeys(['month', 'temperature', 'city', 'year']);
      expect(scales.month.range).toEqual([0.25, 0.75]);
      expect(scales.month.values).toEqual(['一月', '二月']);

      // 数据加工
      const dataArray = geometry.dataArray;
      expect(dataArray.length).toBe(2);
      expect(dataArray[0][0].city).toBe('北京');
      expect(dataArray[0][1].city).toBe('北京');
      expect(dataArray[1][0].city).toBe('南京');
      expect(dataArray[1][1].city).toBe('南京');

      // 确保原始数据被保存
      _.flatten(dataArray).forEach((obj: LooseObject) => {
        expect(obj._origin).not.toBe(undefined);
      });

      // 确保 x 字段对应的数据被数字化且发生 dodge 调整
      expect(dataArray[0][0].month).toBe(-0.1875);
      expect(dataArray[1][0].month).toBe(0.1875);
      expect(dataArray[0][1].month).toBe(0.8125);
      expect(dataArray[1][1].month).toBe(1.1875);
    });

    it('paint()', () => {
      geometry.paint();

      const elements = geometry.elements;
      expect(elements.length).toBe(4);
      expect(geometry.elementsMap).not.toBe(undefined);
      expect(geometry.container.get('children').length).toBe(4);
    });

    it('getGroupScales()', () => {
      const groupScales = geometry.getGroupScales();
      expect(groupScales.length).toBe(1);
      expect(groupScales[0].field).toBe('city');
    });

    it('getAttribute()', () => {
      const colorAttr = geometry.getAttribute('color');

      expect(colorAttr.type).toBe('color');
    });

    it('getXScale()', () => {
      const xScale = geometry.getXScale();

      expect(xScale.field).toBe('month');
    });

    it('getYScale()', () => {
      const yScale = geometry.getYScale();
      expect(yScale.field).toBe('temperature');
    });

    it('getDefaultValue()', () => {
      const defaultSize = geometry.getDefaultValue('size');

      expect(defaultSize).toBe(3);
    });

    it('update data and repaint', () => {
      const updateElement = geometry.elements[1];
      const deleteElement = geometry.elements[0];

      geometry.updateData([
        { month: '二月', temperature: 20, city: '北京', year: '2018' },
        { month: '二月', temperature: 14, city: '南京', year: '2018' },
        { month: '三月', temperature: 24, city: '南京', year: '2018' },
      ]);

      expect(geometry.data.length).toBe(3);
      expect(geometry.dataArray.length).toBe(2);

      const scales = geometry.scales;
      expect(scales.month.values).toEqual(['二月', '三月']);

      // 更新完数据后进行绘制
      geometry.paint();
      const elements = geometry.elements;
      expect(elements.length).toBe(3);

      const elementsMap = geometry.elementsMap;
      expect(elementsMap).toContainKeys(['二月-北京', '二月-南京', '三月-南京']);

      const xScale = geometry.getXScale();
      expect(xScale.values).toEqual(['二月', '三月']);
      expect(deleteElement.destroyed).toBe(true);

      expect(updateElement.getData()).toEqual({ month: '二月', temperature: 20, city: '北京', year: '2018' });
    });

    it('clear()', () => {
      geometry.clear();

      expect(geometry.container.get('children').length).toBe(0);
      expect(geometry.attributes).toEqual({});
      expect(geometry.scales).toEqual({});
      expect(geometry.elementsMap).toEqual({});
      expect(geometry.lastElementsMap).toEqual({});
      expect(geometry.elements).toEqual([]);
    });

    it('destroy()', () => {
      geometry.destroy();

      expect(canvas.get('children').length).toBe(0);
    });

    afterAll(() => {
      canvas.destroy();
      removeDom(div);
    });
  });
});

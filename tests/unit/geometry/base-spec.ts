import { flatten } from '@antv/util';
import 'jest-extended';
import { getEngine } from '../../../src';
import { getCoordinate } from '../../../src/dependents';
import Geometry from '../../../src/geometry/base';
import * as Shape from '../../../src/geometry/shape/base';
import { LooseObject } from '../../../src/interface';
import { getTheme } from '../../../src/theme/';
import { createScaleByField, syncScale } from '../../../src/util/scale';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { createScale, updateScales } from '../../util/scale';

const Rect = getCoordinate('rect');
const Theme = getTheme('default');
const G = getEngine('canvas');

describe('Geometry', () => {
  const coordinate = new Rect({
    start: { x: 0, y: 200 },
    end: { x: 200, y: 0 },
  });
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
      geometry = new Geometry({
        data,
        scales: {},
        coordinate,
        container: new G.Group({}),
        theme: {
          geometries: {
            myInterval: {
              tick: {
                default: {
                  lineWidth: 10,
                },
                active: {
                  stroke: 'red',
                },
                selected: {
                  stroke: 'blue',
                },
              },
            },
          },
        },
        scaleDefs: {
          month: {
            range: [0.25, 0.75],
          },
        },
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
      expect(geometry.scaleDefs).not.toBe(undefined);
    });

    it('position()', () => {
      geometry.position('temperature');
      expect(geometry.attributeOption.position).toEqual({
        fields: ['1', 'temperature'],
      });

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

      geometry.position(['month', 'temperature']);
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

      geometry.size(3);
      expect(geometry.attributeOption.size).toEqual({
        values: [3],
      });

      geometry.size(0);
      expect(geometry.attributeOption.size).toEqual({
        values: [0],
      });
    });

    it('label()', () => {
      geometry.label(false);
      expect(geometry.labelOption).toBe(false);

      geometry.label({
        fields: ['temperature'],
        cfg: {
          type: 'pie',
        },
      });
      expect(geometry.labelOption).toEqual({
        fields: ['temperature'],
        cfg: {
          type: 'pie',
        },
      });

      geometry.label('temperature');
      expect(geometry.labelOption).toEqual({
        fields: ['temperature'],
      });

      geometry.label('temperature', {
        type: 'base',
      });
      expect(geometry.labelOption).toEqual({
        fields: ['temperature'],
        cfg: {
          type: 'base',
        },
      });

      geometry.label('temperature', (val) => {});
      expect(geometry.labelOption.callback).toBeInstanceOf(Function);
      expect(geometry.labelOption.cfg).toBeUndefined();

      geometry.label('temperature', (val) => {}, {
        type: 'base',
      });
      expect(geometry.labelOption.callback).toBeInstanceOf(Function);
      expect(geometry.labelOption.cfg).toEqual({
        type: 'base',
      });
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
      geometry.animate(false);
      // @ts-ignore
      expect(geometry.animateOption).toBe(false);

      geometry.animate(true);
      // @ts-ignore
      expect(geometry.animateOption).toBe(true);

      geometry.animate({
        enter: null,
      });
      // @ts-ignore
      expect(geometry.animateOption).toEqual({
        enter: null,
      });
    });

    it('getScaleFields', () => {
      const fields = geometry.getScaleFields();
      expect(fields).toEqual(['month', 'temperature', 0]);
    });
  });

  describe('Data mapping', () => {
    let geometry;
    let canvas;
    let div;
    let scaleDefs;
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

      scaleDefs = {
        month: {
          range: [0.25, 0.75],
        },
        temperature: {
          min: 0,
        },
      };
      const scales = {
        month: createScale('month', data, scaleDefs),
        temperature: createScale('temperature', data, scaleDefs),
        city: createScale('city', data, scaleDefs),
        year: createScale('year', data, scaleDefs),
      };
      const container = canvas.addGroup();
      geometry = new Geometry({
        data,
        scales,
        coordinate,
        container,
        theme: {
          geometries: {
            myInterval: {
              tick: {
                default: {
                  style: { lineWidth: 10},
                },
                active: {
                  style: { stroke: 'red'},
                },
                selected: {
                  style: {stroke: 'blue',}
                },
              },
            },
          },
        },
        scaleDefs,
      });

      // @ts-ignore
      geometry.type = 'interval';
      // @ts-ignore
      geometry.shapeType = 'myInterval';
      // @ts-ignore 测试使用
      geometry.generatePoints = true;

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

          return [
            { x: x as number, y: yMin },
            { x: x as number, y: yMax },
          ];
        },
      });

      Shape.registerShape('myInterval', 'tick', {
        draw(cfg, groupScales) {
          const { style, points, color } = cfg;
          const path = this.parsePath(getPath(points));
          return groupScales.addShape('path', {
            attrs: {
              ...style,
              path,
              stroke: color,
            },
          });
        },
        getMarker(cfg) {
          return {
            symbol: 'rect',
            style: {
              fill: cfg.color,
              r: 5,
            },
          };
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

    it('animate()', () => {
      geometry.animate(false);
      // @ts-ignore
      expect(geometry.animateOption).toBe(false);
    });

    it('init()', () => {
      geometry.init({
        theme: Theme,
      });

      // attrs 的生成
      const attrs = geometry.attributes;
      expect(attrs).toContainKeys(['position', 'color', 'size']);

      // scales 的生成
      const scales = geometry.scales;
      expect(scales).toContainKeys(['month', 'temperature', 'city', 'year']);
      expect(scales.month.range).toEqual([0.25, 0.75]);
      expect(scales.month.values).toEqual(['一月', '二月']);

      // 数据加工
      const dataArray = geometry.beforeMappingData;
      expect(dataArray.length).toBe(2);
      expect(dataArray[0][0].city).toBe('北京');
      expect(dataArray[0][1].city).toBe('北京');
      expect(dataArray[1][0].city).toBe('南京');
      expect(dataArray[1][1].city).toBe('南京');

      // 确保原始数据被保存
      flatten(dataArray).forEach((obj: LooseObject) => {
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
      // @ts-ignore
      expect(geometry.container.get('children').length).toBe(4);
      expect(geometry.animateOption).toBe(false);
    });

    it('getShapes()', () => {
      expect(geometry.getShapes().length).toBe(4);
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

    it('getElementsBy', () => {
      const result = geometry.getElementsBy((ele) => {
        const data = ele.getData();
        return data.month === '一月';
      });

      expect(result.length).toBe(2);
    });

    it('getDefaultValue()', () => {
      const defaultSize = geometry.getDefaultValue('size');

      expect(defaultSize).toBe(3);
    });

    it('getShapeMarker()', () => {
      const markerCfg = geometry.getShapeMarker('tick', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'rect',
        style: {
          fill: 'red',
          r: 5,
          lineWidth: 10,
        },
      });
    });

    it('changeVisible', () => {
      expect(geometry.visible).toBe(true);

      geometry.changeVisible(false);
      expect(geometry.visible).toBe(false);
      expect(geometry.container.get('visible')).toBe(false);

      geometry.elements.forEach((element) => {
        expect(element.visible).toBe(false);
      });
    });

    it('update data and repaint', () => {
      const updateElement = geometry.elements[1];
      const deleteElement = geometry.elements[0];
      geometry.show();
      geometry.animate(true);

      const newData = [
        { month: '二月', temperature: 20, city: '北京', year: '2018' },
        { month: '二月', temperature: 14, city: '南京', year: '2018' },
        { month: '三月', temperature: 24, city: '南京', year: '2018' },
      ];
      const newScales = {
        month: createScale('month', newData, scaleDefs),
        temperature: createScale('temperature', newData, scaleDefs),
        city: createScale('city', newData, scaleDefs),
        year: createScale('year', newData, scaleDefs),
      };
      // 需要保持 scales 的引用
      updateScales(geometry.scales, newScales);

      geometry.update({
        data: newData,
      });

      expect(geometry.data.length).toBe(3);
      expect(geometry.beforeMappingData.length).toBe(2);

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
      expect(geometry.animateOption).toEqual({
        appear: {
          duration: 450,
          easing: 'easeQuadOut'
        },
        update: {
          duration: 400,
          easing: 'easeQuadInOut',
          animation: null
        },
        enter: {
          duration: 400,
          easing: 'easeQuadInOut',
          animation: 'scale-in-y'
        },
        leave: {
          duration: 350,
          easing: 'easeQuadIn',
          animation: 'fade-out'
        },
      });
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

  it('one dim position mapping', () => {
    const data = [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
    ];
    const geometry = new Geometry({
      data,
      coordinate,
      container: new G.Group({}),
    });
    geometry.position('value');

    const fields = geometry.getScaleFields();
    const scales = {};
    fields.forEach((fieldName) => {
      scales[fieldName] = createScale(fieldName, data);
    });
    geometry.scales = scales;

    geometry.init({
      theme: Theme,
    });

    const positionScales = geometry.getAttribute('position').scales;
    expect(positionScales.length).toBe(2);
    expect(positionScales[0].type).toBe('identity');
  });

  it('adjustScale', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ];
    const scales = {
      name: createScale('name', data),
      月份: createScale('月份', data),
      月均降雨量: createScale('月均降雨量', data, {
        月均降雨量: {
          nice: true,
        },
      }),
    };

    const geometry = new Geometry({
      data,
      scales,
      coordinate,
      container: new G.Group({}),
    });
    geometry
      .position('月份*月均降雨量')
      .color('name')
      .adjust('stack');
    geometry.init({
      theme: Theme,
    });
    expect(geometry.getYScale().min).toBe(0);
    expect(geometry.getYScale().max).toBe(200);

    syncScale(geometry.getYScale(), createScale('月均降雨量', data, {
      月均降雨量: {
        nice: true,
      },
    }));
    geometry.update();
    expect(geometry.getYScale().min).toBe(0);
    expect(geometry.getYScale().max).toBe(200);
  });

  it('group data', () => {
    const data = [
      { country: 'Asia', year: '1750', value: 502, percent: 0.6511024643320363 },
      { country: 'Africa', year: '1750', value: 106, percent: 0.13748378728923477 },
      { country: 'Europe', year: '1750', value: 163, percent: 0.21141374837872892 },
      { country: 'Asia', year: '1800', value: 635, percent: 0.671957671957672 },
      { country: 'Africa', year: '1800', value: 107, percent: 0.11322751322751323 },
      { country: 'Europe', year: '1800', value: 203, percent: 0.21481481481481482 },
      { country: 'Asia', year: '1850', value: 809, percent: 0.6764214046822743 },
      { country: 'Africa', year: '1850', value: 111, percent: 0.09280936454849498 },
      { country: 'Europe', year: '1850', value: 276, percent: 0.23076923076923078 },
    ];

    const countryScale = createScaleByField('country', data, { values: ['Europe', 'Asia', 'Africa'] });
    const yearScale = createScaleByField('year', data);
    const valueScale = createScaleByField('value', data);

    const geometry = new Geometry({
      data,
      coordinate,
      container: new G.Group({}),
      scales: {
        country: countryScale,
        year: yearScale,
        value: valueScale,
      },
      scaleDefs: {
        country: {
          values: ['Europe', 'Asia', 'Africa'],
        }
      },
    });

    geometry.position('year*value').color('country');
    geometry.init({
      theme: Theme,
    });

    // @ts-ignore
    const beforeMappingData = geometry.beforeMappingData;
    expect(beforeMappingData.length).toBe(3);
    expect(beforeMappingData[0][0].country).toBe('Europe');
    expect(beforeMappingData[1][0].country).toBe('Asia');
    expect(beforeMappingData[2][0].country).toBe('Africa');
  });
});

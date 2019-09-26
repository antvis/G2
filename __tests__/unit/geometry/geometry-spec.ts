import { Canvas, Group } from '@antv/g';
import * as Util from '@antv/util';
import { expect } from 'chai';
import { getTheme } from '../../../src';
import { getCoordinate } from '../../../src/dependents';
import Geometry from '../../../src/geometry/geometry';
import * as Shape from '../../../src/geometry/shape';
import { LooseObject, Point } from '../../../src/interface';

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

      const coord = new Rect({
        start: { x: 0, y: 200 },
        end: { x: 200, y: 0 },
      });
      geometry = new Geometry({
        data,
        coord,
        container: new Group(),
        theme: getTheme('default'),
        scaleDefs: {
          month: {
            range: [0.25, 0.75],
          },
        },
        animate: false,
        generatePoints: true,
        type: 'myInterval',
      });

      expect(geometry.type).to.equal('myInterval');
      expect(geometry.attrs).to.eql({});
      expect(geometry.scales).to.eql({});
      expect(geometry.elements).to.eql([]);
      expect(geometry.data).not.to.equal(undefined);
      expect(geometry.coord).not.to.equal(undefined);
      expect(geometry.container).not.to.equal(undefined);
      expect(geometry.theme).not.to.equal(undefined);
      expect(geometry.scaleDefs).not.to.equal(undefined);
      expect(geometry.animate).to.equal(false);
      expect(geometry.generatePoints).to.equal(true);
    });

    it('position()', () => {
      geometry.position('month*temperature');
      expect(geometry.attrOption.position).to.eql({
        fields: ['month', 'temperature'],
      });

      geometry.position({
        fields: ['month', 'temperature'],
      });
      expect(geometry.attrOption.position).to.eql({
        fields: ['month', 'temperature'],
      });
    });

    it('color()', () => {
      geometry.color('red'); // 颜色常量
      expect(geometry.attrOption.color).to.eql({
        fields: ['red'],
      });

      geometry.color('month'); // 字段
      expect(geometry.attrOption.color).to.eql({
        fields: ['month'],
      });

      geometry.color('month', ['red', 'blue']);
      expect(geometry.attrOption.color).to.eql({
        fields: ['month'],
        values: ['red', 'blue'],
      });

      geometry.color('month', () => {
        return 'red';
      });
      expect(geometry.attrOption.color).to.have.all.keys('fields', 'callback');
    });

    it('shape()', () => {
      geometry.shape('circle');
      expect(geometry.attrOption.shape).to.eql({
        fields: ['circle'],
      });

      geometry.shape('month', ['circle', 'square']);
      expect(geometry.attrOption.shape).to.eql({
        fields: ['month'],
        values: ['circle', 'square'],
      });

      geometry.shape('month', () => {
        return 'circle';
      });
      expect(geometry.attrOption.shape).to.have.all.keys('fields', 'callback');
      expect(geometry.attrOption.shape.fields).eql(['month']);
    });

    it('size()', () => {
      geometry.size(3);
      expect(geometry.attrOption.size).to.eql({
        values: [3],
      });

      geometry.size('temperature');
      expect(geometry.attrOption.size).to.eql({
        fields: ['temperature'],
      });

      geometry.size('temperature', [2, 10]);
      expect(geometry.attrOption.size).to.eql({
        fields: ['temperature'],
        values: [2, 10],
      });

      geometry.size('temperature', () => {
        return 0;
      });
      expect(geometry.attrOption.size).to.have.all.keys('fields', 'callback');
      expect(geometry.attrOption.size.fields).to.eql(['temperature']);
    });

    it('adjust()', () => {
      // 传入 object 类型
      geometry.adjust({
        type: 'stack',
      });
      expect(geometry.adjustOption).to.eql([{ type: 'stack' }]);

      // 传入数组
      geometry.adjust([
        {
          type: 'stack',
        },
      ]);

      expect(geometry.adjustOption).to.eql([{ type: 'stack' }]);

      geometry.adjust('stack');
      expect(geometry.adjustOption).to.eql([{ type: 'stack' }]);

      geometry.adjust(['stack']);
      expect(geometry.adjustOption).to.eql([{ type: 'stack' }]);
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

      expect(geometry.styleOption.callback).to.be.an.instanceOf(Function);

      geometry.style({
        lineWidth: 1,
      });
      expect(geometry.styleOption).to.eql({
        cfg: {
          lineWidth: 1,
        },
      });

      geometry.style('month', () => {
        return {
          lineWidth: 1,
        };
      });
      expect(geometry.styleOption.fields).to.eql(['month']);
      expect(geometry.styleOption.callback).to.be.an.instanceOf(Function);
    });

    it('tooltip()', () => {
      geometry.tooltip(false); // 关闭 geometry 上的 tooltip
      expect(geometry.tooltipOption).to.equal(false);

      geometry.tooltip(true); // 开启 geometry 上的 tooltip
      expect(geometry.tooltipOption).to.equal(true);

      geometry.tooltip('month*temperature');
      expect(geometry.tooltipOption).to.eql({
        fields: ['month', 'temperature'],
        callback: undefined,
      });

      geometry.tooltip('month*temperature', (month, temperature) => {
        return {
          name: month,
          value: temperature,
        };
      });
      expect(geometry.tooltipOption.fields).to.eql(['month', 'temperature']);
      expect(geometry.tooltipOption.callback).to.be.an.instanceOf(Function);

      geometry.tooltip({
        fields: ['month', 'temperature'],
      });

      const tooltipOptions = geometry.tooltipOption;
      expect(tooltipOptions.fields).to.eql(['month', 'temperature']);
    });

    it('animate', () => {
      // todo
    });
  });

  describe('Data mapping', () => {
    let geometry;
    let canvas;
    let div;
    before(() => {
      div = document.createElement('div');
      div.id = 'base';
      document.body.appendChild(div);

      canvas = new Canvas({
        containerId: 'base',
        renderer: 'canvas',
        width: 200,
        height: 200,
        pixelRatio: 2,
      });
      const data = [
        { month: '一月', temperature: 5, city: '北京', year: '2018' },
        { month: '二月', temperature: 10, city: '北京', year: '2018' },
        { month: '一月', temperature: 8, city: '南京', year: '2018' },
        { month: '二月', temperature: 14, city: '南京', year: '2018' },
      ];
      const coord = new Rect({
        start: { x: 0, y: 200 },
        end: { x: 200, y: 0 },
      });
      const container = canvas.addGroup();
      geometry = new Geometry({
        data,
        coord,
        animate: false,
        container,
        theme: getTheme('default'),
        generatePoints: true,
        shapeType: 'myInterval',
        scaleDefs: {
          month: {
            range: [0.25, 0.75],
          },
          temperature: {
            min: 0,
          },
        },
        type: 'interval',
      });

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
      expect(geometry.attrOption).to.have.all.keys('position', 'color', 'size');
      expect(geometry.tooltipOption).to.eql({ fields: ['year'], callback: undefined });
      expect(geometry.adjustOption).to.eql([{ type: 'dodge' }]);
    });

    it('init()', () => {
      geometry.init();

      // attrs 的生成
      const attrs = geometry.attrs;
      expect(attrs).to.have.all.keys('position', 'color', 'size');

      // scales 的生成
      const scales = geometry.scales;
      expect(scales).to.have.all.keys('month', 'temperature', 'city', 'year');
      expect(scales.month.range).to.eql([0.25, 0.75]);

      // 数据加工
      const dataArray = geometry.dataArray;
      expect(dataArray.length).to.equal(2);
      expect(dataArray[0][0].city).to.equal('北京');
      expect(dataArray[0][1].city).to.equal('北京');
      expect(dataArray[1][0].city).to.equal('南京');
      expect(dataArray[1][1].city).to.equal('南京');

      // 确保原始数据被保存
      Util.flatten(dataArray).forEach((obj: LooseObject) => {
        expect(obj._origin).not.to.equal(undefined);
      });

      // 确保 x 字段对应的数据被数字化且发生 dodge 调整
      expect(dataArray[0][0].month).to.equal(-0.1875);
      expect(dataArray[1][0].month).to.equal(0.1875);
      expect(dataArray[0][1].month).to.equal(0.8125);
      expect(dataArray[1][1].month).to.equal(1.1875);
    });

    it('paint()', () => {
      geometry.paint();

      const elements = geometry.elements;
      expect(elements.length).to.equal(4);
      expect(geometry.elementsMap).not.to.equal(undefined);
      expect(geometry.container.get('children').length).to.equal(4);
    });

    it('getGroupScales()', () => {
      const groupScales = geometry.getGroupScales();
      expect(groupScales.length).to.equal(1);
      expect(groupScales[0].field).to.equal('city');
    });

    it('getAttr()', () => {
      const colorAttr = geometry.getAttr('color');

      expect(colorAttr.type).to.equal('color');
    });

    it('getXScale()', () => {
      const xScale = geometry.getXScale();

      expect(xScale.field).to.equal('month');
    });

    it('getYScale()', () => {
      const yScale = geometry.getYScale();
      expect(yScale.field).to.equal('temperature');
    });

    it('getDefaultValue()', () => {
      const defaultSize = geometry.getDefaultValue('size');

      expect(defaultSize).to.equal(3);
    });

    it('update()', () => {
      const updateElement = geometry.elements[1];
      const deleteElement = geometry.elements[0];

      geometry.update([
        { month: '二月', temperature: 20, city: '北京', year: '2018' },
        { month: '二月', temperature: 14, city: '南京', year: '2018' },
        { month: '三月', temperature: 24, city: '南京', year: '2018' },
      ]);

      expect(geometry.data.length).to.equal(3);

      const elements = geometry.elements;
      expect(elements.length).to.equal(3);

      const elementsMap = geometry.elementsMap;
      expect(elementsMap).to.have.all.keys('二月-北京', '二月-南京', '三月-南京');

      const xScale = geometry.getXScale();
      expect(xScale.values).to.eql(['二月', '三月']);
      expect(deleteElement.destroyed).to.equal(true);

      expect(updateElement.getData()).to.eql({ month: '二月', temperature: 20, city: '北京', year: '2018' });
    });

    it('clear()', () => {
      geometry.clear();

      expect(geometry.container.get('children').length).to.equal(0);
      expect(geometry.attrs).to.eql({});
      expect(geometry.scales).to.eql({});
      expect(geometry.elementsMap).to.eql({});
      expect(geometry.lastElementsMap).to.eql({});
      expect(geometry.elements).to.eql([]);
      expect(geometry.groupScales).to.equal(null);
    });

    it('destroy()', () => {
      geometry.destroy();

      expect(canvas.get('children').length).to.equal(0);
    });

    after(() => {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });
});

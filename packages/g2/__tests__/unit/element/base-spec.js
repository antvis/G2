import * as _ from '@antv/util';
import { Canvas } from '@antv/g';
import { expect } from 'chai';
import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Element from '../../../src/element/base';
import Theme from '../../../src/theme/default';
import { registerShapeFactory, registerShape } from '../../../src/element/shape/base';
import { splitPoints, setFillStyle } from '../../../src/element/util/shape';
import View from '../../utils/view';

const Rect = getCoordinate('rect');
const CatScale = getScale('cat');
const LinearScale = getScale('linear');

describe('Element', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const view = new View();
  const coord = new Rect({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
  });
  const canvas = new Canvas({
    containerDOM: div,
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  describe('Element: initialize and setting', () => {
    let element;
    const data = [
      { month: '一月', temperature: 5, day: 1 },
      { month: '一月', temperature: 6, day: 2 },
      { month: '一月', temperature: 10, day: 3 },
      { month: '二月', temperature: 10, day: 1 },
      { month: '二月', temperature: 9, day: 2 },
      { month: '二月', temperature: 8, day: 3 },
    ];
    const monthScale = new CatScale({
      field: 'month',
      values: ['一月', '二月'],
    });
    const temperatureScale = new LinearScale({
      field: 'temperature',
      values: [5, 6, 10, 10, 9, 8],
      min: 5,
      max: 10,
    });

    it('Constructor', () => {
      element = new Element({
        view,
        data,
        coord,
        scales: {
          month: monthScale,
          temperature: temperatureScale,
        },
        type: 'interval',
      });
      expect(element.get('visible')).to.be.true;
      expect(element.get('type')).to.equal('interval');
    });

    it('position()', () => {
      element.position('month*temperature');
      expect(element.get('attrOptions').position).to.eql({
        fields: ['month', 'temperature'],
      });

      element.position({
        fields: ['month', 'temperature'],
      });
      expect(element.get('attrOptions').position).to.eql({
        fields: ['month', 'temperature'],
      });
    });

    it('color()', () => {
      element.color('red'); // 颜色常量
      expect(element.get('attrOptions').color).to.eql({
        fields: ['red'],
      });

      element.color('month'); // 字段
      expect(element.get('attrOptions').color).to.eql({
        fields: ['month'],
      });

      element.color('month', ['red', 'blue']);
      expect(element.get('attrOptions').color).to.eql({
        fields: ['month'],
        values: ['red', 'blue'],
      });

      element.color('month', () => {
        return 'red';
      });
      expect(element.get('attrOptions').color.fields).eql(['month']);
      expect(element.get('attrOptions').color.callback).to.be.an.instanceOf(Function);
    });

    it('shape()', () => {
      element.shape('circle');
      expect(element.get('attrOptions').shape).to.eql({
        fields: ['circle'],
      });

      element.shape('month', ['circle', 'square']);
      expect(element.get('attrOptions').shape).to.eql({
        fields: ['month'],
        values: ['circle', 'square'],
      });

      element.shape('month', () => {
        return 'circle';
      });
      expect(element.get('attrOptions').shape.fields).eql(['month']);
      expect(element.get('attrOptions').shape.callback).to.be.an.instanceOf(Function);
    });

    it('size()', () => {
      element.size(3);
      expect(element.get('attrOptions').size).to.eql({
        values: [3],
      });

      element.size('temperature');
      expect(element.get('attrOptions').size).to.eql({
        fields: ['temperature'],
      });

      element.size('temperature', [2, 10]);
      expect(element.get('attrOptions').size).to.eql({
        fields: ['temperature'],
        values: [2, 10],
      });

      element.size('temperature', () => {
        return 0;
      });
      expect(element.get('attrOptions').size.fields).to.eql(['temperature']);
      expect(element.get('attrOptions').size.callback).to.be.an.instanceOf(Function);
    });

    it('opacity()', () => {
      element.opacity(0.3);
      expect(element.get('attrOptions').opacity).to.eql({
        values: [0.3],
      });

      element.opacity('temperature');
      expect(element.get('attrOptions').opacity).to.eql({
        fields: ['temperature'],
      });

      element.opacity('temperature', () => {
        return 0;
      });
      expect(element.get('attrOptions').opacity.fields).to.eql(['temperature']);
      expect(element.get('attrOptions').opacity.callback).to.be.an.instanceOf(Function);
    });

    it('attribute mapping', () => {
      element
        .position({
          fields: ['month', 'temperature'],
        })
        .color({
          fields: ['month'],
        })
        .size({
          fields: ['temperature'],
        })
        .opacity({
          fields: ['temperature'],
        })
        .shape({
          fields: ['month'],
        });
      const attrOptions = element.get('attrOptions');
      expect(attrOptions).to.have.keys(['position', 'color', 'size', 'opacity', 'shape']);
    });

    it('adjust()', () => {
      // 传入 object 类型
      element.adjust({
        type: 'stack',
      });
      expect(element.get('adjustOptions').length).to.equal(1);

      // 传入数组
      element.adjust([
        {
          type: 'stack',
        },
      ]);

      expect(element.get('adjustOptions').length).to.equal(1);

      element.adjust('stack');
      expect(element.get('adjustOptions')).to.eql([
        {
          type: 'stack',
        },
      ]);

      element.adjust(['stack']);
      expect(element.get('adjustOptions')).to.eql([
        {
          type: 'stack',
        },
      ]);
    });

    it('hasAdjust()', () => {
      expect(element.hasAdjust('stack')).to.be.true;
      expect(element.hasAdjust('dodge')).to.be.false;
    });

    it('label()', () => {
      element.label('temperature');
      expect(element.get('labelOptions')).to.eql({
        fields: ['temperature'],
        callback: undefined,
      });

      element.label(false);
      expect(element.get('labelOptions')).to.be.false;

      element.label('temperature', () => null);
      expect(element.get('labelOptions').callback).to.be.an.instanceOf(Function);

      element.label({
        fields: ['temperature'],
        callback: () => {
          return null;
        },
      });
      expect(element.get('labelOptions').fields).to.eql(['temperature']);
      expect(element.get('labelOptions').callback).to.be.an.instanceOf(Function);
    });

    it('style()', () => {
      element.style({
        callback() {
          return {
            lineWidth: 1,
            stroke: '#1890ff',
          };
        },
      });

      expect(element.get('styleOptions').callback).to.be.an.instanceOf(Function);

      element.style({
        lineWidth: 1,
      });
      expect(element.get('styleOptions')).to.eql({
        cfg: {
          lineWidth: 1,
        },
      });

      element.style('month', () => {
        return {
          lineWidth: 1,
        };
      });
      expect(element.get('styleOptions').fields).to.eql(['month']);
      expect(element.get('styleOptions').callback).to.be.an.instanceOf(Function);
    });

    it('tooltip()', () => {
      element.tooltip(false); // 关闭 element 上的 tooltip
      expect(element.get('tooltipOptions')).to.be.false;

      element.tooltip(true); // 开启 element 上的 tooltip
      expect(element.get('tooltipOptions')).to.be.true;

      element.tooltip('month*temperature');
      expect(element.get('tooltipOptions')).to.eql({
        fields: ['month', 'temperature'],
        callback: undefined,
      });

      element.tooltip('month*temperature', (month, temperature) => {
        return {
          name: month,
          value: temperature,
        };
      });
      expect(element.get('tooltipOptions').fields).to.eql(['month', 'temperature']);
      expect(element.get('tooltipOptions').callback).to.be.an.instanceOf(Function);

      element.tooltip({
        fields: ['month', 'temperature'],
      });

      const tooltipOptions = element.get('tooltipOptions');
      expect(tooltipOptions.fields).to.eql(['month', 'temperature']);
    });

    it('animate()', () => {
      expect(element.get('animate')).to.be.true; // 默认开启动画

      element.animate({
        appear: {
          duration: 1000,
        },
      });
      expect(element.get('animateOptions')).to.eql({
        appear: {
          duration: 1000,
        },
      });

      element.animate(false); // 关闭动画
      expect(element.get('animateOptions')).to.be.false;
    });

    it('getLegendFields()', () => {
      const legendFields = element.getLegendFields();
      expect(legendFields).to.eql(['month', 'temperature']);
    });

    it('_initAttrs()', () => {
      element._initAttrs(data);

      const attrs = element.get('attrs');
      const scales = element.get('scales');

      expect(attrs).to.have.keys(['position', 'color', 'size', 'opacity', 'shape']);
      expect(attrs.color.values).to.eql(Theme.colors);
      expect(attrs.size.values).to.eql(Theme.sizes);
      expect(attrs.opacity.values).to.eql(Theme.opacities);

      expect(scales).to.have.keys(['month', 'temperature']);
    });

    it('getAttr()', () => {
      const colorAttr = element.getAttr('color');
      expect(colorAttr.values).to.eql(Theme.colors);
      expect(colorAttr.scales[0].field).to.equal('month');
    });

    it('getXScale()', () => {
      const xScale = element.getXScale();

      expect(xScale.field).to.equal('month');
      expect(xScale.type).to.equal('cat');
    });

    it('getYScale()', () => {
      const yScale = element.getYScale();

      expect(yScale.field).to.equal('temperature');
      expect(yScale.type).to.equal('linear');
    });

    it('isInCircle()', () => {
      expect(element.isInCircle()).to.be.false;
    });
  });

  describe('Element, init()', () => {
    const data = [
      { month: '一月', temperature: 5, city: '北京', year: '2018' },
      { month: '二月', temperature: 10, city: '北京', year: '2018' },
      { month: '一月', temperature: 8, city: '南京', year: '2018' },
      { month: '二月', temperature: 14, city: '南京', year: '2018' },
    ];
    const monthScale = new CatScale({
      field: 'month',
      values: ['一月', '二月'],
    });
    const temperatureScale = new LinearScale({
      field: 'temperature',
      values: [5, 10, 8, 14],
      min: 5,
      max: 14,
    });
    const cityScale = new CatScale({
      field: 'city',
      values: ['北京', '南京'],
    });
    const yearScale = new CatScale({
      field: 'year',
      values: ['2018'],
    });
    const element = new Element({
      view,
      data,
      coord,
      animate: false,
      container: canvas.addGroup(),
      scales: {
        month: monthScale,
        temperature: temperatureScale,
        city: cityScale,
        year: yearScale,
      },
    });
    element
      .position({
        fields: ['month', 'temperature'],
      })
      .color({
        fields: ['city'],
        callback(val) {
          return val === '北京' ? '#1890ff' : '#FACC14';
        },
      })
      .adjust([
        {
          type: 'dodge',
        },
      ])
      .tooltip({
        fields: ['year'],
      })
      .size({
        values: [3],
      })
      .label({
        fields: ['temperature'],
      });

    it('init()', () => {
      element.init();

      // 确保 attrs 生成
      const attrs = element.get('attrs');
      expect(attrs).to.have.keys(['position', 'color', 'size']);

      // 确保 scales 生成
      const scales = element.get('scales');
      expect(scales).to.have.keys(['month', 'temperature', 'city', 'year']);
      expect(scales.year.type).to.equal('cat');

      const dataArray = element.get('dataArray'); // 数据处理后的结果

      // 确保数据根据 city 被分成两组
      expect(dataArray.length).to.equal(2);
      expect(dataArray[0][0].city).to.equal('北京');
      expect(dataArray[0][1].city).to.equal('北京');
      expect(dataArray[1][0].city).to.equal('南京');
      expect(dataArray[1][1].city).to.equal('南京');

      // 确保原始数据被保存
      _.flatten(dataArray).forEach((obj) => {
        expect(obj._origin).not.to.be.undefined;
      });

      // 确保 x 字段对应的数据被数字化且发生 dodge 调整
      expect(dataArray[0][0].month).to.equal(-0.1875);
      expect(dataArray[1][0].month).to.equal(0.1875);
      expect(dataArray[0][1].month).to.equal(0.8125);
      expect(dataArray[1][1].month).to.equal(1.1875);
    });

    it('getDefaultValue()', () => {
      // 获取常量的默认值
      const sizeDefaultValue = element.getDefaultValue('size');
      expect(sizeDefaultValue).to.equal(3);

      // 非常量
      const colorDefaultValue = element.getDefaultValue('color');
      expect(colorDefaultValue).to.be.undefined;
    });
  });

  describe('Element, paint()', () => {
    const yearScale = new LinearScale({
      field: 'year',
      min: 1991,
      max: 1999,
      nice: false,
    });

    const valueScale = new LinearScale({
      field: 'value',
      min: 0,
      max: 14,
      nice: false,
    });
    const container = canvas.addGroup();
    const frontgroundGroup = canvas.addGroup();

    const data = [
      { year: 1997, value: 7 },
      { year: 1995, value: 4.9 },
      { year: 1991, value: 3 },
      { year: 1993, value: 3.5 },
      { year: 1992, value: 4 },
      { year: 1994, value: 5 },
      { year: 1998, value: 9 },
      { year: 1996, value: 6 },
      { year: 1999, value: 13 },
    ];
    coord.scale(1, -1); // coord 进行变换操作

    // 创建 element 实例
    const element = new Element({
      id: 'view-geom',
      data,
      coord,
      view,
      container,
      frontgroundGroup,
      canvas,
      scales: {
        year: yearScale,
        value: valueScale,
      },
      type: 'point-x',
      shapeType: 'point-x',
      sortable: true,
      generatePoints: true,
    });

    // 注册 point Shape
    registerShapeFactory('point-x', {
      defaultShapeType: 'circle',
      getDefaultPoints(pointInfo) {
        return splitPoints(pointInfo);
      },
    });
    registerShape('point-x', 'circle', {
      draw(cfg, container) {
        const attrs = {
          x: cfg.x,
          y: cfg.y,
          ...cfg.style,
        };
        setFillStyle(attrs, cfg);
        return container.addShape('Circle', {
          attrs,
        });
      },
    });

    it('initialize', () => {
      expect(element.get('shapeType')).to.equal('point-x');
      expect(element.get('sortable')).to.be.true;

      const shapeContainer = element.get('shapeContainer');
      expect(shapeContainer).not.to.be.undefined;
      expect(shapeContainer.get('viewId')).to.equal('view');
      expect(shapeContainer.get('visible')).to.be.true;
    });

    it('_getShapeFactory()', () => {
      const shapeFactory = element._getShapeFactory();

      expect(shapeFactory.defaultShapeType).to.equal('circle');
      expect(element.get('shapeFactory')).not.to.be.undefined;
    });

    it('_beforeMapping', () => {
      element
        .position({
          fields: ['year', 'value'],
        })
        .color({
          values: ['red'],
        })
        .label({
          fields: ['value'],
        })
        .animate(false) // 关闭动画
        .style({
          callback() {
            return {
              lineWidth: 1,
              stroke: '#000',
              r: 5,
            };
          },
        });
      element.init();
      const dataArray = element.get('dataArray');
      element._beforeMapping(dataArray);

      const years = _.flatten(dataArray).map((obj) => {
        return obj.year;
      });

      expect(years).to.eql([1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]);

      const shapeContainer = element.get('shapeContainer');
      expect(shapeContainer.getMatrix()).to.eql([1, 0, 0, 0, -1, 0, 0, 200, 1]);
      expect(shapeContainer.getMatrix()).to.eql(coord.matrix);
    });

    it('_mapping', () => {
      const dataArray = element.get('dataArray');
      const mappedData = element._mapping(dataArray[0]);

      expect(mappedData.length).to.equal(9);
      // expect(mappedData).to.eql([]);
      expect(mappedData[0].x).to.equal(0);
      expect(mappedData[8].x).to.equal(200);
      expect(mappedData[6].x).to.equal(150);
      expect(mappedData[6].y).to.equal(100);
    });

    it('getDrawCfg()', () => {
      const dataArray = element.get('dataArray');
      const mappedData = element._mapping(dataArray[0]);
      const drawCfg = element.getDrawCfg(mappedData[2]);

      expect(drawCfg.style).to.eql({
        lineWidth: 1,
        r: 5,
        stroke: '#000',
      });
      expect(drawCfg.id).to.equal('view-geom-1993-3.5');
      expect(drawCfg.color).to.equal('red');
    });

    it('paint()', () => {
      element.paint();
      canvas.draw();

      const dataArray = element.get('dataArray');
      expect(dataArray[0][1].color).to.equal('red');
      expect(container.get('children')[0].get('children').length).equal(9);

      const secondPoint = container.get('children')[0].get('children')[1];
      const secondPointData = dataArray[0][1];

      expect(secondPoint.attr('x')).to.equal(secondPointData.x);
      expect(secondPoint.attr('y')).to.equal(secondPointData.y);
    });

    it('getShapes()', () => {
      const shapes = element.getShapes();

      expect(shapes.length).to.equal(9);
      shapes.forEach((shape, idx) => {
        expect(shape.get('type')).to.equal('Circle');
        expect(shape.get('index')).to.equal(idx);
        expect(shape.get('origin')).not.to.be.undefined;
        expect(shape.get('coord')).not.to.be.undefined;
        expect(shape.get('animateOptions')).to.be.false;
      });
    });

    it('changeVisible', () => {
      // stopDraw is undefined
      element.changeVisible(false);

      const shapeContainer = element.get('shapeContainer');
      expect(element.get('visible')).to.be.false;
      expect(shapeContainer.get('visible')).to.be.false;
      expect(shapeContainer.get('children').length).to.equal(9);
      // TODO labelContainer

      // stopDraw is true
      element.changeVisible(true, true);
      expect(element.get('visible')).to.be.true;
      expect(shapeContainer.get('visible')).to.be.true;
      // TODO labelContainer
    });

    it('clear', () => {
      element.clear();
      expect(element.get('scales')).to.be.empty;
      expect(element.get('attrs')).to.be.empty;
      expect(element.get('groupScales')).to.be.null;
      expect(element.get('shapeContainer').get('children')).to.be.empty;
    });

    it('destroy', () => {
      element.destroy();
      expect(element.destroyed).to.be.true;
      expect(element.cfg).to.be.empty;
      // expect(container.get('children')).to.be.empty;
      expect(container.destroyed).to.be.true;
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

import { expect } from 'chai';
import { Canvas, BBox } from '@antv/g';
import '../../../src';
import View from '../../../src/plot/view';
import { getFacet } from '../../../src/facet';

describe('View', () => {
  const div = document.createElement('div');
  div.id = 'view';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'view',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  describe('default', () => {
    const view = new View({
      canvas,
      container: canvas.addGroup(),
      width: 200,
      height: 200,
      padding: 30,
    });

    it('init', () => {
      expect(view.get('scaleController')).not.equal(null);
      expect(view.get('coordController')).not.equal(null);

      expect(view.get('viewRange')).not.to.be.undefined;
      expect(view.get('viewRange').x).to.equal(0);
      expect(view.get('viewRange').y).to.equal(0);
      expect(view.get('viewRange').width).to.equal(200);
      expect(view.get('viewRange').height).to.equal(200);

      expect(view.get('panelRange')).not.to.be.undefined;
      expect(view.get('panelRange').x).to.equal(30);
      expect(view.get('panelRange').y).to.equal(30);
      expect(view.get('panelRange').width).to.equal(140);
      expect(view.get('panelRange').height).to.equal(140);
    });

    it('axis', () => {
      expect(view.axis).to.be.a('function');

      view.axis(); // 传入空参
      expect(view.get('options').axes).to.be.undefined;

      view.axis(false); // 不展示坐标轴
      expect(view.get('options').axes).to.be.false;

      view.axis('a', false); // 不展示 a 字段对应的坐标轴
      expect(view.get('options').axes).to.eql({
        fields: { a: false },
      });

      view.axis({
        a: {
          position: 'top',
        },
        b: false,
      });
      expect(view.get('options').axes).to.eql({
        fields: {
          a: {
            position: 'top',
          },
          b: false,
        },
      });

      view.axis('b', {
        position: 'right',
      });

      expect(view.get('options').axes).to.eql({
        fields: {
          a: {
            position: 'top',
          },
          b: {
            position: 'right',
          },
        },
      });
    });

    it('title', () => { // TODO
      view.title();
      expect(view.title).to.be.a('function');
    });

    it('tooltip', () => {
      view.tooltip();
      expect(view.get('options').tooltip).to.eql({});

      view.tooltip(false);
      expect(view.get('options').tooltip).to.equal(false);

      view.tooltip(true, {
        showTitle: false,
      });
      expect(view.get('options').tooltip).to.eql({
        showTitle: false,
      });

      view.tooltip({
        title: 'a',
        showTitle: true,
      });
      expect(view.get('options').tooltip).to.eql({
        title: 'a',
        showTitle: true,
      });
    });

    it('legend', () => {
      expect(view.legend).to.be.a('function');
      const options = view.get('options');

      // method 1
      view.legend(false);
      expect(options.legends).to.be.equal(false);

      // method 2
      view.legend({ custom: true, position: 'right' });
      expect(options.legends).to.be.eql({ custom: true, position: 'right' });

      // method 3
      view.legend('field1', false);
      expect(options.legends).to.be.eql({
        custom: true,
        position: 'right',
        fields: {
          field1: false,
        },
      });

      // method 4
      view.legend('field2', { position: 'right' });
      expect(options.legends).to.be.eql({
        custom: true,
        position: 'right',
        fields: {
          field1: false,
          field2: { position: 'right' },
        },
      });

      // close, clear mock data
      view.legend(false);
    });

    it('annotation', () => {
      const annotation = view.annotation();
      annotation.add('line', {
        start: {
          a: 1,
          b: 2
        },
        end: {
          a: 3,
          b: 4
        },
        text: {
          content: '辅助线的辅助文本',
          position: 0.3
        },
      });
      expect(annotation.options.length).to.equal(1);
    });

    it('filter', () => {
      expect(view.filter).to.be.a('function');

      const condition = (r) => !!r;

      view.filter('field1', condition);
      expect(view.get('options').filters.field1).to.be.equal(condition);

      view.filter('field1', () => true);
    });

    it('coordinate', () => {
      expect(view.coordinate).to.be.a('function');

      let coordinateController = view.coordinate();
      expect(coordinateController.type).to.equal('rect');
      expect(coordinateController.actions).to.eql([]);
      expect(view.get('options').coord).to.eql({
        type: 'rect',
        cfg: undefined,
        actions: [],
      });

      coordinateController = view.coordinate({
        type: 'polar',
        cfg: {
          radius: 0.8,
        }
      }).transpose();
      expect(coordinateController.type).to.equal('polar');
      expect(coordinateController.actions).to.eql([ [ 'transpose' ] ]);
      expect(coordinateController.cfg).to.eql({
        radius: 0.8,
      });
      expect(view.get('options').coord).to.eql({
        type: 'polar',
        cfg: {
          radius: 0.8,
        },
        actions: [ [ 'transpose' ] ],
      });

      coordinateController = view.coordinate('polar', {
        radius: 0.8,
        innerRadius: 0.2,
      });
      expect(coordinateController.type).to.equal('polar');
      expect(coordinateController.actions).to.eql([]);
      expect(coordinateController.cfg).to.eql({
        radius: 0.8,
        innerRadius: 0.2,
      });
      expect(view.get('options').coord).to.eql({
        type: 'polar',
        cfg: {
          radius: 0.8,
          innerRadius: 0.2,
        },
        actions: [],
      });
    });

    it('facet', () => {
      expect(() => {
        view.facet({ type: 'not-exist' });
      }).throw('facet \'not-exist\' is not exist!');

      view.facet({
        type: 'rect',
        fields: [ 'a', 'b' ]
      });

      expect(view.get('facet')).to.be.an.instanceof(getFacet('rect'));
    });

    it('animate', () => {
      view.animate(true);
      expect(view.get('options').animate).to.be.true;

      view.animate(false);
      expect(view.get('options').animate).to.be.false;
    });

    it('createView', () => { // TODO
      // view.createView();
      expect(view.createView).to.be.a('function');

      const childView = view.createView();
      expect(childView.get('options').coord).to.eql({
        type: 'polar',
        cfg: {
          radius: 0.8,
          innerRadius: 0.2,
        },
        actions: [],
      });

      view.removeView(childView);
    });

    it('options', () => {
      expect(view.get('options')).not.equal(null);
    });

    it('getXScale, when elements empty', () => {
      expect(view.getXScale()).to.be.null;
    });

    it('getYScales, when elements empty', () => {
      expect(view.getYScales()).to.eql([]);
    });

    it('data', () => {
      const data = [
        { a: 1, b: 2 },
        { a: 2, b: 5 },
        { a: 3, b: 4 },
      ];
      view.data(data);
      expect(view.get('data')).to.eql(data);
    });

    it('scale', () => {
      view.scale('a', {
        type: 'linear',
        min: 0,
      });
      expect(view.get('options').scales).to.eql({
        a: {
          type: 'linear',
          min: 0,
        },
      });

      view.scale({
        a: {
          type: 'linear',
          min: -1,
        },
        b: {
          type: 'linear',
          min: 0,
        },
      });
      expect(view.get('options').scales).to.eql({
        a: {
          type: 'linear',
          min: -1,
        },
        b: {
          type: 'linear',
          min: 0,
        },
      });

      const scaleController = view.get('scaleController');
      expect(scaleController.defs).to.eql({
        a: {
          type: 'linear',
          min: -1,
        },
        b: {
          type: 'linear',
          min: 0,
        },
      });
    });

    it('element method', () => {
      expect(view.line).to.be.a('function');
      expect(view.point).to.be.a('function');
    });

    it('add elements', () => {
      const line = view.line()
        .position({
          fields: [ 'a', 'b' ],
        })
        .color({
          values: [ 'red' ],
        });
      expect(view.get('elements').length).to.equal(1);
      expect(view.get('elements')[0]).to.equal(line);
    });

    it('render', () => {
      view.render();
      canvas.draw();
      expect(view.get('container').getCount()).equal(3);
    });

    it('getXScale(), when elements not empty', () => {
      const xScale = view.getXScale();
      expect(xScale.field).to.equal('a');
      expect(xScale.isLinear).to.be.true;
    });

    it('getYScales(), when elements not empty', () => {
      const yScales = view.getYScales();

      expect(yScales.length).to.equal(1);
      expect(yScales[0].field).to.equal('b');
      expect(yScales[0].isLinear).to.be.true;
    });

    it('changeVisible', () => {
      view.changeVisible(false);
      expect(view.get('container').get('visible')).to.be.false;
    });

    it('getElements', () => {
      // 暂时没有一个例子，体现 recursive 的区别
      expect(view.getElements(false).length).to.be.equal(1);
      expect(view.getElements().length).to.be.equal(1);
    });

    it('getFilteredValues & getFilteredOutValues', () => {
      view.filter('a', (r) => r !== 2);
      expect(view.getFilteredValues('a')).to.be.eql([ 1, 3 ]);
      expect(view.getFilteredOutValues('a')).to.be.eql([ 2 ]);
    });

    it('repaint', () => {
      expect(view.repaint).to.be.a('function');
    });

    it('changeData', () => {
      const data = [
        { a: 10, b: 2 },
        { a: 20, b: 5 },
      ];
      let beforechangedataCalled = false;
      let afterchangedataCalled = false;
      view.on('beforechangedata', () => {
        beforechangedataCalled = true;
      });
      view.on('afterchangedata', () => {
        afterchangedataCalled = true;
      });

      view.changeData(data);

      expect(view.get('data')).to.eql(data);
      expect(afterchangedataCalled).to.be.true;
      expect(beforechangedataCalled).to.be.true;
    });

    it('clear', () => {
      view.clear();

      expect(view.get('elements').length).to.equal(0);
      expect(view.get('panelGroup').getCount()).to.equal(0);
    });

    it('destroy', () => {
      view.destroy();
      expect(view.destroyed).to.equal(true);
      canvas.draw();
    });
  });

  describe('view with adjustScales and filter data', () => {
    const view = new View({
      canvas,
      container: canvas.addGroup(),
      width: 200,
      height: 200,
      padding: 0,
      data: [
        { x: 'a', y: 100 },
        { x: 'b', y: 20 },
        { x: 'c', y: 78 },
      ],
      options: {
        animate: false,
        filters: {
          x: (val) => val !== 'b',
        },
      },
    });
    view.interval().position({
      fields: [ 'x', 'y' ],
    }).color({
      fields: [ 'x' ],
    });
    view.render();

    it('animate should be false', () => {
      expect(view.get('animate')).to.be.false;
    });

    it('should render correctly', () => {
      const elements = view.get('elements');
      expect(elements.length).to.equal(1);
      expect(elements[0].getShapes().length).to.equal(2);
    });

    it('x and y scales should be adjust', () => {
      const xScale = view.getXScale();
      const yScale = view.getYScales()[0];

      expect(xScale.values.length).to.equal(3);
      expect(xScale.range).to.eql([ 1 / 6, 1 - 1 / 6 ]);
      expect(yScale.min).to.equal(0);
    });

    it('clear', () => {
      view.clear();
      expect(view.get('elements').length).to.equal(0);
      expect(view.get('panelGroup').getCount()).to.equal(0);
    });

    it('filterData', () => {
      const filteredData = view.get('filteredData');
      expect(filteredData).to.eql([
        { x: 'a', y: 100 },
        { x: 'c', y: 78 },
      ]);
    });

    it('destroy', () => {
      view.destroy();
      expect(view.destroyed).to.equal(true);
      canvas.draw();
    });
  });

  // 如后期 auto padding 功能加入时逻辑有变该测试用例可删除
  describe('view has parent', () => {
    let view;

    it('calculate region correctly, start and end is between 0 ~ 1', () => {
      view = new View({
        canvas,
        container: canvas.addGroup(),
        parent: {
          get() {
            return new BBox(10, 10, 180, 180);
          }
        },
        start: { x: 0.1, y: 0.1 },
        end: { x: 0.5, y: 0.5 },
        padding: 10,
        animate: false,
      });

      const panelRange = view.get('panelRange');
      const viewRange = view.get('viewRange');

      expect(panelRange.tl).to.eql({ x: 38, y: 38 });
      expect(panelRange.br).to.eql({ x: 90, y: 90 });
      expect(viewRange.tl).to.eql({ x: 28, y: 28 });
      expect(viewRange.br).to.eql({ x: 100, y: 100 });
    });

    it('calculate region correctly, start and end is pixel value', () => {
      view = new View({
        canvas,
        container: canvas.addGroup(),
        parent: {
          get() {
            return new BBox(10, 5, 180, 180);
          }
        },
        start: { x: 50, y: 50 },
        end: { x: 150, y: 150 },
        padding: 10,
        animate: false,
      });

      const panelRange = view.get('panelRange');
      const viewRange = view.get('viewRange');

      expect(panelRange.tl).to.eql({ x: 70, y: 65 });
      expect(panelRange.br).to.eql({ x: 150, y: 145 });
      expect(viewRange.tl).to.eql({ x: 60, y: 55 });
      expect(viewRange.br).to.eql({ x: 160, y: 155 });
    });

    it('destroy', () => {
      view.destroy();
      expect(view.destroyed).to.equal(true);
      canvas.draw();
    });
  });

  describe('Other methods', () => {
    const view = new View({
      canvas,
      container: canvas.addGroup(),
      width: 200,
      height: 200,
      padding: 30,
      animate: false,
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
      ],
    });
    view.scale('sales', {
      nice: false,
    });
    view.tooltip(false);
    view.area().position('year*sales').shape('smooth');
    view.render();

    it('getXY()', () => {
      const position = view.getXY({ year: '1960 年', sales: 38 });
      expect(position).to.eql({ x: 143.75, y: 170 });
    });

    it('showTooltip()', () => {
      let tooltipShowCalled = false;
      view.on('tooltip:show', () => {
        tooltipShowCalled = true;
      });
      const position = view.getXY({ year: '1960 年', sales: 38 });
      view.showTooltip(position);

      const tooltipItems = view.get('tooltipController').tooltip.get('items');
      expect(tooltipItems.length).to.equal(1);
      expect(tooltipItems[0].title).to.equal('1960 年');

      expect(tooltipShowCalled).to.be.true;
    });

    it('getTooltipItems()', () => {
      const position = view.getXY({ year: '1960 年', sales: 38 });
      const tooltipItems = view.getTooltipItems(position);

      expect(tooltipItems.length).to.equal(1);
      expect(tooltipItems[0].title).to.equal('1960 年');
    });

    it('hideTooltip()', () => {
      let tooltipHideCalled = false;
      view.on('tooltip:hide', () => {
        tooltipHideCalled = true;
      });
      view.hideTooltip();
      expect(tooltipHideCalled).to.be.true;
    });

    it('destroy', () => {
      view.destroy();
      expect(view.destroyed).to.equal(true);
      canvas.draw();
    });
  });

  describe('when data is not defined', () => {
    it('it should work when data is not defined', () => {
      expect(() => {
        const view = new View({
          canvas,
          container: canvas.addGroup(),
          width: 200,
          height: 200,
          padding: 30,
          animate: false,
        });

        view.line().position('year*sales').shape('smooth');
        view.render();
      }).not.to.throw();
    });
  });

  // TODO add other test cases here

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

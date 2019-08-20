import { expect } from 'chai';
import { Canvas } from '@antv/g';
import EdgeShapeFactory from '../../../../src/element/shape/edge';
import * as Shape from '../../../../src/element/shape/base';
import { getCoord } from '@antv/coord';
import Global from '../../../../src/global';

const Rect = getCoord('rect');

describe('Edge shape factory', () => {
  let div;
  let canvas;

  before(() => {
    div = document.createElement('div');
    div.id = 'edge-shape';
    document.body.appendChild(div);

    const coord = new Rect({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });

    canvas = new Canvas({
      containerId: 'edge-shape',
      width: 500,
      height: 500,
    });

    EdgeShapeFactory.setCoord(coord);
    EdgeShapeFactory.setTheme(Global.theme.shape);
  });

  describe('edge: default & common', () => {
    it('defaultShapeType', () => {
      expect(EdgeShapeFactory.defaultShapeType).to.be.equal('line');
    });

    it('has 4 built-in shapes', () => {
      expect(EdgeShapeFactory.getShape('line')).to.be.an.instanceof(Object);
      // 阶梯折线, 应用场景: 径向树图
      expect(EdgeShapeFactory.getShape('vhv')).to.be.an.instanceof(Object);
      expect(EdgeShapeFactory.getShape('smooth')).to.be.an.instanceof(Object);
      expect(EdgeShapeFactory.getShape('arc')).to.be.an.instanceof(Object);
      // 未注册的shape 默认使用defaultShapeType
      expect(EdgeShapeFactory.getShape('test')).to.be.equal(EdgeShapeFactory.getShape('line'));
      expect(EdgeShapeFactory.getShape('test')).to.not.be.equal(EdgeShapeFactory.getShape('vhv'));
    });

    it('getMarkerStyle', () => {
      const point = {};
      const markerStyle = EdgeShapeFactory.getMarkerStyle('line', point);
      expect(markerStyle.radius).to.be.equal(4.5);
      expect(markerStyle.symbol).eql('circle');
    });

    it('getActiveStyle', () => {
      const cfg = {
        lineWidth: 1,
      };
      const activeStyle = EdgeShapeFactory.getActiveStyle('line', cfg);
      expect(activeStyle).to.eql({ lineWidth: 2 });
    });
  });

  describe('edge: default', () => {
    it('get Edge Points', () => {
      const points = EdgeShapeFactory.getShapePoints('line', {
        x: [ 0.1, 0.2 ],
        y: [ 0.3, 0.5 ],
      });
      expect(points.length).equal(2);
      expect(points[0].x).equal(0.1);
      expect(points[0].y).equal(0.3);
    });

    it('draw Edge', () => {
      const points = EdgeShapeFactory.getShapePoints('edge', {
        x: [ 0.2, 0.4 ],
        y: [ 0.5, 0.5 ],
      });
      const shape = EdgeShapeFactory.drawShape('edge', {
        points,
        color: 'red',
      }, canvas);

      expect(shape.attr('path')).eqls([ [ 'M', 100, 250 ], [ 'L', 200, 250 ] ]);
      expect(canvas.get('children').length).equal(1);
    });

    it('draw Edge: vhv', () => {
      const obj = {
        x: [ 0.1, 0.1 ],
        y: [ 0.1, 0.3 ],
      };
      const points = EdgeShapeFactory.getShapePoints('vhv', obj);
      const shape = EdgeShapeFactory.drawShape('vhv', {
        points,
        color: 'red',
      }, canvas);
      expect(shape.attr('path').length).equal(4);
    });
  });

  describe('edge: arc', () => {
    it('draw shape arc rect', () => {
      const obj = {
        x: [ 0.2, 0.4 ],
        y: [ 0.5, 0.5 ],
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'red',
      }, canvas);
      expect(shape.attr('r')).equal(50);
      expect(shape.attr('startAngle')).eql(Math.PI);
      expect(shape.attr('endAngle')).eql(Math.PI * 2);
      expect(shape.attr('x')).eql(150);
      expect(shape.attr('y')).eql(250);
      canvas.draw();
    });

    it('draw shape arc rect hasWeight', () => {
      const obj = {
        x: [ 0.2, 0.4, 0.6, 0.7 ],
        y: [ 0.1, 0.1, 0.5, 0.5 ],
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'green',
      }, canvas);
      expect(shape.attr('path').length).equal(7);
      expect(shape.attr('path')).eql([
        [ 'M', 0.2 * 500, 450 ],
        [ 'L', 0.4 * 500, 450 ],
        [ 'C', 0.4 * 500, 350, 350, 350, 350, 250 ],
        [ 'L', 0.7 * 500, 250 ],
        [ 'L', 0.6 * 500, 250 ],
        [ 'C', 0.6 * 500, 350, 100, 350, 100, 450 ],
        [ 'Z' ],
      ]);

      canvas.draw();
    });
  });

  describe('edge: polar', () => {

    const Polar = getCoord('polar');
    const coord2 = new Polar({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });
    it('draw shape arc polar hasWeight', () => {
      EdgeShapeFactory._coord = coord2;
      const obj = {
        x: [ 0.2, 0.4, 0.6, 0.7 ],
        y: [ 0.5, 0.5, 0.5, 0.5 ],
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'green',
        isInCircle: true,
        center: {
          x: 230,
          y: 250,
        },
      }, canvas);
      expect(shape.attr('path').length).equal(8);
      expect(shape.attr('path')).eql(
        [
          [ 'M', 368.8820645368942, 211.37287570313157 ],
          [ 'Q',
            250.00000000000003,
            0,
            131.11793546310582,
            288.62712429686843 ],
          [ 'A',
            124.99999999999999,
            124.99999999999999,
            0,
            1,
            1,
            131.11793546310582,
            288.62712429686843 ],
          [ 'A',
            125,
            125,
            0,
            0,
            0,
            176.52684346344085,
            351.12712429686843 ],
          [ 'Q',
            250.00000000000003,
            0,
            323.47315653655915,
            351.12712429686843 ],
          [ 'A',
            125,
            125,
            0,
            0,
            1,
            323.47315653655915,
            351.12712429686843 ],
          [ 'A',
            124.99999999999999,
            124.99999999999999,
            0,
            0,
            0,
            368.8820645368942,
            211.37287570313157 ],
          [ 'Z' ],
        ]
      );
    });
    it('draw shape arc polar', () => {
      EdgeShapeFactory._coord = coord2;
      const obj = {
        x: [ 0.2, 0.4 ],
        y: [ 0.5, 0.5 ],
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'red',
        isInCircle: true,
        center: {
          x: 230,
          y: 250,
        },
      }, canvas);
      expect(shape.attr('path').length).equal(2);
      expect(shape.attr('path')).eql(
        [
          [ 'M', 368.8820645368942, 211.37287570313157 ],
          [ 'Q', 250.00000000000003, 0, 323.47315653655915, 351.12712429686843 ],
        ]
      );
      canvas.draw();
    });
  });

  describe('edge: registerEdgeShape: custom', () => {
    Shape.registerShape('edge', 'custom', {
      getMarkerStyle() {
        return {
          radius: 2,
          symbol: 'rect',
        };
      },
      getActiveStyle() {
        return {
          stroke: 'red',
          lineWidth: 2,
        };
      },
      getSelectedStyle() {
        return {
          stroke: 'red',
          fill: 2,
        };
      },
    });

    it('override getMarkerStyle', () => {
      const markerStyle = EdgeShapeFactory.getMarkerStyle('custom', {});
      expect(markerStyle.radius).to.be.equal(2);
      expect(markerStyle.symbol).eql('rect');
    });

    it('override getActiveStyle', () => {
      const activeStyle = EdgeShapeFactory.getActiveStyle('custom', {});
      expect(activeStyle).to.be.eql({
        stroke: 'red',
        lineWidth: 2,
      });
    });

    it('override getSelectedStyle', () => {
      const selectedStyle = EdgeShapeFactory.getSelectedStyle('custom', {});
      expect(selectedStyle).to.be.eql({
        stroke: 'red',
        fill: 2,
      });
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

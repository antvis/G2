import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getCoord } from '@antv/coord';
import { registerShape } from '../../../../src/element/shape/base';
import BoxShapeFactory from '../../../../src/element/shape/box';
import Global from '../../../../src/global';

const Rect = getCoord('rect');

describe('Box shape', () => {
  let div;
  let canvas;

  before(() => {
    div = document.createElement('div');
    div.id = 'boxShape';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'boxShape',
      width: 200,
      height: 200,
      pixelRatio: 2,
    });

    const rectCoord = new Rect({
      start: {
        x: 0,
        y: 200,
      },
      end: {
        x: 200,
        y: 0,
      },
    });

    BoxShapeFactory.setCoord(rectCoord);
    BoxShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', () => {
    it('defaultShapeType', () => {
      expect(BoxShapeFactory.defaultShapeType).equal('box');
    });
    it('getActiveStyle()', () => {
      const activeStyle = BoxShapeFactory.getActiveStyle('box', {});
      expect(activeStyle).to.eql({
        lineWidth: 2,
      });
    });
  });

  describe('box only has x', () => {
    it('getShapePoints && drawShape', function() {
      const type = 'box';
      const points = BoxShapeFactory.getShapePoints(type, {
        x: 0.88,
        y0: 0,
        size: 0.5,
      });
      expect(points.length).eql(14);
      const shape = BoxShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      canvas.draw();
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
  });

  describe('box only has x and x is array', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'box';
      const points = BoxShapeFactory.getShapePoints(type, {
        x: [ 0.1, 0.23, 0.42, 0.68, 0.9 ],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).eql(14);
      const shape = BoxShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      canvas.draw();
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
  });

  describe('box has both x and y', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'box';
      const points = BoxShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [ 0.1, 0.23, 0.42, 0.68, 0.9 ],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).eql(14);

      const shape = BoxShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      canvas.draw();
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
    it('getMarkerStyle', function() {
      const markerStyle = BoxShapeFactory.getMarkerStyle('box', {
        color: 'red',
      });
      expect(markerStyle.symbol).to.be.an.instanceof(Function);
      expect(markerStyle.symbol().length).to.eql(16);
      expect(markerStyle.stroke).equal('red');
    });

    it('getActiveStyle', () => {
      const activeStyle = BoxShapeFactory.getActiveStyle('box', {});
      expect(activeStyle).eql({
        lineWidth: 2,
      });
    });
  });

  describe('registerShape', () => {
    registerShape('box', 'test', {
      getActiveStyle() {
        return 'test';
      },
    });

    it('getActiveStyle', () => {
      const activeStyle = BoxShapeFactory.getActiveStyle('test');
      expect(activeStyle).to.equal('test');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

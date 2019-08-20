import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getCoord } from '@antv/coord';
import { registerShape } from '../../../../src/element/shape/base';
import KLineShapeFactory from '../../../../src/element/shape/k-line';
import Global from '../../../../src/global';

const Rect = getCoord('rect');

describe('Kline shape', () => {
  const klineDiv = document.createElement('div');
  klineDiv.id = 'klineShape';
  document.body.appendChild(klineDiv);

  const canvas = new Canvas({
    containerId: 'klineShape',
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

  KLineShapeFactory.setCoord(rectCoord);
  KLineShapeFactory.setTheme(Global.theme.shape);

  describe('default', () => {
    it('defaultShapeType', () => {
      expect(KLineShapeFactory.defaultShapeType).eql('kline');
    });
    it('getActiveStyle', () => {
      const activeStyle = KLineShapeFactory.getActiveStyle('kline', {});
      expect(activeStyle).to.eql({ fillOpacity: 0.85, strokeOpacity: 0.85 });
    });
  });

  describe('kline and value is not an Array', () => {
    const type = 'kline';
    const points = KLineShapeFactory.getShapePoints(type, {
      x: 0.1,
      y: 0.88,
      y0: 0,
      size: 0.5,
    });
    expect(points.length).eql(8);
    const shape = KLineShapeFactory.drawShape(
      type,
      {
        points,
        color: 'red',
      },
      canvas
    );
    canvas.draw();
    expect(shape.attr('fill')).eql('red');
    expect(shape.attr('path').length).eql(9);

    it('getMarkerStyle', () => {
      const markerStyle = KLineShapeFactory.getMarkerStyle('kline', {
        color: 'red',
      });
      expect(markerStyle.symbol).to.be.an.instanceof(Function);
      expect(markerStyle.symbol().length).to.eql(9);
      expect(markerStyle.stroke).equal('red');
    });
  });

  describe('kline and value is an Array', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'kline';
      const points = KLineShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [ 0.2, 0.5, 0.12, 0.88 ],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).eql(8);
      const shape = KLineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(9);
    });
  });

  describe('kline and value.length < 4', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'kline';
      const points = KLineShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [ 0.2, 0.5, 0.12 ],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).eql(8);

      const shape = KLineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(9);
    });
  });

  describe('registerShape', () => {
    registerShape('kline', 'test', {
      getActiveStyle() {
        return 'test';
      },
    });

    it('getActiveStyle', () => {
      const activeStyle = KLineShapeFactory.getActiveStyle('test');
      expect(activeStyle).to.equal('test');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(klineDiv);
  });
});

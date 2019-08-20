const expect = require('chai').expect;
import { Canvas } from '@antv/g';
import { getCoord } from '@antv/coord';
import TextShapeFactory from '../../../../src/element/shape/text';
import Global from '../../../../src/global';

describe('Text shapes', () => {
  let div;
  let canvas;

  before(() => {
    div = document.createElement('div');
    div.id = 'csp';
    document.body.appendChild(div);

    const Cartesian = getCoord('cartesian');
    const coord = new Cartesian({
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
      containerId: 'csp',
      width: 500,
      height: 500,
    });

    TextShapeFactory.setCoord(coord);
    TextShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', () => {
    it('default shape type', () => {
      expect(TextShapeFactory.defaultShapeType).to.be.equal('text');
    });
  });

  describe('text', () => {
    const type = 'text';
    it('getShapePoints & drawShape', () => {
      const point = TextShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = TextShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
        fontSize: '12px',
      }, canvas);
      expect(shape.attr('fill')).eql('red');
    });

    it('getMarkerStyle', () => {
      const point = {
        x: 100,
        y: 300,
        points: [ {
          x: 100,
          y: 300,
        } ],
      };

      const markerCfg = TextShapeFactory.getMarkerStyle('text', point);
      expect(markerCfg).eql({
        fill: Global.theme.defaultColor,
        textAlign: 'center',
        textBaseline: 'middle',
        radius: 4.5,
        symbol: 'circle',
      });
      expect(markerCfg.symbol).eql('circle');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});


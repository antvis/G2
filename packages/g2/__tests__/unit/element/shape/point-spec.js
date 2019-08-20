const expect = require('chai').expect;
import { Canvas } from '@antv/g';
import { getCoord } from '@antv/coord';
import PointShapeFactory from '../../../../src/element/shape/point';
import Global from '../../../../src/global';

describe('Point shapes', function() {
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

    PointShapeFactory.setCoord(coord);
    PointShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', function() {
    it('default shape type', function() {
      expect(PointShapeFactory.defaultShapeType).to.be.equal('hollowCircle');
    });
  });

  describe('circle', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'point';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('circle');
    });

    it('getMarkerStyle', function() {
      const point = {
        x: 100,
        y: 300,
        points: [ {
          x: 100,
          y: 300,
        } ],
      };

      // point.coord = coord;
      const markerCfg = PointShapeFactory.getMarkerStyle('circle', point);
      expect(markerCfg).eql({
        lineWidth: 2 / 2,
        fill: Global.theme.defaultColor,
        radius: 4.5,
        symbol: 'circle',
      });
    });

    it('getActiveStyle', function() {
      const point = {
        x: 100,
        y: 300,
        points: [ {
          x: 100,
          y: 300
        } ],
        radius: 5,
      };

      const activeCfg = PointShapeFactory.getActiveStyle('circle', point);

      expect(activeCfg.radius).to.equal(6);
    });

    it('getActiveStyle, when cfg has size property', function() {
      const point = {
        x: 100,
        y: 300,
        points: [ {
          x: 100,
          y: 300
        } ],
        size: 20,
      };

      const activeCfg = PointShapeFactory.getActiveStyle('hollowCircle', point);

      expect(activeCfg.radius).to.equal(21);
    });
  });

  describe('rect', function() {
    // xit('getShapePoints && drawShape', function() {
    //   const type = 'rect';
    //   const point = PointShapeFactory.getShapePoints(type, {
    //     x: 0.4,
    //     y: 0.8
    //   });
    //   expect(point[0].x).eql(0.4);
    //   expect(point[0].y).eql(0.8);
    //   const size = [ 0.3, 0.1 ];
    //   const shape = PointShapeFactory.drawShape(type, {
    //     points: point,
    //     size,
    //     color: 'green'
    //   }, canvas);
    //   expect(shape.attr('path').length).eql(5);
    //   expect(shape.attr('path')).eql(
    //     [
    //       [ 'M', 125, 125 ],
    //       [ 'L', 275, 125 ],
    //       [ 'L', 275, 74.99999999999994 ],
    //       [ 'L', 125, 74.99999999999994 ],
    //       [ 'z' ]
    //     ]
    //   );
    // });

    it('getMarkerStyle', function() {
      const point = {
        x: 100,
        y: 300,
        points: [ {
          x: 100,
          y: 300,
        } ],
      };

      // point.coord = coord;
      const markerCfg = PointShapeFactory.getMarkerStyle('rect', point);
      expect(markerCfg.symbol).eql('rect');
    });
  });
  describe('diamond', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'diamond';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('diamond');
    });
  });
  describe('hexagon', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hexagon';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('hexagon');
    });
  });
  describe('bowtie', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'bowtie';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('bowtie');
    });
  });
  describe('cross', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'cross';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('cross');
    });

    it('getMarkerStyle', function() {
      const markerCfg = PointShapeFactory.getMarkerStyle('cross', {
        color: 'red',
      });
      expect(markerCfg).eql({
        fill: '#fff',
        lineWidth: 1,
        radius: 4.5,
        stroke: 'red',
        symbol: 'cross',
      });
    });
  });
  describe('tick', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'tick';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('tick');
    });
  });
  describe('plus', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'plus';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('plus');
    });
  });
  describe('hyphen', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hyphen';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('hyphen');
    });
  });
  describe('line', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('line');
    });
  });
  describe('hollowDiamond', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hollowDiamond';
      const point = PointShapeFactory.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5,
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = PointShapeFactory.drawShape(type, {
        points: point,
        color: 'red',
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('diamond');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});


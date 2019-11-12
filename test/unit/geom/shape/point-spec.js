const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Shape = require('../../../../src/geom/shape/shape');
const Coord = require('@antv/coord/lib/');
const Global = require('../../../../src/global');
require('../../../../src/geom/shape/point');

const div = document.createElement('div');
div.id = 'csp';
document.body.appendChild(div);

const coord = new Coord.Cartesian({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});

const canvas = new Canvas({
  containerId: 'csp',
  width: 500,
  height: 500
});

const Point = Shape.getShapeFactory('point');
Point._coord = coord;

describe('Point shapes', () => {
  describe('default', () => {
    it('default shape type', () => {
      expect(Point.defaultShapeType).to.be.equal('hollowCircle');
    });
  });
  describe('circle', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'point';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('circle');
    });
    it('getMarkerCfg', () => {
      const point = {
        x: 100,
        y: 300,
        points: [{
          x: 100,
          y: 300
        }]
      };

      // point.coord = coord;
      const markerCfg = Point.getMarkerCfg('circle', point);
      expect(markerCfg).eql({
        lineWidth: 2 / 2,
        fill: Global.defaultColor,
        radius: 4.5,
        symbol: 'circle'
      });
    });

    // xit('getActiveCfg', function() {
    //   const point = {
    //     x: 100,
    //     y: 300,
    //     points: [{
    //       x: 100,
    //       y: 300
    //     }]
    //   };
    //
    //   // point.coord = coord;
    //   const activeCfg = Point.getActiveCfg('circle', point);
    //
    //   expect(activeCfg).eql({
    //     fill: '#fff',
    //     fillOpacity: 0.3
    //   });
    // });

    // xit('getActiveCfg, when cfg has size property', function() {
    //   const point = {
    //     x: 100,
    //     y: 300,
    //     points: [{
    //       x: 100,
    //       y: 300
    //     }],
    //     size: 20
    //   };
    //
    //   // point.coord = coord;
    //   const activeCfg = Point.getActiveCfg('hollowCircle', point);
    //
    //   expect(activeCfg).eql({
    //     lineWidth: 4 / 2
    //   });
    // });
  });

  describe('rect', () => {
    // xit('getShapePoints && drawShape', function() {
    //   const type = 'rect';
    //   const point = Point.getShapePoints(type, {
    //     x: 0.4,
    //     y: 0.8
    //   });
    //   expect(point[0].x).eql(0.4);
    //   expect(point[0].y).eql(0.8);
    //   const size = [ 0.3, 0.1 ];
    //   const shape = Point.drawShape(type, {
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

    it('getMarkerCfg', () => {
      const point = {
        x: 100,
        y: 300,
        points: [{
          x: 100,
          y: 300
        }]
      };

      // point.coord = coord;
      const markerCfg = Point.getMarkerCfg('rect', point);
      expect(markerCfg.symbol).eql('rect');
    });
  });
  describe('diamond', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'diamond';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('diamond');
    });
  });
  describe('hexagon', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hexagon';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('hexagon');
    });
  });
  describe('bowtie', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'bowtie';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('symbol')).eql('bowtie');
    });
  });
  describe('cross', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'cross';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('cross');
    });

    it('getMarkerCfg', () => {
      const markerCfg = Point.getMarkerCfg('cross', {
        color: 'red'
      });
      expect(markerCfg).eql({
        fill: '#fff',
        lineWidth: 1,
        radius: 4.5,
        stroke: 'red',
        symbol: 'cross'
      });
    });
  });
  describe('tick', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'tick';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('tick');
    });
  });
  describe('plus', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'plus';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('plus');
    });
  });
  describe('hyphen', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hyphen';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('hyphen');
    });
  });
  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('line');
    });
  });
  describe('hollowdiamond', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hollowDiamond';
      const point = Point.getShapePoints(type, {
        x: 0.4,
        y: 0.8,
        y0: 0,
        size: 0.5
      });
      expect(point[0].x).eql(0.4);
      expect(point[0].y).eql(0.8);

      const shape = Point.drawShape(type, {
        points: point,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('symbol')).eql('diamond');
    });
    it('clear', () => {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });
});


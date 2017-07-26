const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const Polygon = require('../../../../src/geom/shape/polygon');
const Coord = require('../../../../src/coord/');

const div = document.createElement('div');
div.id = 'cspolygon';
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
  containerId: 'cspolygon',
  width: 500,
  height: 500
});

describe('polygon shapes', function() {
  Polygon._coord = coord;
  describe('default', function() {
    it('default shape type', function() {
      expect(Polygon.defaultShapeType).equal('polygon');
    });
  });
  describe('polygon', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'polygon';
      const points = Polygon.getShapePoints(type, {
        x: [ 0.1, 0.3, 0.3, 0.4 ],
        y: [ 0.2, 0.5, 0.12, 0.88 ]
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.2);
      expect(points[1].x).eql(0.3);
      expect(points[1].y).eql(0.5);
      expect(points[2].x).eql(0.3);
      expect(points[2].y).eql(0.12);
      expect(points[3].x).eql(0.4);
      expect(points[3].y).eql(0.88);
      const shape = Polygon.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(6);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(3);
      expect(shape.attr('path')[5].length).eql(1);
    });
    it('getMarkerCfg', function() {
      const markerCfg = Polygon.getMarkerCfg('polygon', {
        color: '#f80'
      });
      expect(markerCfg.symbol).eql('square');
    });
    xit('getActiveCfg', function() {
      const activeCfg = Polygon.getActiveCfg('polygon');

      expect(activeCfg).eql({
        fill: '#fff',
        fillOpacity: 0.3
      });
    });
  });
  describe('hollow', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hollow';
      const points = Polygon.getShapePoints(type, {
        x: [ 0.1, 0.3, 0.1, 0.4 ],
        y: [ 0.2, 0.5, 0.2, 0.88 ]
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.2);
      expect(points[1].x).eql(0.3);
      expect(points[1].y).eql(0.5);
      expect(points[2].x).eql(0.1);
      expect(points[2].y).eql(0.2);
      expect(points[3].x).eql(0.4);
      expect(points[3].y).eql(0.88);
      const shape = Polygon.drawShape(type, {
        points,
        color: 'blue'
      }, canvas);
      expect(shape.attr('stroke')).eql('blue');
      expect(shape.attr('path').length).eql(8);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(1);
      expect(shape.attr('path')[4].length).eql(3);
      expect(shape.attr('path')[5].length).eql(3);
      expect(shape.attr('path')[6].length).eql(3);
      expect(shape.attr('path')[7].length).eql(1);
      canvas.draw();
    });
  });
});

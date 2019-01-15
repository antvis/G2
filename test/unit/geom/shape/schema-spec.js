const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Schema = require('../../../../src/geom/shape/schema');
const Coord = require('@antv/coord/lib/');

const div = document.createElement('div');
div.id = 'csschema';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'csschema',
  width: 500,
  height: 500
});

const coord = new Coord.Rect({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});


describe('schema shapes', function() {
  Schema._coord = coord;
  describe('default', function() {
    it('default shape type', function() {
      expect(Schema.defaultShapeType).equal('');
    });
  });
  describe('box only x', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'box';
      const points = Schema.getShapePoints(type, {
        x: 0.88,
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(14);
      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
  });

  describe('box only x && x = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'box';
      const points = Schema.getShapePoints(type, {
        x: [ 0.2, 0.5, 0.12, 0.88 ],
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(14);
      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
  });

  describe('box xy', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'box';
      const points = Schema.getShapePoints(type, {
        x: 0.1,
        y: [ 0.2, 0.5, 0.12, 0.88 ],
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(14);

      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(16);
    });
    it('get marker', function() {
      const marker = Schema.getMarkerCfg('box', {
        color: 'red'
      });
      expect(marker.symbol).to.be.an.instanceof(Function);
      expect(marker.stroke).equal('red');
    });

    // xit('getActiveCfg', function() {
    //   const activeCfg = Schema.getActiveCfg();
    //
    //   expect(activeCfg).eql({
    //     lineWidth: 2
    //   });
    // });

  });
  describe('candle', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'candle';
      const points = Schema.getShapePoints(type, {
        x: 0.1,
        y: 0.88,
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(8);

      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(9);
    });
    it('get marker', function() {
      const marker = Schema.getMarkerCfg('candle', {
        color: 'red'
      });
      expect(marker.symbol).to.be.an.instanceof(Function);
      expect(marker.stroke).equal('red');
    });
  });
  describe('candle value = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'candle';
      const points = Schema.getShapePoints(type, {
        x: 0.1,
        y: [ 0.2, 0.5, 0.12, 0.88 ],
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(8);

      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(9);
    });
  });
  describe('candle value.length < 4', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'candle';
      const points = Schema.getShapePoints(type, {
        x: 0.1,
        y: [ 0.2, 0.5, 0.12 ],
        y0: 0,
        size: 0.5
      });
      expect(points.length).eql(8);

      const shape = Schema.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(9);
    });

    it('clear', function() {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });
});

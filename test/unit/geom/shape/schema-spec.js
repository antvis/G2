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


describe('schema shapes', () => {
  Schema._coord = coord;
  describe('default', () => {
    it('default shape type', () => {
      expect(Schema.defaultShapeType).equal('');
    });
  });
  describe('box only x', () => {
    it('getShapePoints && drawShape', () => {
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

  describe('box only x && x = []', () => {
    it('getShapePoints && drawShape', () => {
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

  describe('box xy', () => {
    it('getShapePoints && drawShape', () => {
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
    it('get marker', () => {
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
  describe('candle', () => {
    it('getShapePoints && drawShape', () => {
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
    it('get marker', () => {
      const marker = Schema.getMarkerCfg('candle', {
        color: 'red'
      });
      expect(marker.symbol).to.be.an.instanceof(Function);
      expect(marker.stroke).equal('red');
    });
  });
  describe('candle value = []', () => {
    it('getShapePoints && drawShape', () => {
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
  describe('candle value.length < 4', () => {
    it('getShapePoints && drawShape', () => {
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

    it('clear', () => {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });
});

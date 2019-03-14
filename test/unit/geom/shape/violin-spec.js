const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Violin = require('../../../../src/geom/shape/violin');
const Coord = require('@antv/coord/lib/');

const div = document.createElement('div');
div.id = 'csviolin';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'csviolin',
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

describe('violin shapes', () => {
  const cfg = {
    x: 0.125,
    y: [ 0.0125, 0.044375, 0.07625, 0.108125, 0.14, 0.171875, 0.20375, 0.23562499999999997, 0.26749999999999996, 0.29937499999999995, 0.33124999999999993, 0.3631249999999999, 0.3949999999999999 ],
    y0: 0,
    size: 0.225,
    _size: [ 0.42719122967414686, 0.44553393512452116, 0.23259051646275541, 0.1939762223716194, 0.3557956111139111, 0.4870328378876867, 0.4742334076668541, 0.4171103376547852, 0.34611155336167754, 0.2294380115772542, 0.0945436804984983, 0.019530344332635393, 0.001789349060768542 ]
  };
  describe('default', () => {
    it('default shape type', () => {
      expect(Violin.defaultShapeType).equal('violin');
    });

    const points = Violin.getShapePoints(null, cfg);

    it('get points', () => {
      expect(points.length).equal(cfg.y.length * 2);
    });

    it('drawShape: violin', () => {
      Violin.setCoord(coord);
      const shape = Violin.drawShape('violin', {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(cfg.y.length * 2 + 2);
    });

    it('drawShape: hollow', () => {
      Violin.setCoord(coord);
      const shape = Violin.drawShape('hollow', {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(cfg.y.length * 2 + 2);
    });

    it('drawShape: smooth', () => {
      Violin.setCoord(coord);
      const shape = Violin.drawShape('smooth', {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(cfg.y.length * 2 + 2);
      expect(shape.attr('path').pop()).eql([ 'z' ]); // 闭合路径
    });

    it('drawShape: smoothHollow', () => {
      Violin.setCoord(coord);
      const shape = Violin.drawShape('smoothHollow', {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(cfg.y.length * 2 + 2);
    });
  });
});

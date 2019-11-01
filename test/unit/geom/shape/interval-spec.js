const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Interval = require('../../../../src/geom/shape/interval');
const Coord = require('@antv/coord/lib/');
// const Global = require('../../../../src/global');

const div = document.createElement('div');
div.id = 'csinterval';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'csinterval',
  width: 500,
  height: 500
});

const coord = new Coord.Polar({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});

const coord1 = new Coord.Rect({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});

describe('interval shapes', () => {
  const cfg = {
    x: 1,
    y: 2,
    y0: 0,
    size: 1
  };
  describe('default', () => {
    it('default shape type', () => {
      expect(Interval.defaultShapeType).equal('rect');
    });

    it('get points', () => {
      const points = Interval.getShapePoints(null, cfg);
      expect(points.length).equal(4);
      expect(points[0].x).equal(0.5);
      expect(points[0].y).equal(0);
      expect(points[1].x).equal(0.5);
      expect(points[1].y).equal(2);
    });

    it('get points y array', () => {
      const cfg = {
        x: 1,
        y: [ 1, 2 ],
        y0: 0,
        size: 1
      };
      const points = Interval.getShapePoints(null, cfg);
      expect(points.length).equal(4);

      expect(points[0].x).equal(0.5);
      expect(points[0].y).equal(1);

      expect(points[1].x).equal(0.5);
      expect(points[1].y).equal(2);

      expect(points[2].x).equal(1.5);
      expect(points[2].y).equal(2);
    });

    it('get points x array', () => {
      const cfg = {
        x: [ 1, 2 ],
        y: 2,
        y0: 0,
        size: 1
      };
      const points = Interval.getShapePoints('rect', cfg);
      expect(points.length).equal(4);

      expect(points[0].x).equal(1);
      expect(points[0].y).equal(0);

      expect(points[1].x).equal(1);
      expect(points[1].y).equal(2);

      expect(points[2].x).equal(2);
      expect(points[2].y).equal(2);
    });

    it('get active config', () => {
      const shapeCfg = Interval.getActiveCfg('rect', {});
      expect(shapeCfg).not.equal(undefined);
    });
  });
  describe('rect', () => {
    it('getShapePoints && drawShape', () => {
      const cfg = {
        x: 0.25,
        y: 0.5,
        y0: 0,
        size: 0.2
      };
      const type = 'rect';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(0.15);
      expect(points[0].y).eql(0);
      expect(points[1].x).eql(0.15);
      expect(points[1].y).eql(0.5);
      expect(points[2].x).eql(0.35);
      expect(points[2].y).eql(0.5);
      expect(points[3].x).eql(0.35);
      expect(points[3].y).eql(0);

      Interval.setCoord(coord);
      const shape = Interval.drawShape(type, {
        points,
        color: 'red'
      }, canvas);

      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(5);
      canvas.draw();
    });
    it('get active config', () => {
      const shapeCfg = Interval.getActiveCfg('rect', {});
      expect(shapeCfg).not.equal(undefined);
    });

    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('rect', {
        color: 'blue'
      });
      const marker2 = Interval.getMarkerCfg('rect', {
        color: 'blue',
        isInCircle: true
      });

      expect(marker.symbol).equal('square');
      expect(marker.fill).equal('blue');
      expect(marker2.symbol).equal('circle');
    });

    // xit('get selected config', function() {
    //   const selectedCfg = Interval.getSelectedCfg('rect', {
    //     coord,
    //     point: {
    //       x: 10,
    //       y: 30
    //     }
    //   });
    //   expect(selectedCfg).not.equal(null);
    //   expect(selectedCfg).to.have.property('transform');
    //   const transform = selectedCfg.transform[0];
    //   expect(transform[0]).equal('t');
    //   expect(transform[1].toFixed(10)).equal('-3.0199743083');
    //   expect(transform[2].toFixed(10)).equal('-6.8651114468');
    // });
  });

  describe('hollowRect', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hollowRect';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(0.5);
      expect(points[0].y).eql(0);
      expect(points[1].x).eql(0.5);
      expect(points[1].y).eql(2);
      expect(points[2].x).eql(1.5);
      expect(points[2].y).eql(2);
      expect(points[3].x).eql(1.5);
      expect(points[3].y).eql(0);
      points.push(null);
      const shape = Interval.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(6);
    });
    // xit('get active config', function() {
    //   const shapeCfg = Interval.getActiveCfg('hollowRect', {});
    //   expect(shapeCfg.lineWidth).not.equal(Global.shape.hollowInterval.lineWidth);
    // });

    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('hollowRect', {
        color: 'blue'
      });
      const marker2 = Interval.getMarkerCfg('hollowRect', {
        color: 'blue',
        isInCircle: true
      });

      expect(marker.symbol).equal('square');
      expect(marker.stroke).equal('blue');
      expect(marker2.symbol).equal('circle');
    });

    // xit('get selected config', function() {
    //   const selectedCfg = Interval.getSelectedCfg('hollowRect', {
    //     coord: new Coord.Rect({
    //       start: {
    //         x: 0,
    //         y: 500
    //       },
    //       end: {
    //         x: 500,
    //         y: 0
    //       }
    //     })
    //   });
    //   expect(selectedCfg).not.have.property('transform');
    // });
  });
  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(1);
      expect(points[0].y).eql(2);
      expect(points[1].x).eql(1);
      expect(points[1].y).eql(0);
      const shape = Interval.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
    });
    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('line', {
        color: 'blue'
      });

      expect(marker.symbol).equal('line');
      expect(marker.stroke).equal('blue');
      expect(marker.fill).equal('#fff');
    });
  });
  describe('line points = []', () => {
    it('getShapePoints && drawShape', () => {
      Interval.setCoord(coord1);
      const cfg = {
        x: 1,
        y: [ 1, 2 ],
        y0: 0,
        size: 1
      };
      const type = 'line';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(1);
      expect(points[0].y).eql(1);
      expect(points[1].x).eql(1);
      expect(points[1].y).eql(2);
      const shape = Interval.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
    });
  });
  describe('tick', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'tick';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(0.5);
      expect(points[0].y).eql(2);
      expect(points[1].x).eql(1.5);
      expect(points[1].y).eql(2);
      expect(points[2].x).eql(1);
      expect(points[2].y).eql(2);
      expect(points[3].x).eql(1);
      expect(points[3].y).eql(0);
      expect(points[4].x).eql(0.5);
      expect(points[4].y).eql(0);
      expect(points[5].x).eql(1.5);
      expect(points[5].y).eql(0);
      const shape = Interval.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(6);
    });
    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('tick', {
        color: 'blue'
      });

      expect(marker.symbol).equal('tick');
      expect(marker.stroke).equal('blue');
      expect(marker.fill).equal('#fff');
    });
  });

  describe('funnel', () => {
    it('getShapePoints && drawShape', () => {
      const cfg = {
        x: 1,
        y: [ 0.2, 0.1, 0.3, 0.5, 0.6 ],
        y0: 0,
        size: 1
      };
      const type = 'funnel';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(0);
      expect(points[0].y).eql(0.2);
      expect(points[1].x).eql(0);
      expect(points[1].y).eql(0.1);
      expect(points[2].x).eql(2);
      expect(points[2].y).eql(0.1);
      expect(points[3].x).eql(2);
      expect(points[3].y).eql(0.2);
      const shape = Interval.drawShape(type, {
        points,
        nextPoints: points,
        color: 'red'
      }, canvas);
      const shapeNull = Interval.drawShape(type, {
        points,
        nextPoints: null,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(5);
      expect(shapeNull.attr('fill')).eql('red');
      expect(shapeNull.attr('stroke')).eql('red');
      expect(shapeNull.attr('path').length).eql(5);
    });
    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('funnel', {
        color: 'blue'
      });

      expect(marker.symbol).equal('square');
      expect(marker.stroke).equal('blue');
      expect(marker.fill).equal('blue');
    });
  });
  describe('pyramid', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'pyramid';
      const points = Interval.getShapePoints(type, cfg);
      expect(points[0].x).eql(0);
      expect(points[0].y).eql(0);
      expect(points[1].x).eql(0);
      expect(points[1].y).eql(2);
      expect(points[2].x).eql(2);
      expect(points[2].y).eql(1);
      const shape = Interval.drawShape(type, {
        points,
        nextPoints: points,
        color: 'red'
      }, canvas);
      const shapeNull = Interval.drawShape(type, {
        points,
        nextPoints: null,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(5);
      expect(shapeNull.attr('fill')).eql('red');
      expect(shapeNull.attr('stroke')).eql('red');
      expect(shapeNull.attr('path').length).eql(5);
    });
    it('get marker config', () => {
      const marker = Interval.getMarkerCfg('pyramid', {
        color: 'blue'
      });

      expect(marker.symbol).equal('square');
      expect(marker.stroke).equal('blue');
      expect(marker.fill).equal('blue');
    });
  });

  describe('top-line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'top-line';
      const cfg1 = {
        x: 0.5,
        y: 0.6,
        y0: 0,
        size: 0.25
      };
      Interval.setCoord(coord1);
      const points = Interval.getShapePoints(type, cfg1);
      expect(points.length).equal(4);
      const group = canvas.addGroup();
      Interval.drawShape(type, {
        points,
        style: {
          stroke: 'blue',
          lineWidth: 2
        },
        color: 'red'
      }, group);
      expect(group.getCount()).equal(2);
      expect(group.get('children')[1].attr('stroke')).equal('blue');
    });
  });

  /* describe('pie', function() {
    it('get selected config', function() {
      var selectedCfg = Interval.getSelectedCfg('rect', {
        coord: coord,
        point: {
          x: [10, 10],
          y: [30, 30]
        }
      });
      expect(selectedCfg).not.equal(null);
      expect(selectedCfg).to.have.property('transform');
      var transform = selectedCfg.transform[0];
      expect(transform[0]).equal('t');
      expect(transform[1].toFixed(14)).equal('5.52865605150556');
      expect(transform[2].toFixed(14)).equal('5.06793471388010');
    });

    it('get selected config, when point.x is number and point.y is array.', function() {
      var selectedCfg = Interval.getSelectedCfg('rect', {
        coord: coord,
        point: {
          x: 10,
          y: [30, 30]
        }
      });
      expect(selectedCfg).not.equal(null);
      expect(selectedCfg).to.have.property('transform');
      var transform = selectedCfg.transform[0];
      expect(transform[0]).equal('t');
      expect(transform[1].toFixed(14)).equal('5.52865605150556');
      expect(transform[2].toFixed(14)).equal('5.06793471388010');
    });
  });
  */
});

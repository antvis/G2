const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Line = require('../../../../src/geom/shape/line');
const Coord = require('@antv/coord/lib/');
const Global = require('../../../../src/global');

const div = document.createElement('div');
div.id = 'csl';
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
  containerId: 'csl',
  width: 500,
  height: 500
});

describe('line shapes', () => {
  Line._coord = coord;
  describe('default', () => {
    it('default shape type', () => {
      expect(Line.defaultShapeType).to.be.equal('line');
    });
  });
  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 200 ]);
    });
    it('getMarkerCfg', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        opacity: 0.8
      };

      const pointCfg = Line.getMarkerCfg(undefined, point);
      // expect(pointCfg.opacity).to.be.equal(0.8);
      expect(pointCfg.lineWidth).to.be.equal(2);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });

    // xit('getActiveCfg', function() {
    //   const activeCfg = Line.getActiveCfg();
    //   expect(activeCfg).eql({
    //     lineWidth: 4 / 2
    //   });
    // });
  });

  describe('line has size', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red',
        size: 10
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineWidth')).eql(10);

    });
  });

  describe('line point.y = []', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [
        { x: 100, y: [ 100, 200 ] },
        { x: 200, y: [ 200, 300 ] }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 200 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 300 ]);
    });
  });

  describe('line point.x = [], point.y = []', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [
        { x: [ 100, 50 ], y: [ 100, 200 ] },
        { x: [ 200, 80 ], y: [ 200, 300 ] }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eql([ 'M', 50, 200 ]);
      expect(shape.attr('path')[1]).eql([ 'L', 80, 300 ]);
      expect(shape.attr('path')[2]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[3]).eqls([ 'L', 200, 200 ]);

    });
  });

  describe('dot', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'dot';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 1, 1 ]);
    });
    it('getMarkerCfg', () => {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dot', point);

      expect(pointCfg.lineDash).eql([ 1, 1 ]);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('dash', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'dash';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 5.5, 1 ]);
    });
    it('getMarkerCfg', () => {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dash', point);

      expect(pointCfg.lineDash).eql([ 5.5, 1 ]);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('smooth && spline', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'smooth';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 50, y: 50 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(7);
      expect(shape.attr('path')[2].length).eql(7);
    });
    it('getMarkerCfg', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('smooth', point);
      const splinePointCfg = Line.getMarkerCfg('spline', point);

      expect(pointCfg).eql(splinePointCfg);
      expect(pointCfg.lineWidth).to.be.equal(2);
      expect(pointCfg.stroke).to.be.equal(Global.defaultColor);

    });
  });

  describe('hv', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hv';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];

      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 200, 100 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 200, 200 ]);
    });
  });

  describe('vh', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'vh';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);

      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 100, 200 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 200, 200 ]);
    });
  });

  describe('hvh', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hvh';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];

      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls([ 'M', 100, 100 ]);
      expect(shape.attr('path')[1]).eqls([ 'L', 150, 100 ]);
      expect(shape.attr('path')[2]).eqls([ 'L', 150, 200 ]);
      expect(shape.attr('path')[3]).eqls([ 'L', 200, 200 ]);
    });
  });
  describe('vhv', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'vhv';
      const points = [
        { x: 100, y: 100 },
        { x: 200, y: 200 }
      ];
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
    });
    it('hv vh hvh vhv getMarkerCfg', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('hv', point);
      const vhPointCfg = Line.getMarkerCfg('vh', point);
      const hvhPointCfg = Line.getMarkerCfg('hvh', point);
      const vhvPointCfg = Line.getMarkerCfg('vhv', point);

      expect(pointCfg.symbol).to.be.an.instanceof(Function);
      expect(vhPointCfg.symbol).to.be.an.instanceof(Function);
      expect(hvhPointCfg.symbol).to.be.an.instanceof(Function);
      expect(vhvPointCfg.symbol).to.be.an.instanceof(Function);
    });

    it('clear', () => {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });

});

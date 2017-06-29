const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const Line = require('../../../../src/geom/shape/line');
const Coord = require('../../../../src/coord/');
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

describe('line shapes', function() {
  Line._coord = coord;
  describe('default', function() {
    it('default shape type', function() {
      expect(Line.defaultShapeType).to.be.equal('line');
    });
  });
  describe('line', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        opacity: 0.8
      };

      const pointCfg = Line.getMarkerCfg(undefined, point);
      expect(pointCfg.opacity).to.be.equal(0.8);
      expect(pointCfg.lineWidth).to.be.equal(30);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });

    it('getActiveCfg', function() {
      const activeCfg = Line.getActiveCfg();
      expect(activeCfg).eql({
        lineWidth: 4 / 2
      });
    });
  });

  describe('line has size', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red',
        size: 10
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineWidth')).eql(10);
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
  });

  describe('line point.y = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = Line.getShapePoints(type, {
        x: 0.1,
        y: [ 0.1, 0.3 ],
        y0: 0,
        size: 0.5
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.1);
      expect(points[1].x).eql(0.1);
      expect(points[1].y).eql(0.3);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
  });

  describe('line point.x = [], point.y = []', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'line';
      const points = Line.getShapePoints(type, {
        x: [ 0.1, 0.3 ],
        y: [ 0.1, 0.3 ],
        y0: 0,
        size: 0.5
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.1);
      expect(points[1].x).eql(0.3);
      expect(points[1].y).eql(0.3);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
  });

  describe('dot', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'dot';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 2, 1 ]);
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dot', point);

      expect(pointCfg.lineDash).eql([ 2, 1 ]);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });
  });

  describe('fill', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'fill';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('fill', point);

      expect(pointCfg.fill).to.be.equal(Global.defaultColor);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });
  });

  describe('dash', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'dash';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 10, 5 ]);
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin'
      };

      const pointCfg = Line.getMarkerCfg('dash', point);

      expect(pointCfg.lineDash).eql([ 10, 5 ]);
      expect(pointCfg.symbol(10, 10, 5)).eql([
        [ 'M', 5, 10 ],
        [ 'L', 15, 10 ]
      ]);
    });
  });

  describe('smooth && spline', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'smooth';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0], { x: 0.4, y: 0.5 }];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
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
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('smooth', point);
      const splinePointCfg = Line.getMarkerCfg('spline', point);

      expect(pointCfg).eql(splinePointCfg);
      expect(pointCfg.lineWidth).to.be.equal(30);
      expect(pointCfg.stroke).to.be.equal(Global.defaultColor);

    });
  });

  describe('dotSmooth', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'dotSmooth';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([ 2, 1 ]);
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
    });
    it('getMarkerCfg', function() {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord
      };

      const pointCfg = Line.getMarkerCfg('dotSmooth', point);

      expect(pointCfg.lineDash).eql([ 2, 1 ]);
    });
  });

  describe('hv', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hv';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
    });
  });

  describe('vh', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'vh';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
      const shape = Line.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
    });
  });

  describe('hvh', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'hvh';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
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
  });

  describe('vhv', function() {
    it('getShapePoints && drawShape', function() {
      const type = 'vhv';
      const points1 = Line.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Line.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1[0], points2[0] ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0.5);
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
  });
  it('hv vh hvh vhv getMarkerCfg', function() {
    const point = {
      size: 30,
      yDim: 'berlin',
      coord
    };

    const pointCfg = Line.getMarkerCfg('hv', point);
    const vhPointCfg = Line.getMarkerCfg('vh', point);
    const hvhPointCfg = Line.getMarkerCfg('hvh', point);
    const vhvPointCfg = Line.getMarkerCfg('vhv', point);

    expect(pointCfg.symbol(2, 2, 2)).eql([
      [ 'M', 0, 0 ],
      [ 'L', 2, 0 ],
      [ 'L', 2, 2 ],
      [ 'L', 4, 2 ]
    ]);
    expect(vhPointCfg.symbol(2, 2, 2)).eql([
      [ 'M', 0, 2 ],
      [ 'L', 2, 2 ],
      [ 'L', 2, 0 ],
      [ 'L', 4, 0 ]
    ]);
    expect(hvhPointCfg.symbol(2, 2, 2)).eql([
      [ 'M', -1, 2 ],
      [ 'L', 1, 2 ],
      [ 'L', 1, 1 ],
      [ 'L', 3, 1 ],
      [ 'L', 3, 2 ],
      [ 'L', 5, 2 ]
    ]);
    expect(vhvPointCfg.symbol(2, 2, 2)).eql([
      [ 'M', 0, 2 ],
      [ 'L', 0, 1 ],
      [ 'L', 2, 1 ],
      [ 'L', 2, 0 ],
      [ 'L', 2, 3 ],
      [ 'L', 4, 3 ]
    ]);
  });
});

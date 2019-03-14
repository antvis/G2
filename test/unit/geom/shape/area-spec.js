const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Area = require('../../../../src/geom/shape/area');
const Coord = require('@antv/coord/lib/');
// const Global = require('../../../../src/global');

const div = document.createElement('div');
div.id = 'csarea';
document.body.appendChild(div);

let coord = new Coord.Rect({
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
  containerId: 'csarea',
  width: 500,
  height: 500
});


describe('area shapes', () => {
  Area._coord = coord;
  describe('default', () => {
    it('default shape type', () => {
      expect(Area.defaultShapeType).equal('area');
    });
  });
  describe('area', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'area';
      const points1 = Area.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Area.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1, points2 ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0);
      expect(points1[1].x).eql(0.1);
      expect(points1[1].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0);
      expect(points2[1].x).eql(0.2);
      expect(points2[1].y).eql(0.5);

      const shape = Area.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(5);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(1);
    });
    it('getMarkerCfg', () => {
      const point = {
        points: [{
          B: 2,
          points: [{
            x: 273,
            y: 480
          }, {
            x: 273,
            y: 304
          }]
        }, {
          B: 3,
          points: [{
            x: 500,
            y: 480
          }, {
            x: 500,
            y: 216
          }]
        }],
        size: 30,
        yDim: 'B',
        opacity: 0.8,
        color: '#ff8800'
      };

      const pointCfg = Area.getMarkerCfg('area', point);

      // expect(pointCfg.fill).equal('#ff8800');
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });

    // xit('getActiveCfg', function() {
    //   let activeCfg = Area.getActiveCfg('area');
    //   expect(activeCfg).eql({
    //     fill: '#fff',
    //     fillOpacity: 0.3
    //   });
    //
    //   activeCfg = Area.getActiveCfg('line');
    //   expect(activeCfg).eql({
    //     lineWidth: 2
    //   });
    //
    //   activeCfg = Area.getActiveCfg();
    //   expect(activeCfg).eql({
    //     fill: '#fff',
    //     fillOpacity: 0.3
    //   });
    // });
  });

  describe('smooth', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'smooth';
      const points1 = Area.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Area.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });

      const points3 = Area.getShapePoints(type, {
        x: 0.3,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points = [ points1, points2, points3 ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0);
      expect(points1[1].x).eql(0.1);
      expect(points1[1].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0);
      expect(points2[1].x).eql(0.2);
      expect(points2[1].y).eql(0.5);
      const shape = Area.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(5);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(7);
      expect(shape.attr('path')[2].length).eql(7);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(1);
    });
    it('getMarkerCfg', () => {
      const point = {
        fill: 'red'
      };

      const pointCfg = Area.getMarkerCfg('smooth', point);
      // const splinePointCfg = Area.getMarkerCfg('spline', point);
      // expect(splinePointCfg).equal(pointCfg);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points1 = Area.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Area.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1, points2 ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0);
      expect(points1[1].x).eql(0.1);
      expect(points1[1].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0);
      expect(points2[1].x).eql(0.2);
      expect(points2[1].y).eql(0.5);
      const shape = Area.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(1);
    });
    it('getMarkerCfg', () => {
      const point = {
        points: [{
          B: 2,
          points: [{
            x: 273,
            y: 480
          }, {
            x: 273,
            y: 304
          }]
        }, {
          B: 3,
          points: [{
            x: 500,
            y: 480
          }, {
            x: 500,
            y: 216
          }]
        }],
        yDim: 'B',
        isInCircle: true
      };

      const pointCfg = Area.getMarkerCfg('line', point);

      // expect(pointCfg.fill).equal('#fff');
      // expect(pointCfg.fillOpacity).equal(0);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('area shapes Polar', () => {
    coord = new Coord.Polar({
      start: {
        x: 0,
        y: 500
      },
      end: {
        x: 500,
        y: 0
      }
    });
    it('getShapePoints && drawShape', () => {
      const type = 'area';
      const points1 = Area.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
        size: 0.5
      });
      const points2 = Area.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
        size: 0.5
      });
      const points = [ points1, points2 ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0);
      expect(points1[1].x).eql(0.1);
      expect(points1[1].y).eql(0.2);
      expect(points2[0].x).eql(0.2);
      expect(points2[0].y).eql(0);
      expect(points2[1].x).eql(0.2);
      expect(points2[1].y).eql(0.5);
      const shape = Area.drawShape(type, {
        points,
        color: 'red',
        isInCircle: true
      }, canvas);
      expect(shape.attr('path').length).equal(7);
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(3);
      expect(shape.attr('path')[5].length).eql(3);
      expect(shape.attr('path')[6].length).eql(1);
    });

    it('clear', () => {
      canvas.destroy();
    });
  });
});


const expect = require('chai').expect;
import { Canvas } from '@antv/g';
import AreaShapeFactory from '../../../../src/element/shape/area';
import { registerShape } from '../../../../src/element/shape/base';
import Global from '../../../../src/global';
import { getCoord } from '@antv/coord';

const Cartestian = getCoord('cartesian');

describe('Area shape factory', () => {
  let div;
  let canvas;

  before(() => {
    div = document.createElement('div');
    div.id = 'area-shape';
    document.body.appendChild(div);

    const cartestianCoord = new Cartestian({
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
      containerId: 'area-shape',
      width: 500,
      height: 500,
    });
    AreaShapeFactory.setCoord(cartestianCoord);
    AreaShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', () => {
    it('defaultShapeType', () => {
      expect(AreaShapeFactory.defaultShapeType).equal('area');
    });
  });

  describe('area and has points', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'area';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points2 = AreaShapeFactory.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
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
      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );

      canvas.draw();
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path')).to.eql([
        [ 'M', 50, 400 ],
        [ 'L', 100, 250 ],
        [ 'L', 100, 500 ],
        [ 'L', 50, 500 ],
        [ 'Z' ],
      ]);
    });

    it('getMarkerStyle', () => {
      const point = {
        points: [
          {
            B: 2,
            points: [
              { x: 273, y: 480 },
              { x: 273, y: 304 },
            ],
          },
          {
            B: 3,
            points: [
              { x: 500, y: 480 },
              { x: 500, y: 216 },
            ],
          },
        ],
        size: 30,
        yDim: 'B',
        opacity: 0.8,
        color: '#ff8800',
      };

      const pointCfg = AreaShapeFactory.getMarkerStyle('area', point);
      expect(pointCfg.fill).equal('#ff8800');
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });

    it('getActiveStyle has fillOpacity cfg', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('area', {
        fillOpacity: 0.3,
      });
      expect(activeStyle).eql({
        strokeOpacity: 0.15,
        fillOpacity: 0.15,
      });
    });

    it('getActiveStyle has opacity cfg', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('area', {
        opacity: 0.3,
      });
      expect(activeStyle).eql({
        strokeOpacity: 0.15,
        fillOpacity: 0.15,
      });
    });

    it('getActiveStyle has neither fillOpacity nor opacity cfg', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('area', {});
      expect(activeStyle).eql({
        strokeOpacity: 0.85,
        fillOpacity: 0.85,
      });
    });
  });

  describe('area and show single point', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'area';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points = [ points1 ];
      expect(points1[0].x).eql(0.1);
      expect(points1[0].y).eql(0);
      expect(points1[1].x).eql(0.1);
      expect(points1[1].y).eql(0.2);
      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          showSinglePoint: true,
          style: {
            r: 10,
          },
        },
        canvas
      );
      canvas.draw();
      expect(shape.get('type')).to.equal('circle');
      expect(shape.attr('r')).to.equal(10);
    });
  });

  describe('smooth', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'smooth';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points2 = AreaShapeFactory.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
      });

      const points3 = AreaShapeFactory.getShapePoints(type, {
        x: 0.3,
        y: 0.2,
        y0: 0,
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
      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          color: 'yellow',
        },
        canvas
      );
      expect(shape.attr('fill')).eql('yellow');
      expect(shape.attr('path')).to.eql([
        [ 'M', 50, 400 ],
        [ 'C', 50, 400, 80, 250, 100, 250 ],
        [ 'C', 120, 250, 150, 400, 150, 400 ],
        [ 'L', 150, 500 ],
        [ 'C', 150, 500, 120, 500, 100, 500 ],
        [ 'C', 80, 500, 50, 500, 50, 500 ],
        [ 'Z' ],
      ]);
      canvas.draw();
    });

    it('getMarkerStyle', () => {
      const point = {
        color: 'red',
      };

      const pointCfg = AreaShapeFactory.getMarkerStyle('smooth', point);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
      expect(pointCfg.fill).to.equal('red');
    });
  });

  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points2 = AreaShapeFactory.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
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
      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          color: 'green',
          size: 10,
        },
        canvas
      );
      expect(shape.attr('stroke')).equal('green');
      expect(shape.attr('lineWidth')).equal(10);
      expect(shape.attr('path')).to.eql([
        [ 'M', 50, 400 ],
        [ 'L', 100, 250 ],
        [ 'L', 100, 500 ],
        [ 'L', 50, 500 ],
        [ 'Z' ],
      ]);
      expect(shape.attr('fillOpacity')).to.equal(0);

      canvas.draw();
    });

    it('getMarkerStyle', () => {
      const point = {
        points: [
          {
            B: 2,
            points: [
              { x: 273, y: 480 },
              { x: 273, y: 304 },
            ],
          },
          {
            B: 3,
            points: [
              { x: 500, y: 480 },
              { x: 500, y: 216 },
            ],
          },
        ],
        yDim: 'B',
        isInCircle: true,
      };

      const pointCfg = AreaShapeFactory.getMarkerStyle('line', point);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
      expect(pointCfg.symbol().length).eql(5);
    });

    it('getActiveStyle has lineWidth cfg', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('line', {
        lineWidth: 2,
      });
      expect(activeStyle).eql({
        lineWidth: 3,
      });
    });

    it('getActiveStyle do not have lineWidth cfg', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('line', {});
      expect(activeStyle).eql({
        lineWidth: 2,
      });
    });
  });

  describe('smoothLine', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'smoothLine';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points2 = AreaShapeFactory.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
      });
      const points3 = AreaShapeFactory.getShapePoints(type, {
        x: 0.3,
        y: 0.2,
        y0: 0,
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
      expect(points3[0].x).eql(0.3);
      expect(points3[0].y).eql(0);
      expect(points3[1].x).eql(0.3);
      expect(points3[1].y).eql(0.2);

      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          color: 'blue',
          size: 2,
        },
        canvas
      );
      expect(shape.attr('stroke')).equal('blue');
      expect(shape.attr('fill')).equal('#fff');
      expect(shape.attr('fillStyle')).equal('#fff');
      expect(shape.attr('lineWidth')).equal(2);
      expect(shape.attr('path')).to.eql([
        [ 'M', 50, 400 ],
        [ 'C', 50, 400, 80, 250, 100, 250 ],
        [ 'C', 120, 250, 150, 400, 150, 400 ],
        [ 'L', 150, 500 ],
        [ 'C', 150, 500, 120, 500, 100, 500 ],
        [ 'C', 80, 500, 50, 500, 50, 500 ],
        [ 'Z' ],
      ]);
      canvas.draw();
    });
    it('getMarkerStyle', () => {
      const point = {
        points: [
          {
            B: 2,
            points: [
              { x: 273, y: 480 },
              { x: 273, y: 304 },
            ],
          },
          {
            B: 3,
            points: [
              { x: 500, y: 480 },
              { x: 500, y: 216 },
            ],
          },
        ],
        yDim: 'B',
        isInCircle: true,
      };

      const pointCfg = AreaShapeFactory.getMarkerStyle('smoothLine', point);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('registerShape', () => {
    registerShape('area', 'test', {
      getActiveStyle() {
        return 'test';
      },
    });

    it('getActiveStyle()', () => {
      const activeStyle = AreaShapeFactory.getActiveStyle('test');
      expect(activeStyle).to.equal('test');
    });
  });

  describe('area shapes Polar', () => {
    const Polar = getCoord('polar');
    const polarCoord = new Polar({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });
    it('getShapePoints && drawShape', () => {
      AreaShapeFactory.setCoord(polarCoord);
      const type = 'area';
      const points1 = AreaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.2,
        y0: 0,
      });
      const points2 = AreaShapeFactory.getShapePoints(type, {
        x: 0.2,
        y: 0.5,
        y0: 0,
      });
      const points3 = AreaShapeFactory.getShapePoints(type, {
        x: 0.3,
        y: 0.2,
        y0: 0,
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
      expect(points3[0].x).eql(0.3);
      expect(points3[0].y).eql(0);
      expect(points3[1].x).eql(0.3);
      expect(points3[1].y).eql(0.2);
      const shape = AreaShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
          isInCircle: true,
        },
        canvas
      );
      expect(shape.attr('path').length).equal(9);
      expect(shape.attr('fill')).eql('red');
      canvas.draw();
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

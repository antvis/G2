import { expect } from 'chai';
import { Canvas } from '@antv/g';
import LineShapeFactory from '../../../../src/element/shape/line';
import { registerShape } from '../../../../src/element/shape/base';
import { getCoordinate } from '@antv/coord';
import Global from '../../../../src/global';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('Line shape factory', () => {
  let div;
  let canvas;
  let coord;

  before(() => {
    div = document.createElement('div');
    div.id = 'line-shape';
    document.body.appendChild(div);

    coord = new Rect({
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
      containerId: 'line-shape',
      width: 500,
      height: 500,
    });

    LineShapeFactory.setCoord(coord);
    LineShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', () => {
    it('defaultShapeType', () => {
      expect(LineShapeFactory.defaultShapeType).to.be.equal('line');
    });
  });

  describe('line', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(2);
      expect(shape.attr('path')[0]).eqls(['M', 100, 100]);
      expect(shape.attr('path')[1]).eqls(['L', 200, 200]);
    });

    it('getMarkerStyle', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        opacity: 0.8,
      };

      const pointCfg = LineShapeFactory.getMarkerStyle('line', point);
      expect(pointCfg.lineWidth).to.be.equal(2);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });

    it('getActiveStyle', () => {
      const cfg = {
        lineWidth: 1,
      };
      const activeStyle = LineShapeFactory.getActiveStyle('line', cfg);
      expect(activeStyle).to.eql({ lineWidth: 2 });
    });
  });

  describe('line has size', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
          size: 10,
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineWidth')).eql(10);
    });
  });

  describe('line point.y = []', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [{ x: 100, y: [100, 200] }, { x: 200, y: [200, 300] }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls(['M', 100, 200]);
      expect(shape.attr('path')[1]).eqls(['L', 200, 300]);
    });
  });

  describe('line point.x = [], point.y = []', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'line';
      const points = [{ x: [100, 50], y: [100, 200] }, { x: [200, 80], y: [200, 300] }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eql(['M', 50, 200]);
      expect(shape.attr('path')[1]).eql(['L', 80, 300]);
      expect(shape.attr('path')[2]).eqls(['M', 100, 100]);
      expect(shape.attr('path')[3]).eqls(['L', 200, 200]);
    });
  });

  describe('showSinglePoint', () => {
    it('drawShape', () => {
      const points = [{ x: 50, y: 50 }];
      const shape = LineShapeFactory.drawShape(
        'line',
        {
          points,
          color: 'blue',
          showSinglePoint: true,
        },
        canvas
      );

      expect(shape.type).to.equal('circle');
      expect(shape.name).to.equal('line');
      expect(shape.attr('x')).to.equal(50);
      expect(shape.attr('y')).to.equal(50);
      expect(shape.attr('fill')).to.equal('blue');
      expect(shape.attr('fillStyle')).to.equal('blue');
    });

    it('getActiveStyle', () => {
      const activeStyle = LineShapeFactory.getActiveStyle('line', {});
      expect(activeStyle).to.eql({ lineWidth: 2 });
    });
  });

  describe('dot', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'dot';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([1, 1]);
    });
    it('getMarkerStyle', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
      };

      const pointCfg = LineShapeFactory.getMarkerStyle('dot', point);

      expect(pointCfg.lineDash).eql([1, 1]);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('dash', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'dash';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('lineDash')).eql([5.5, 1]);
    });
    it('getMarkerStyle', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
      };

      const pointCfg = LineShapeFactory.getMarkerStyle('dash', point);

      expect(pointCfg.lineDash).eql([5.5, 1]);
      expect(pointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('smooth', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'smooth';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 50, y: 50 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(7);
      expect(shape.attr('path')[2].length).eql(7);
    });
    it('getMarkerStyle', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord,
      };

      const pointCfg = LineShapeFactory.getMarkerStyle('smooth', point);
      expect(pointCfg.lineWidth).to.be.equal(2);
      expect(pointCfg.stroke).to.be.equal(Global.theme.defaultColor);
    });
  });

  describe('hv', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hv';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];

      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls(['M', 100, 100]);
      expect(shape.attr('path')[1]).eqls(['L', 200, 100]);
      expect(shape.attr('path')[2]).eqls(['L', 200, 200]);
    });
  });

  describe('vh', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'vh';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );

      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(3);
      expect(shape.attr('path')[0]).eqls(['M', 100, 100]);
      expect(shape.attr('path')[1]).eqls(['L', 100, 200]);
      expect(shape.attr('path')[2]).eqls(['L', 200, 200]);
    });
  });

  describe('hvh', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hvh';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];

      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0]).eqls(['M', 100, 100]);
      expect(shape.attr('path')[1]).eqls(['L', 150, 100]);
      expect(shape.attr('path')[2]).eqls(['L', 150, 200]);
      expect(shape.attr('path')[3]).eqls(['L', 200, 200]);
    });
  });

  describe('vhv', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'vhv';
      const points = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      const shape = LineShapeFactory.drawShape(
        type,
        {
          points,
          color: 'red',
        },
        canvas
      );
      expect(shape.attr('stroke')).eql('red');
      expect(shape.attr('path').length).eql(4);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
    });
    it('hv vh hvh vhv getMarkerStyle', () => {
      const point = {
        size: 30,
        yDim: 'berlin',
        coord,
      };

      const pointCfg = LineShapeFactory.getMarkerStyle('hv', point);
      const vhPointCfg = LineShapeFactory.getMarkerStyle('vh', point);
      const hvhPointCfg = LineShapeFactory.getMarkerStyle('hvh', point);
      const vhvPointCfg = LineShapeFactory.getMarkerStyle('vhv', point);

      expect(pointCfg.symbol).to.be.an.instanceof(Function);
      expect(vhPointCfg.symbol).to.be.an.instanceof(Function);
      expect(hvhPointCfg.symbol).to.be.an.instanceof(Function);
      expect(vhvPointCfg.symbol).to.be.an.instanceof(Function);
    });
  });

  describe('polar coordinate', () => {
    const polar = new Polar({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });
    it('line', () => {
      LineShapeFactory._coord = polar;
      const points = [{ x: 20, y: 10 }, { x: 40, y: 10 }, { x: 60, y: 10 }, { x: 80, y: 10 }];
      const shape = LineShapeFactory.drawShape(
        'smooth',
        {
          points,
          isInCircle: true,
          color: '#1890ff',
          smooth: true,
        },
        canvas
      );

      expect(shape.attr('stroke')).to.equal('#1890ff');
      expect(shape.attr('path')).to.eql([
        ['M', 20, 10],
        ['C', 20, 10, 32, 10, 40, 10],
        ['C', 48, 10, 52, 10, 60, 10],
        ['C', 68, 10, 84, 10, 80, 10],
        ['C', 68, 10, 20, 10, 20, 10],
      ]);
    });
  });

  describe('register a line shape', () => {
    registerShape('line', 'test', {
      draw() {
        return null;
      },
      getActiveStyle() {
        return 'activeStyle';
      },
      getMarkerStyle() {
        return 'markerStyle';
      },
    });

    it('drawShape', () => {
      const shape = LineShapeFactory.drawShape('test', {
        points: [{ x: 1, y: 2 }, { x: 2, y: 2 }],
        canvas,
      });
      expect(shape).to.be.null;
    });

    it('getActiveStyle', () => {
      const activeStyle = LineShapeFactory.getActiveStyle('test');
      expect(activeStyle).to.equal('activeStyle');
    });

    it('getMarkerStyle', () => {
      const markerStyle = LineShapeFactory.getMarkerStyle('test');
      expect(markerStyle).to.equal('markerStyle');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

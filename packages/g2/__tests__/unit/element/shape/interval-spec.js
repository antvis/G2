import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getCoordinate } from '@antv/coord';
import { isNumberEqual, mix } from '@antv/util';
import { registerShape } from '../../../../src/element/shape/base';
import IntervalShapeFactory from '../../../../src/element/shape/interval';
import Global from '../../../../src/global';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('Interval shape', () => {
  let div;
  let canvas;
  let rectCoord;
  let polarCoord;

  before(() => {
    div = document.createElement('div');
    div.id = 'intervalShape';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'intervalShape',
      width: 500,
      height: 500,
      pixelRatio: 2,
    });

    polarCoord = new Polar({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });

    rectCoord = new Rect({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });

    IntervalShapeFactory.setTheme(Global.theme.shape);
  });

  describe('default', () => {
    it('defaultShapeType', () => {
      expect(IntervalShapeFactory.defaultShapeType).to.equal('rect');
    });

    it('getDefaultPoint(), x and y are number', () => {
      const cfg = {
        x: 1,
        y: 2,
        y0: 0,
        size: 10,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).to.eql([{ x: -4, y: 0 }, { x: -4, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 0 }]);
    });

    it('getDefaultPoint(), x is number, y is array', () => {
      const cfg = {
        x: 1,
        y: [2, 4],
        size: 10,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).to.eql([{ x: -4, y: 2 }, { x: -4, y: 4 }, { x: 6, y: 4 }, { x: 6, y: 2 }]);
    });

    it('getDefaultPoint(), x is array, y is number', () => {
      const cfg = {
        x: [3, 5],
        y: 2,
        y0: 0,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).to.eql([{ x: 3, y: 0 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 0 }]);
    });

    it('getDefaultPoint(), x and y are array', () => {
      const cfg = {
        x: [3, 5],
        y: [2, 4],
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).to.eql([{ x: 3, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 2 }]);
    });
  });

  describe('rect', () => {
    it('draw', () => {
      IntervalShapeFactory.setCoord(rectCoord);
      const cfg = {
        x: 0.25,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('rect', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'rect',
        {
          points,
          color: 'red',
        },
        canvas
      );
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(6);
      expect(path[2][1] - path[1][1]).to.equal(100);
    });

    it('getActiveStyle()', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('rect', {});
      expect(activeStyle).to.eql({ fillOpacity: 0.85 });
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('rect', {
        color: 'red',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          radius: 4,
          symbol: 'square',
          fill: 'red',
        })
      );
    });
  });

  describe('rect in theta coord', () => {
    const thetaCoord = new Polar({
      start: {
        x: 0,
        y: 500,
      },
      end: {
        x: 500,
        y: 0,
      },
    });

    thetaCoord.type = 'theta';
    thetaCoord.transpose();

    it('draw', () => {
      IntervalShapeFactory.setCoord(thetaCoord);
      const cfg = {
        x: 0.25,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('rect', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'rect',
        {
          points,
          color: 'blue',
        },
        canvas
      );
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('fill')).eql('blue');
      expect(shape.attr('path').length).eql(6);
      expect(path[1][0]).to.equal('A');
      expect(path[3][0]).to.equal('A');
    });

    xit('getSelectedStyle()', () => {
      const selectedStyle = IntervalShapeFactory.getSelectedStyle('rect', {
        origin: {
          x: 260,
          y: 220,
        },
      });
      expect(selectedStyle.transform.length).to.equal(1);
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('rect', {
        isInCircle: true,
        color: 'blue',
      });

      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          radius: 4.5,
          symbol: 'circle',
          fill: 'blue',
        })
      );
    });
  });

  describe('hollowInterval', () => {
    it('draw', () => {
      IntervalShapeFactory.setCoord(rectCoord);
      const cfg = {
        x: 0.25,
        y: 0.8,
        y0: 0.6,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('hollowInterval', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'hollowInterval',
        {
          points,
          color: 'yellow',
        },
        canvas
      );
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('stroke')).eql('yellow');
      expect(shape.attr('path').length).eql(6);
      expect(path[2][1] - path[1][1]).to.equal(100);
      expect(path[0][2] - path[1][2]).to.equal(100);
    });

    it('getActiveStyle()', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('hollowInterval', {
        lineWidth: 1,
      });
      expect(activeStyle).to.eql({
        lineWidth: 2,
      });
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('hollowInterval', {
        color: 'yellow',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.hollowInterval.default, {
          stroke: 'yellow',
          symbol: 'square',
          radius: 4,
        })
      );
    });
  });

  describe('hollowInterval in polar coord', () => {
    it('draw', () => {
      IntervalShapeFactory.setCoord(polarCoord);
      const cfg = {
        x: 0.25,
        y: 0.2,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('hollowInterval', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'hollowInterval',
        {
          points,
          color: 'yellow',
        },
        canvas
      );
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('stroke')).eql('yellow');
      expect(shape.attr('path').length).eql(5);
      expect(
        isNumberEqual(
          Math.sqrt(Math.pow(path[1][1] - path[0][1], 2) + Math.pow(path[1][2] - path[0][2], 2)),
          polarCoord.getRadius() * 0.2
        )
      ).to.be.true;
    });

    it('getActiveStyle()', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('hollowInterval', {});
      expect(activeStyle).to.eql({
        lineWidth: 2,
      });
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('hollowInterval', {
        color: 'yellow',
        isInCircle: true,
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.hollowInterval.default, {
          stroke: 'yellow',
          symbol: 'circle',
          radius: 4.5,
        })
      );
    });
  });

  describe('line', () => {
    it('getPoints()', () => {
      const cfg = {
        x: 0.6,
        y: 0.5,
        y0: 0,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      expect(points).to.eql([{ x: 0.6, y: 0.5 }, { x: 0.6, y: 0 }]);
    });

    it('getPoints(), y is array', () => {
      const cfg = {
        x: 0.6,
        y: [0.2, 0.5],
        y0: 0,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      expect(points).to.eql([{ x: 0.6, y: 0.2 }, { x: 0.6, y: 0.5 }]);
    });

    it('draw', () => {
      IntervalShapeFactory.setCoord(rectCoord);

      const cfg = {
        x: 0.6,
        y: 0.25,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'line',
        {
          color: 'green',
          points,
          size: 5,
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('stroke')).to.equal('green');
      expect(path.length).to.equal(4);
      expect(path[1][2] - path[0][2]).to.equal(125);
    });

    it('getActiveStyle', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('line', {
        lineWidth: 4,
      });
      expect(activeStyle).to.eql({
        lineWidth: 5,
      });
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('line', {
        color: 'green',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.hollowInterval.default, {
          stroke: 'green',
          symbol: 'line',
          radius: 5,
        })
      );
    });
  });

  describe('tick', () => {
    it('getPoints()', () => {
      const cfg = {
        x: 0.5,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      expect(points).to.eql([
        { x: 0.4, y: 0.5 },
        { x: 0.6, y: 0.5 },
        { x: 0.5, y: 0.5 },
        { x: 0.5, y: 0 },
        { x: 0.4, y: 0 },
        { x: 0.6, y: 0 },
      ]);
    });

    it('getPoints(), y is array', () => {
      const cfg = {
        x: 0.5,
        y: [0.5, 0.8],
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      expect(points).to.eql([
        { x: 0.4, y: 0.8 },
        { x: 0.6, y: 0.8 },
        { x: 0.5, y: 0.8 },
        { x: 0.5, y: 0.5 },
        { x: 0.4, y: 0.5 },
        { x: 0.6, y: 0.5 },
      ]);
    });

    it('draw', () => {
      const cfg = {
        x: 0.5,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'tick',
        {
          points,
          color: 'pink',
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('stroke')).to.equal('pink');
      expect(path.length).to.equal(6);
      expect(path[1][1] - path[0][1]).to.equal(100);
      expect(path[3][2] - path[2][2]).to.equal(250);
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('tick', {
        color: 'pink',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.hollowInterval.default, {
          symbol: 'tick',
          radius: 5,
          stroke: 'pink',
        })
      );
    });
  });

  describe('funnel', () => {
    it('getPoints()', () => {
      const cfg = {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('funnel', cfg);
      expect(points).to.eql([{ x: 0.25, y: 0.2 }, { x: 0.25, y: 0.5 }, { x: 0.35, y: 0.5 }, { x: 0.35, y: 0.2 }]);
    });

    it('draw, nextPoints is null', () => {
      const cfg = {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('funnel', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'funnel',
        {
          points,
          nextPoints: null,
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).to.equal(Global.theme.defaultColor);
      expect(path.length).to.equal(5);
      expect(path[2][1] - path[1][1]).to.equal(50);
      expect(path[0][2] - path[1][2]).to.equal(150);
    });

    it('draw, nextPoints is not null', () => {
      const points = IntervalShapeFactory.getShapePoints('funnel', {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      });
      const nextPoints = IntervalShapeFactory.getShapePoints('funnel', {
        x: 0.5,
        y: [0.3, 0.4],
        size: 0.05,
      });
      const shape = IntervalShapeFactory.drawShape(
        'funnel',
        {
          points,
          nextPoints,
          color: 'yellow',
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).to.equal('yellow');
      expect(path).to.eql([['M', 125, 400], ['L', 125, 250], ['L', 225, 300], ['L', 225, 350], ['Z']]);
    });

    it('getActiveStyle', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('funnel', {
        opacity: 0.5,
      });
      expect(activeStyle, {
        fillOpacity: 0.35,
      });
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('funnel', {
        color: 'yellow',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          symbol: 'square',
          radius: 4,
          fill: 'yellow',
        })
      );
    });
  });

  describe('pyramid', () => {
    it('getPoints()', () => {
      const cfg = {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('pyramid', cfg);
      expect(points).to.eql([{ x: 0.2, y: 0.6 }, { x: 0.2, y: 0.8 }, { x: 0.3, y: 0.7 }]);
    });

    it('draw, nextPoints is null', () => {
      const cfg = {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('pyramid', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'pyramid',
        {
          points,
          nextPoints: null,
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).to.equal(Global.theme.defaultColor);
      expect(path).to.eql([['M', 100, 200], ['L', 100, 100], ['L', 150, 150], ['Z']]);
    });

    it('draw, nextPoints is not null', () => {
      const points = IntervalShapeFactory.getShapePoints('pyramid', {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      });
      const nextPoints = IntervalShapeFactory.getShapePoints('pyramid', {
        x: 0.5,
        y: [0.65, 0.75],
        size: 0.05,
      });
      const shape = IntervalShapeFactory.drawShape(
        'pyramid',
        {
          points,
          nextPoints,
          color: 'red',
        },
        canvas
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).to.equal('red');
      expect(path).to.eql([['M', 100, 200], ['L', 100, 100], ['L', 225, 125], ['L', 225, 175], ['Z']]);
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('pyramid', {
        color: 'red',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          symbol: 'square',
          radius: 4,
          fill: 'red',
        })
      );
    });
  });

  describe('top-line', () => {
    it('draw, with style', () => {
      const cfg = {
        x: 0.8,
        y: 0.25,
        y0: 0,
        size: 0.1,
      };
      const container = canvas.addGroup();
      const points = IntervalShapeFactory.getShapePoints('top-line', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'top-line',
        {
          points,
          color: '#F04864',
          style: {
            stroke: '#000',
          },
        },
        container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).to.equal('#F04864');
      expect(path.length).to.equal(6);
      expect(path[0][2] - path[1][2]).to.equal(125);
      expect(container.get('children').length).to.equal(2);
      expect(container.get('children')[1].attr('stroke')).to.equal('#000');
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('top-line', {
        color: '#F04864',
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          symbol: 'square',
          radius: 4,
          fill: '#F04864',
        })
      );
    });
  });

  describe('top-line in polar coordinate', () => {
    it('draw, without style', () => {
      IntervalShapeFactory.setCoord(polarCoord);

      const cfg = {
        x: 0.7,
        y: 0.25,
        y0: 0,
        size: 0.05,
      };
      const container = canvas.addGroup();
      const points = IntervalShapeFactory.getShapePoints('top-line', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'top-line',
        {
          points,
        },
        container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(path.length).to.equal(5);
      expect(path[2][0]).to.equal('A');
      expect(container.get('children').length).to.equal(2);
      expect(container.get('children')[1].attr('stroke')).to.equal('white');
    });

    it('getMarkerStyle()', () => {
      const markerStyle = IntervalShapeFactory.getMarkerStyle('top-line', {
        color: '#1890ff',
        isInCircle: true,
      });
      expect(markerStyle).to.eql(
        mix({}, Global.theme.shape.interval.rect.default, {
          symbol: 'circle',
          radius: 4.5,
          fill: '#1890ff',
        })
      );
    });
  });

  describe('registerShape', () => {
    registerShape('interval', '_test', {
      getActiveStyle() {
        return '_test';
      },
    });

    it('getActiveStyle()', () => {
      const activeStyle = IntervalShapeFactory.getActiveStyle('_test');
      expect(activeStyle).to.equal('_test');
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});

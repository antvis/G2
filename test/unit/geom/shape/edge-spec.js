const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Global = require('../../../../src/global');
const Shape = require('../../../../src/geom/shape/shape');
const Coord = require('@antv/coord/lib/');
require('../../../../src/geom/shape/edge');

const div = document.createElement('div');
div.id = 'csedge';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'csedge',
  width: 500,
  height: 500
});

describe('edge shape test', () => {

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
  const shapeObj = Shape.getShapeFactory('edge');
  shapeObj._coord = coord;

  it('get default shape', () => {
    expect(shapeObj).not.equal(undefined);
    const shape = shapeObj.getShape();
    expect(shape).not.equal(undefined);
  });

  describe('line shape', () => {
    it('get shape', () => {
      const shape = shapeObj.getShape('line');
      expect(shape).not.equal(undefined);
    });

    it('get points', () => {
      const obj = {
        x: [ 0.1, 0.2 ],
        y: [ 0.3, 0.5 ]
      };
      const points = shapeObj.getShapePoints('line', obj);
      expect(points.length).equal(2);
      expect(points[0].x).equal(0.1);
      expect(points[0].y).equal(0.3);
    });

    it('draw shape', () => {
      const obj = {
        x: [ 0.2, 0.4 ],
        y: [ 0.5, 0.5 ]
      };
      const points = shapeObj.getShapePoints('line', obj);
      const shape = shapeObj.drawShape('line', {
        points,
        color: 'red'
      }, canvas);

      expect(shape.attr('path')).eqls([[ 'M', 100, 250 ], [ 'L', 200, 250 ]]);
      expect(canvas.get('children').length).equal(1);
    });

    it('draw shape vhv', () => {
      const obj = {
        x: [ 0.1, 0.1 ],
        y: [ 0.1, 0.3 ]
      };
      const points = shapeObj.getShapePoints('vhv', obj);
      const shape = shapeObj.drawShape('vhv', {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('path').length).equal(4);

    });
    if (Global.renderer === 'canvas') {
      it('draw shape arc rect', () => {
        const obj = {
          x: [ 0.2, 0.4 ],
          y: [ 0.5, 0.5 ]
        };
        const points = shapeObj.getShapePoints('arc', obj);
        const shape = shapeObj.drawShape('arc', {
          points,
          color: 'red'
        }, canvas);
        expect(shape.attr('r')).equal(50);
        expect(shape.attr('startAngle')).eql(Math.PI);
        expect(shape.attr('endAngle')).eql(Math.PI * 2);
        expect(shape.attr('x')).eql(150);
        expect(shape.attr('y')).eql(250);
        canvas.draw();

      });

      it('draw shape arc rect hasWeight', () => {
        const obj = {
          x: [ 0.2, 0.4, 0.6, 0.7 ],
          y: [ 0.1, 0.1, 0.5, 0.5 ]
        };
        const points = shapeObj.getShapePoints('arc', obj);
        const shape = shapeObj.drawShape('arc', {
          points,
          color: 'green'
        }, canvas);
        expect(shape.attr('path').length).equal(7);

        canvas.draw();
      });
    }
    // xit('getActiveCfg', function() {
    //   const activeCfg = shapeObj.getActiveCfg();
    //   expect(activeCfg).eql({
    //     strokeOpacity: 0.7
    //   });
    // });
  });
});
if (Global.renderer === 'canvas') {
  describe('edge shape test polar', () => {
    const canvas2 = canvas;
    const coord2 = new Coord.Polar({
      start: {
        x: 0,
        y: 500
      },
      end: {
        x: 500,
        y: 0
      }
    });

    it('draw shape arc polar hasWeight', () => {
      const shapeObj = Shape.getShapeFactory('edge');
      shapeObj._coord = coord2;
      const obj = {
        x: [ 0.2, 0.4, 0.6, 0.7 ],
        y: [ 0.5, 0.5, 0.5, 0.5 ]
      };
      const points = shapeObj.getShapePoints('arc', obj);
      const shape = shapeObj.drawShape('arc', {
        points,
        color: 'green',
        isInCircle: true,
        center: {
          x: 230,
          y: 250
        }
      }, canvas2);
      expect(shape.attr('path').length).equal(8);
      expect(shape.attr('path')).eql(
        [
          [ 'M', 368.8820645368942, 211.37287570313157 ],
          [ 'Q',
            250.00000000000003,
            0,
            131.11793546310582,
            288.62712429686843 ],
          [ 'A',
            124.99999999999999,
            124.99999999999999,
            0,
            1,
            1,
            131.11793546310582,
            288.62712429686843 ],
          [ 'A',
            125,
            125,
            0,
            0,
            0,
            176.52684346344085,
            351.12712429686843 ],
          [ 'Q',
            250.00000000000003,
            0,
            323.47315653655915,
            351.12712429686843 ],
          [ 'A',
            125,
            125,
            0,
            0,
            1,
            323.47315653655915,
            351.12712429686843 ],
          [ 'A',
            124.99999999999999,
            124.99999999999999,
            0,
            0,
            0,
            368.8820645368942,
            211.37287570313157 ],
          [ 'Z' ]
        ]
      );
    });
    it('draw shape arc polar', () => {
      const shapeObj = Shape.getShapeFactory('edge');
      shapeObj._coord = coord2;
      const obj = {
        x: [ 0.2, 0.4 ],
        y: [ 0.5, 0.5 ]
      };
      const points = shapeObj.getShapePoints('arc', obj);
      const shape = shapeObj.drawShape('arc', {
        points,
        color: 'red',
        isInCircle: true,
        center: {
          x: 230,
          y: 250
        }
      }, canvas2);
      expect(shape.attr('path').length).equal(2);
      expect(shape.attr('path')).eql(
        [
          [ 'M', 368.8820645368942, 211.37287570313157 ],
          [ 'Q', 250.00000000000003, 0, 323.47315653655915, 351.12712429686843 ]
        ]
      );
      canvas2.draw();
    });

    it('clear', () => {
      canvas.clear();
      canvas.destroy();
      document.body.removeChild(div);
    });
  });
}


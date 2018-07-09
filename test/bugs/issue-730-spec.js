const expect = require('chai').expect;
const { Canvas } = require('../../src/renderer');
const Shape = require('../../src/geom/shape/shape');
const Coord = require('../../src/coord/');
require('../../src/geom/shape/edge');

const div = document.createElement('div');
div.id = 'csedge';
document.body.appendChild(div);
const canvas = new Canvas({
  containerId: 'csedge',
  width: 500,
  height: 500
});
describe('#730', () => {
  it('arc direction', () => {

    const coord = new Coord.Polar({
      start: { x: 0, y: 500 },
      end: { x: 500, y: 0 },
      startAngle: 6,
      endAngle: 3,
      innerRadius: 0.3
    });
    const shapeObj = Shape.getShapeFactory('edge');
    shapeObj._coord = coord;
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
    }, canvas);
    expect(shape.attr('path').length).equal(8);
    expect(shape.attr('path')).eql(
      [
        [ 'M', 360.27450827599966, 231.34131348761517 ],
        [ 'Q', 499.99999999999994, 288.2096172921748, 134.6177879398623, 245.43810097501847 ],
        [ 'A', 165.84782027366163, 165.84782027366163, 0, 0, 0, 134.6177879398623, 245.43810097501847 ],
        [ 'A', 165.84782027366163, 165.84782027366163, 0, 0, 1, 173.7033896727621, 214.95367727554216 ],
        [ 'Q', 499.99999999999994, 288.2096172921748, 269.52359393728557, 194.29089032447982 ],
        [ 'A', 165.84782027366163, 165.84782027366163, 0, 0, 0, 269.52359393728557, 194.29089032447982 ],
        [ 'A', 165.84782027366163, 165.84782027366163, 0, 0, 1, 360.27450827599966, 231.34131348761517 ],
        [ 'Z' ]
      ]
    );
  });
});

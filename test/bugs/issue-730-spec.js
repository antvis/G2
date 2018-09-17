const expect = require('chai').expect;
const { Canvas } = require('../../src/renderer');
const Shape = require('../../src/geom/shape/shape');
const Coord = require('@antv/coord/lib/');
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
        [ 'M', 401.24050295113045, 219.29627573959306 ],
        [ 'Q', 490.52723201381275, 89.36622397684033, 178.74731436635312, 307.27359825797487 ],
        [ 'A', 163.4954289700296, 163.4954289700296, 0, 0, 1, 178.74731436635312, 307.27359825797487 ],
        [ 'A', 163.49542897002962, 163.49542897002962, 0, 0, 0, 230.10270324898926, 322.0460009231282 ],
        [ 'Q', 490.52723201381275, 89.36622397684033, 333.1723063161811, 299.8199446789916 ],
        [ 'A', 163.49542897002956, 163.49542897002956, 0, 0, 1, 333.1723063161811, 299.8199446789916 ],
        [ 'A', 163.49542897002956, 163.49542897002956, 0, 0, 0, 401.24050295113045, 219.29627573959306 ],
        [ 'Z' ]
      ]
    );
  });
});

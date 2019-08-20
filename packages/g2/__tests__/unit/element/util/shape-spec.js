import { expect } from 'chai';
import * as ShapeUtil from '../../../../src/element/util/shape';

describe('ShapeUtil', () => {
  it('splitPoints', () => {
    const point1 = {
      x: 1,
      y: 3,
    };

    const splitPoints1 = ShapeUtil.splitPoints(point1);
    expect(splitPoints1).to.eql([ { x: 1, y: 3 } ]);

    const point2 = {
      x: 1,
      y: [ 1, 2, 3 ],
    };
    const splitPoints2 = ShapeUtil.splitPoints(point2);
    expect(splitPoints2).to.eql([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ]);

    const point3 = {
      x: [ 1, 2, 3 ],
      y: [ 1, 2, 3 ],
    };
    const splitPoints3 = ShapeUtil.splitPoints(point3);
    expect(splitPoints3).to.eql([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ]);
  });

  it('setFillStyle', () => {
    const attrs1 = {};
    ShapeUtil.setFillStyle(attrs1, { color: 'red' });
    expect(attrs1.fill).to.equal('red');

    const attrs2 = {};
    ShapeUtil.setFillStyle(attrs2, { opacity: 0.6 });
    expect(attrs2.opacity).to.equal(0.6);
    expect(attrs2.fillOpacity).to.equal(0.6);

    const attrs3 = {};
    ShapeUtil.setFillStyle(attrs3, { color: 'red', opacity: 0.6 });
    expect(attrs3.fill).to.equal('red');
    expect(attrs3.opacity).to.equal(0.6);
    expect(attrs3.fillOpacity).to.equal(0.6);
  });

  it('setStrokeStyle', () => {
    const attrs1 = {};
    ShapeUtil.setStrokeStyle(attrs1, { color: 'red' });
    expect(attrs1.stroke).to.equal('red');

    const attrs2 = {};
    ShapeUtil.setStrokeStyle(attrs2, { opacity: 0.6 });
    expect(attrs2.opacity).to.equal(0.6);
    expect(attrs2.strokeOpacity).to.equal(0.6);

    const attrs3 = {};
    ShapeUtil.setStrokeStyle(attrs3, { color: 'red', opacity: 0.6 });
    expect(attrs3.stroke).to.equal('red');
    expect(attrs3.opacity).to.equal(0.6);
    expect(attrs3.strokeOpacity).to.equal(0.6);
  });
});

const expect = require('chai').expect;
const Helix = require('@antv/coord/lib/helix');

describe('Helix', () => {
  const coord = new Helix({
    start: {
      x: 0,
      y: 300
    },
    end: {
      x: 200,
      y: 0
    }
  });

  it('constructor', () => {
    const center = coord.center;

    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
    expect(coord.type).to.equal('helix');
    expect(coord.innerRadius).to.equal(0);
    expect(coord.startAngle).to.equal(1.25 * Math.PI);
    expect(coord.endAngle).to.equal(7.25 * Math.PI);
  });

  // TODO
  it('convert & invert', () => {
    let point2 = {
      x: 0,
      y: 0
    };
    point2 = coord.convert(point2);
    point2 = coord.invert(point2);

    expect(point2.x).to.equal(0);
    expect(point2.y).to.equal(0);

    point2 = {
      x: 0.7,
      y: 0.7
    };
    point2 = coord.convert(point2);
    point2 = coord.invert(point2);

    expect(point2.x).to.equal(0.7);
  });
});

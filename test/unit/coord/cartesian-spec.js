const expect = require('chai').expect;
const Util = require('../../../src/util');
const Cartesian = require('@antv/coord/lib/cartesian');

describe('Cartesian', () => {
  const coord = new Cartesian({
    start: {
      x: 0,
      y: 300
    },
    end: {
      x: 200,
      y: 0
    }
  });

  it('construction', () => {
    const center = coord.center;
    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
  });

  it('convert', () => {
    let point = {
      x: 0.2,
      y: 0.7
    };
    point = coord.convert(point);
    expect(point.x).to.equal(40);
    expect(point.y).to.equal(90);
  });

  it('invert', () => {
    let point = {
      x: 40,
      y: 90
    };
    point = coord.invert(point);
    expect(point.x).to.equal(0.2);
    expect(point.y).to.equal(0.7);
  });

  it('getWidth and getHeight', () => {
    const width = coord.getWidth();
    const height = coord.getHeight();

    expect(width).to.equal(200);
    expect(height).to.equal(300);
  });

  it('translate', () => {
    let point = {
      x: 0.2,
      y: 0.7
    };
    coord.translate(100, 20);
    point = coord.convert(point);
    expect(point.x).to.equal(140);
    expect(point.y).to.equal(110);
    coord.translate(-100, -20);
  });

  it('rotate', () => {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.rotate(Math.PI / 2);
    point = coord.convert(point);
    expect(point.x).to.equal(160);
    expect(point.y).to.equal(150);
    coord.rotate(-Math.PI / 2);
  });

  it('scale', () => {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.scale(2, 2);
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(30);
    coord.scale(0.5, 0.5);
  });

  it('reflect x', () => {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(90);
    coord.reflect('x');
  });

  it('reflect y', () => {
    let point = {
      x: 0.3,
      y: 0.5
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(point.x).to.equal(60);
    expect(point.y).to.equal(150);
    coord.reflect('y');
  });

  it('trans', () => {
    coord.rotate(Math.PI / 2);
    const vector = coord.applyMatrix(1, 0);
    expect(Util.snapEqual(vector[0], 0)).to.be.true;
    expect(Util.snapEqual(vector[1], 1)).to.be.true;
  });

  it('reverse', () => {
    const vector = coord.invertMatrix(0, 1);
    expect(Util.snapEqual(vector[0], 1)).to.be.true;
    expect(Util.snapEqual(vector[1], 0)).to.be.true;
  });
});

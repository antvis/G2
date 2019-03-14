const expect = require('chai').expect;
const Polar = require('@antv/coord/lib/polar');

describe('Polar', () => {
  const coord = new Polar({
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
    const center = coord.getCenter();
    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
    expect(coord.radius).to.equal(100);
  });

  it('convert', () => {
    let point = {
      x: 0,
      y: 1
    };
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(50);
    point = {
      x: 0.25,
      y: 1
    };
    point = coord.convert(point);
    expect(point.x).to.equal(200);
    expect(point.y).to.equal(150);

    point = {
      x: 0.5,
      y: 0.5
    };
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(200);
  });

  it('invert', () => {
    let point = {
      x: 100,
      y: 200
    };
    point = coord.invert(point);
    expect(point.x).to.equal(0.5);
    expect(point.y).to.equal(0.5);
  });

  it('getWidth and getHeight', () => {
    expect(coord.getWidth()).to.equal(200);
    expect(coord.getHeight()).to.equal(300);
  });

  it('translate', () => {
    let point = {
      x: 0.25,
      y: 1
    };
    coord.translate(100, 20);
    point = coord.convert(point);
    expect(point.x).to.equal(300);
    expect(point.y).to.equal(170);
    coord.translate(-100, -20);
  });

  it('rotate', () => {
    let point = {
      x: 0.5,
      y: 0.5
    };
    coord.rotate(Math.PI / 2);
    point = coord.convert(point);
    expect(point.x).to.equal(50);
    expect(point.y).to.equal(150);
    coord.rotate(-Math.PI / 2);
  });

  it('scale', () => {
    let point = {
      x: 0.5,
      y: 0.5
    };
    coord.scale(2, 2);
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(250);
    coord.scale(0.5, 0.5);
  });

  it('reflect x', () => {
    let point = {
      x: 0.25,
      y: 0.5
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point.x).to.equal(50);
    expect(point.y).to.equal(150);
    coord.reflect('x');
  });

  it('reflect y', () => {
    let point = {
      x: 0.75,
      y: 0.5
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(point.x).to.equal(50);
    expect(point.y).to.equal(150);
    coord.reflect('y');
  });

  it('endAngle < startAngle', () => {
    const coord = new Polar({
      start: { x: 80, y: 355 },
      end: { x: 480, y: 20 },
      startAngle: 1 / 2 * Math.PI,
      endAngle: -1 / 2 * Math.PI
    });
    expect(coord.startAngle).to.equal(1 / 2 * Math.PI);
    expect(coord.endAngle).to.equal(3 / 2 * Math.PI);
  });
});

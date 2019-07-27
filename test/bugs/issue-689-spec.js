const expect = require('chai').expect;
const Coord = require('@antv/coord/lib/index');

describe('#689 极坐标图形在画布内', () => {
  it('锐角扇形 宽画布', () => {
    const width = 800;
    const height = 400;
    const startAngle = Math.PI * (8 / 6);
    const endAngle = Math.PI * (10 / 6);

    const coord = new Coord.Polar({
      start: { x: 0, y: height },
      end: { x: width, y: 0 },
      startAngle,
      endAngle
    });
    for (let i = startAngle; i <= endAngle; i += Math.PI / 180) {
      const point = {
        x: Math.cos(i) * coord.radius + coord.center.x,
        y: Math.sin(i) * coord.radius + coord.center.y
      };
      expect(point.x >= 0 && point.x <= width).to.be.true;
      expect(point.y >= 0 && point.y <= height).to.be.true;
    }
    expect(coord.center.y >= 0 && coord.center.y <= height).to.be.true;
    expect(coord.center.x >= 0 && coord.center.x <= width).to.be.true;
  });
  it('锐角扇形 宽画布 反向', () => {
    const width = 800;
    const height = 400;
    const startAngle = Math.PI * (10 / 6);
    const endAngle = Math.PI * (8 / 6);

    const coord = new Coord.Polar({
      start: { x: 0, y: height },
      end: { x: width, y: 0 },
      startAngle,
      endAngle
    });
    for (let i = startAngle; i <= endAngle; i += Math.PI / 180) {
      const point = {
        x: Math.cos(i) * coord.radius + coord.center.x,
        y: Math.sin(i) * coord.radius + coord.center.y
      };
      expect(point.x >= 0 && point.x <= width).to.be.true;
      expect(point.y >= 0 && point.y <= height).to.be.true;
    }
    expect(coord.center.y >= 0 && coord.center.y <= height).to.be.true;
    expect(coord.center.x >= 0 && coord.center.x <= width).to.be.true;
  });
  it('锐角扇形 高画布', () => {
    const width = 400;
    const height = 800;
    const startAngle = Math.PI * (7 / 6);
    const endAngle = Math.PI * (8 / 6);

    const coord = new Coord.Polar({
      start: { x: 0, y: height },
      end: { x: width, y: 0 },
      startAngle,
      endAngle
    });
    for (let i = startAngle; i <= endAngle; i += Math.PI / 180) {
      const point = {
        x: Math.cos(i) * coord.radius + coord.center.x,
        y: Math.sin(i) * coord.radius + coord.center.y
      };
      expect(point.x >= 0 && point.x <= width).to.be.true;
      expect(point.y >= 0 && point.y <= height).to.be.true;
    }
    expect(coord.center.y >= 0 && coord.center.y <= height).to.be.true;
    expect(coord.center.x >= 0 && coord.center.x <= width).to.be.true;
  });
  it('钝角扇形 宽画布', () => {
    const width = 800;
    const height = 400;
    const startAngle = Math.PI * (5 / 6);
    const endAngle = Math.PI * (15 / 6);

    const coord = new Coord.Polar({
      start: { x: 0, y: height },
      end: { x: width, y: 0 },
      startAngle,
      endAngle
    });
    for (let i = startAngle; i <= endAngle; i += Math.PI / 180) {
      const point = {
        x: Math.cos(i) * coord.radius + coord.center.x,
        y: Math.sin(i) * coord.radius + coord.center.y
      };
      expect(point.x >= 0 && point.x <= width).to.be.true;
      expect(point.y >= 0 && point.y <= height).to.be.true;
    }
  });
  it('钝角扇形 高画布', () => {
    const width = 400;
    const height = 800;
    const startAngle = Math.PI * (1 / 6);
    const endAngle = Math.PI * (12 / 6);

    const coord = new Coord.Polar({
      start: { x: 0, y: height },
      end: { x: width, y: 0 },
      startAngle,
      endAngle
    });
    for (let i = startAngle; i <= endAngle; i += Math.PI / 180) {
      const point = {
        x: Math.cos(i) * coord.radius + coord.center.x,
        y: Math.sin(i) * coord.radius + coord.center.y
      };
      expect(point.x >= 0 && point.x <= width).to.be.true;
      expect(point.y >= 0 && point.y <= height).to.be.true;
    }
  });
});

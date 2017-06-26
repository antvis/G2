const expect = require('chai').expect;
const GMapProjection = require('@ali/g-map-projection');
const Map = require('../../../src/coord/map');

describe('Map', function() {
  const coord = new Map({
    start: {
      x: 0,
      y: 300
    },
    end: {
      x: 200,
      y: 0
    },
    min: [ 10, 10 ],
    max: [ 100, 100 ]
  });


  it('construction', function() {
    const center = coord.center;
    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
    const projection = coord.projection;
    const project = coord.project;
    expect(projection).to.equal('mercator');
    expect(project).to.be.an.instanceof(GMapProjection.mercator);
    expect(coord.isRect).to.be.true;
  });

  it('convert', function() {
    coord.originMin = [ 0, 0 ];
    coord.originMax = [ 120, 120 ];
    let point = {
      x: 0.2,
      y: 0.7
    };
    point = coord.convert(point);
    expect(point.x).to.equal(31.111111111111118);
    expect(point.y).to.equal(-229.82692916055305);
  });

  it('invert', function() {
    let point = {
      x: 31.111111111111118,
      y: -229.82692916055305
    };
    point = coord.invert(point);
    expect((point.x).toFixed(1)).to.equal('0.2');
    expect((point.y).toFixed(1)).to.equal('0.7');
  });
});

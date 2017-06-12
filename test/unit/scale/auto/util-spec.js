const expect = require('chai').expect;
const Util = require('../../../../src/scale/auto/util');

describe('test util', () => {

  it('snap to', () => {
    const data = [ 1, 10, 15, 20, 22 ];
    expect(Util.snapTo(data, 2)).to.be.equal(1);
    expect(Util.snapTo(data, 0)).to.be.equal(1);
    expect(Util.snapTo(data, 23)).to.be.equal(22);
    expect(Util.snapTo(data, 17)).to.be.equal(15);

    expect(Util.snapTo(data, 12.5)).to.be.equal(15);
  });

  it('snap floor', () => {
    const data = [ 1, 10, 15, 20, 22 ];
    expect(Util.snapFloor(data, 2)).to.be.equal(1);
    expect(isNaN(Util.snapFloor(data, 0))).to.be.equal(true);
    expect(Util.snapFloor(data, 23)).to.be.equal(22);
    expect(Util.snapFloor(data, 19)).to.be.equal(15);
  });

  it('snapFactorTo', () => {
    const data = [ 0, 1, 2, 5, 10 ];
    expect(Util.snapFactorTo(1.2, data)).to.be.equal(1);
    expect(Util.snapFactorTo(1.2, data, 'ceil')).to.be.equal(2);
    expect(Util.snapFactorTo(23, data)).to.be.equal(20);
    expect(Util.snapFactorTo(0, data)).to.be.equal(0);
  });

  it('snap ceiling', () => {
    const data = [ 1, 10, 15, 20, 22 ];
    expect(Util.snapCeiling(data, 2)).to.be.equal(10);
    expect(Util.snapCeiling(data, 0)).to.be.equal(1);
    expect(Util.snapCeiling(data, 19)).to.be.equal(20);
    expect(isNaN(Util.snapCeiling(data, 23))).to.be.equal(true);
  });

  it('snap empty', () => {
    expect(isNaN(Util.snapTo([], 10))).to.be.equal(true);
    expect(isNaN(Util.snapCeiling([], 10))).to.be.equal(true);
    expect(isNaN(Util.snapFloor([], 10))).to.be.equal(true);
  });

  it('snap with factor', () => {
    const arr = [ 0, 1, 2, 5, 10 ];
    expect(Util.snapFactorTo(0.7, arr)).to.be.equal(0.5);

    expect(Util.snapFactorTo(7, arr)).to.be.equal(5);
    expect(Util.snapFactorTo(7.8, arr)).to.be.equal(10);
  });

  it('snap with factor floor', () => {
    const arr = [ 0, 1, 2, 5, 10 ];
    expect(Util.snapFactorTo(0.7, arr, 'floor')).to.be.equal(0.5);

    expect(Util.snapFactorTo(7, arr, 'floor')).to.be.equal(5);
    expect(Util.snapFactorTo(7.8, arr, 'floor')).to.be.equal(5);
  });

  it('snap with factor ceil', () => {
    const arr = [ 0, 1, 2, 5, 10 ];
    expect(Util.snapFactorTo(0.7, arr, 'ceil')).to.be.equal(1);

    expect(Util.snapFactorTo(7, arr, 'ceil')).to.be.equal(10);
    expect(Util.snapFactorTo(7.8, arr, 'ceil')).to.be.equal(10);
  });

  it('snap multiple', () => {
    expect(Util.snapMultiple(23, 5, 'floor')).to.be.equal(20);
    expect(Util.snapMultiple(23, 5, 'ceil')).to.be.equal(25);
    expect(Util.snapMultiple(22, 5)).to.be.equal(20);
    expect(Util.snapMultiple(23, 5)).to.be.equal(25);
  });

});

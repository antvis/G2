const expect = require('chai').expect;
const auto = require('../../../../src/scale/auto/cat');

describe('Category test', () => {
  it('no tick count, 5 items', () => {
    const data = [ 1, 2, 3, 4, 5 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 15 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 15 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 3, 5, 7, 9, 11, 13, 15 ]);
  });

  it('no tick count, 20 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 3, 5, 7, 9, 11, 13, 18 ]);
  });

  it('tick count 2, 5 items', () => {
    const data = [ 1, 2, 3, 4, 5 ];
    const rst = auto({
      data,
      maxCount: 2
    });
    expect(rst.ticks).eql([ 1, 5 ]);
  });

  it('tick count 3, 5 items', () => {
    const data = [ 1, 2, 3, 4, 5 ];
    const rst = auto({
      data,
      maxCount: 3
    });
    expect(rst.ticks).eql([ 1, 3, 5 ]);
  });

  it('array data', () => {
    const data = [
      [ 1, 2, 3 ],
      [ 4, 5 ]
    ];
    const rst = auto({
      data,
      maxCount: 3
    });
    expect(rst.ticks).eql([ 1, 3, 5 ]);
  });
});

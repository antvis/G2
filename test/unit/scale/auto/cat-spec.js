const expect = require('chai').expect;
const auto = require('../../../../src/scale/auto/cat');

describe('Category test', () => {

  it('no tick count, 1 items', () => {
    const data = [ 1 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 2 items', () => {
    const data = [ 1, 2 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 3 items', () => {
    const data = [ 1, 2, 3 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 4 items', () => {
    const data = [ 1, 2, 3, 4 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 5 items', () => {
    const data = [ 1, 2, 3, 4, 5 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 6 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 7 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 8 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
    const rst = auto({
      data,
      maxCount: 7
    });
    expect(rst.ticks).eql(data);
  });

  it('no tick count, 9 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 3, 5, 7, 9 ]);
  });

  it('no tick count, 10 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 4, 7, 10 ]);
  });

  it('no tick count, 14 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 3, 5, 7, 9, 11, 14 ]);
  });

  it('no tick count, 15 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 3, 5, 7, 9, 11, 13, 15 ]);
  });

  it('no tick count, 18 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 5, 9, 13, 18 ]);
  });

  it('no tick count, 20 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
    const rst = auto({
      data,
      maxCount: 5
    });
    expect(rst.ticks).eql([ 1, 7, 13, 20 ]);
  });

  it('no tick count, 27 items', () => {
    const data = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ];
    const rst = auto({
      data,
      maxCount: 12
    });
    expect(rst.ticks).eql([ 0, 3, 6, 9, 12, 15, 18, 21, 26 ]);
  });

  it('no tick count, 30 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 5, 9, 13, 17, 21, 25, 30 ]);
  });

  it('no tick count, 31 items', () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ];
    const rst = auto({
      data
    });
    expect(rst.ticks).eql([ 1, 6, 11, 16, 21, 26, 31 ]);
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

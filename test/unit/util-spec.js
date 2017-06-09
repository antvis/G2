const expect = require('chai').expect;
const util = require('../../src/util');

describe('util test', () => {
  it('mix', () => {
    const a = { a: 1 };
    const b = { a: 2, b: 2 };
    const rst = util.mix({}, a, b);
    expect(rst).eqls(b);

    expect(util.mix({}, a)).eqls(a);
    expect(util.mix({}, a, b, rst)).eqls(rst);
  });
});


const expect = require('chai').expect
const Util = require('../build/g2').Util;

describe('util test', () => {
  it('mix', () => {
    const a = {a: 1};
    const b = {a: 2, b: 2};
    let rst = Util.mix({}, a, b);
    expect(rst).eqls(b);

    expect(Util.mix({}, a)).eqls(a);
    expect(Util.mix({}, a, b, rst)).eqls(rst);
  });
})

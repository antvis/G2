
const expect = require('chai').expect
const util = require('../build/g2').util;

describe('util test', () => {
  it('mix', () => {
    const a = {a: 1};
    const b = {a: 2, b: 2};
    let rst = util.mix({}, a, b);
    expect(rst).eqls(b);

    expect(util.mix({}, a)).eqls(a);
    expect(util.mix({}, a, b, rst)).eqls(rst);
  });
})

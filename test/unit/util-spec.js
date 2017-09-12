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
  it('to all padding', () => {
    expect(util.toAllPadding(0)).eqls([ 0, 0, 0, 0 ]);
    expect(util.toAllPadding([ 0, 0 ])).eqls([ 0, 0, 0, 0 ]);
    expect(util.toAllPadding([ 20, 10 ])).eqls([ 20, 10, 20, 10 ]);
    expect(util.toAllPadding([ 20, 30, 10 ])).eqls([ 20, 30, 10, 30 ]);
    expect(util.toAllPadding('20%')).eqls([ '20%', '20%', '20%', '20%' ]);
  });
});

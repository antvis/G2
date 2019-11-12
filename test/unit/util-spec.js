const expect = require('chai').expect;
const util = require('../../src/util');
const data = require('../../demos/data/github-commit.json');
describe('util test', () => {
  it('mix', () => {
    const a = {
      a: 1
    };
    const b = {
      a: 2,
      b: 2
    };
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
  it('group by', () => {
    const data = [{ type: '2', value: 2 }, { type: '1', value: 2 }, { type: '1', value: 3 }];
    const groupMap = util.Array.groupToMap(data, [ 'type' ]);
    expect(groupMap._1.length).equal(2);
    expect(groupMap._2.length).equal(1);
    const group = util.Array.group(data, [ 'type' ]);
    expect(group.length).equal(2);
    expect(group[0][0].type).equal('2');
  });
  it('group by numbers', () => {
    const groups = util.Array.groupToMap(data, [ 'month' ]);
    const ten = groups._10;
    expect(ten.length).equal(1);
  });
});

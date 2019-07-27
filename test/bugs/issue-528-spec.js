const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#528', () => {
  it('time as y axis, can not show', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { type: '1', date: [ '2010-01-01', '2010-01-02' ], name: 'a' },
      { type: '2', date: [ '2010-01-02', '2010-01-03' ], name: 'b' },
      { type: '1', date: [ '2010-01-04', '2010-01-05' ], name: 'c' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });
    chart.source(data);
    const interval = chart.interval().position('name*date').color('type');
    // Step 4: 渲染图表
    chart.render();

    expect(interval.getYScale().min).not.equal(0);
  });
});

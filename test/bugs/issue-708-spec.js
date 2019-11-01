const expect = require('chai').expect;
const G2 = require('../../src/index');
const Util = require('../../src/util');

describe('#708', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.id = 'issue708';

  it('the new legend will always be checked', () => {
    const chart = new G2.Chart({
      container: 'issue708',
      width: 500,
      height: 500,
      animate: false
    });
    const data = [
      { v: 1, x: 'x', name: 'A' },
      { v: 2, x: 'x', name: 'B' }
    ];
    chart.source(data)
      .axis('v')
      .scale('name', {});
    chart.intervalDodge()
      .position('x*v')
      .color('name');
    chart.legend('name', {
      position: 'bottom-left'
    });
    chart.render();

    expect(Util.inArray(chart.getFilteredValues('name'), 'A')).to.be.true;
    expect(Util.inArray(chart.getFilteredValues('name'), 'B')).to.be.true;

    // 触发图例 A 的点击事件
    chart.get('legendController').legends['bottom-left'][0]
      .emit('itemclick', {
        item: { dataValue: 'A' },
        checked: false
      });
    expect(Util.inArray(chart.getFilteredValues('name'), 'A')).to.be.false;
    expect(Util.inArray(chart.getFilteredValues('name'), 'B')).to.be.true;

    chart.changeData([
      { v: 1, x: 'x', name: 'A' },
      { v: 5, x: 'x', name: 'E' }
    ]);
    expect(Util.inArray(chart.getFilteredValues('name'), 'A')).to.be.false;
    expect(Util.inArray(chart.getFilteredValues('name'), 'B')).to.be.false;
    expect(Util.inArray(chart.getFilteredValues('name'), 'E')).to.be.true;
  });
});

const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#311', () => {
  it('no data legend error', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      // {x: 0, y: 1, type: 'a'}
    ];

    const chart = new G2.Chart({
      container: div,  // 指定图表容器 ID
      height: 300,     // 指定图表高度
      width: 540
    });

    chart.source(data, {
      type: {
        type: 'cat'
      }
    });

    chart.legend({
      title: null,
      position: 'top'
    });

    chart.line().position('x*y').color('type');

    expect(() => {
      chart.render();
    }).not.to.throw();
  });
});

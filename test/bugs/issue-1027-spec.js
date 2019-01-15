const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#1027', () => {
  it('default shape color is incorrect', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Oceania', year: '1750', value: 200 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });
    chart.source(data);

    chart.interval()
      .position('country*value')
      .color('country');
    // Step 4: 渲染图表
    chart.render();

    const intervals = chart.getAllGeoms()[0].get('shapeContainer')._cfg.children;
    for (let i = 0; i < data.length - 1; i++) {
      expect(intervals[i]._attrs.fill !== intervals[i + 1]._attrs.fill);
    }
  });
});

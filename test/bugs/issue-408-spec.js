const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#408', () => {
  it('NaN', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: NaN }

    ];
    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      animate: false
    });

    chart.source(data, {

    });
    chart.legend({
      position: 'right'
    });
    chart.interval()
      .position('genre*sold').color('sold');

    chart.render();
    expect(chart.getYScales()[0].min).equal(0);
    expect(chart.getYScales()[0].max).equal(1);

    const data1 = [
      { genre: 'Sports', sold: NaN },
      { genre: 'Other', sold: 100 }
    ];
    chart.changeData(data1);
    expect(chart.getYScales()[0].min).equal(0);
    expect(chart.getYScales()[0].max).equal(100);
  });
});

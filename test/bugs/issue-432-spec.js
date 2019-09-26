const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#432', () => {
  it('infinity', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: Infinity }
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
    // https://github.com/antvis/scale/blob/5434d6b6ab28f87c04858ea31aec80a90cfe2aab/src/auto/number.js#L61
    // temp is NaN
    expect(() => {
      chart.render();
    }).not.to.throw();

    const data1 = [
      { genre: 'Sports', sold: -Infinity }
    ];
    // https://github.com/antvis/scale/blob/5434d6b6ab28f87c04858ea31aec80a90cfe2aab/src/auto/number.js#L61
    // temp is NaN
    expect(() => {
      chart.changeData(data1);
    }).not.to.throw();

    const data2 = [
      { genre: 'Sports', sold: -Infinity },
      { genre: 'Other', sold: Infinity }
    ];
    // https://github.com/antvis/scale/blob/5434d6b6ab28f87c04858ea31aec80a90cfe2aab/src/auto/number.js#L61
    // temp is Infinity
    expect(() => {
      chart.changeData(data2);
    }).to.throw();
  });
});

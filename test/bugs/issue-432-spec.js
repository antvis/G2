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

    expect(() => {
      chart.render();
    }).to.throw();

    const data1 = [
      { genre: 'Sports', sold: -Infinity }
    ];
    expect(() => {
      chart.changeData(data1);
    }).to.throw();

    const data2 = [
      { genre: 'Sports', sold: -Infinity },
      { genre: 'Other', sold: Infinity }
    ];
    expect(() => {
      chart.changeData(data2);
    }).to.throw();
  });
});

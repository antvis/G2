const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#406', () => {
  it('legend formatter', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 100 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      padding: 'auto',
      animate: false,
      pixelRatio: 2
    });

    chart.source(data, {
      sold: {
        formatter(val) {
          return val + '元';
        }
      }
    });
    chart.legend({
      position: 'right'
    });
    chart.interval()
      .position('genre*sold').color('sold');

    chart.render();

    const legend = chart.get('legendController').legends['right-bottom'][0];
    expect(legend.get('minTextElement').attr('text')).equal('0元');
    chart.destroy();
  });

  it('legend cat formatter', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 100 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      padding: 'auto',
      animate: false,
      pixelRatio: 2
    });

    chart.source(data, {
      genre: {
        formatter(val) {
          return val + '-xxx';
        }
      }
    });
    chart.legend({
      position: 'right'
    });
    chart.interval()
      .position('genre*sold').color('genre');

    chart.render();

    const legend = chart.get('legendController').legends['right-bottom'][0];
    expect(legend.get('items')[0].value).equal('Sports-xxx');
    chart.destroy();
  });

});

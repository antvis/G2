const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#398', () => {
  it('color mapping: data is null', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: null },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      pixelRatio: 2
    });

    chart.source(data, {
      sold: {
        min: 0
      },
      genre: {
        range: [ 0, 1 ]
      }
    });

    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line()
      .position('genre*sold');

    expect(() => {
      chart.point()
        .position('genre*sold')
        .size('sold')
        .shape('circle')
        .color('sold') // here color = data fieldName
        .style({
          stroke: '#fff',
          lineWidth: 1
        });

      chart.render();
    }).to.not.throw();
  });
});

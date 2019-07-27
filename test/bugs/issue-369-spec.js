const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#369', () => {
  it('when container hide', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540
    });

    chart.source(data);

    chart.line()
      .position('genre*sold')
      .color('red')
      .shape('custom');
    chart.render();
    expect(chart.get('width')).equal(500);
    div.style.display = 'none';
    chart.forceFit();
    expect(chart.get('width')).equal(500);

    chart.destroy();
  });
});

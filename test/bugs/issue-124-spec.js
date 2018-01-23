const G2 = require('../../src/index');

describe('#124', () => {
  it('null data draw point', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: null },
      { genre: 'Strategy', sold: null },
      { genre: 'Action', sold: null },
      { genre: 'Shooter', sold: null },
      { genre: 'Other', sold: null }
    ];

    const chart = new G2.Chart({
      container: div,
      animate: false
    });
    chart.source(data, {
      sold: {
        type: 'linear'
      }
    });

    chart.point().position('genre*sold')
      .size(20)
      .shape('circle');
    chart.render();
  });
});

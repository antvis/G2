const G2 = require('../../src/index');

describe('ticks', () => {
  it('all data equals null', () => {
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

    chart.line().position('genre*sold');
    chart.render();
  });
});

const G2 = require('../../src/index');

describe('#502', () => {
  it('plot enter and plot leave event', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },

      { genre: 'Sports', sold: 175, type: '2' },
      { genre: 'Strategy', sold: 215, type: '2' },
      { genre: 'Action', sold: 220, type: '2' },
      { genre: 'Shooter', sold: 250, type: '2' },
      { genre: 'Other', sold: 50, type: '2' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: false
    });
    chart.source(data);

    chart.interval()
      .position('genre*sold')
      .color('type');

    /*
    chart.on('plotenter', evt => {
    });
    chart.on('plotleave', evt => {
    });
    */

    chart.render();
  });
});

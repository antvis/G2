const G2 = require('../../src/index');
const expect = require('chai').expect;

xdescribe('#472', () => {
  it('when legend on the left, padding of chart is not accurate', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      padding: 'auto'
    });
    chart.source(data);
    chart.legend({ position: 'left' });

    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

    let plotRange = chart.get('plotRange');

    expect(plotRange.bl.x - 107 > 0).equal(false);

    chart.legend({ position: 'bottom' });
    chart.repaint();

    plotRange = chart.get('plotRange');
    expect(500 - plotRange.bl.y > 60).equal(true);

    chart.legend({ position: 'right' });
    chart.repaint();

    plotRange = chart.get('plotRange');
    expect(500 - plotRange.tr.x > 75).equal(true);

    chart.legend({ position: 'top' });
    chart.repaint();

    plotRange = chart.get('plotRange');
    expect(plotRange.tr.y > 25).equal(true);

    chart.destroy();
  });

  it('no axis position error', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      padding: 'auto'
    });
    chart.source(data);
    // chart.legend({ position: 'top' });
    chart.coord('theta');
    chart.intervalStack()
      .position('sold')
      .color('genre');

    chart.render();

    let plotRange = chart.get('plotRange');
    expect(500 - plotRange.bl.y < 45).equal(true);

    chart.legend({ position: 'right' });
    chart.repaint();

    plotRange = chart.get('plotRange');
    expect(500 - plotRange.tr.x > 75).equal(true);
  });
});
